import {
    ADD,
    CHANGE,
    CONNECT,
    DELETE,
    ERROR,
    ErrorCallback,
    Informer,
    ListPromise,
    ObjectCallback,
    UPDATE,
} from './informer.js';
import { KubernetesObject, KubernetesListObject } from './types.js';
import { ObjectSerializer } from './serializer.js';
import { setTimeout } from 'node:timers/promises';
import { Watch } from './watch.js';

export interface ObjectCache<T> {
    get(name: string, namespace?: string): T | undefined;

    list(namespace?: string): ReadonlyArray<T>;
}

// exported for testing
export type CacheMap<T extends KubernetesObject> = Map<string, Map<string, T>>;

export interface ListWatchOptions {
    delayFn?: (ms: number) => Promise<void>;
    // Clock source, injectable for testing.
    nowFn?: () => number;
    // Randomness source in [0, 1), injectable for testing.
    randFn?: () => number;
    // Lower bound for the server-side watch timeout, in seconds; the actual
    // value is randomised over [min, 2*min). Mirrors client-go's
    // ReflectorOptions.MinWatchTimeout, except that it ignores anything below
    // its 5 minute default. We honour smaller values so watch expiry stays
    // testable, so treat those as a testing knob.
    minWatchTimeoutSeconds?: number;
}

export class ListWatch<T extends KubernetesObject> implements ObjectCache<T>, Informer<T> {
    // All of these mirror k8s.io/client-go/tools/cache/reflector.go.
    // The watch is bounded server-side, randomised over [MIN, 2*MIN) so a fleet
    // does not reconnect in lockstep.
    private static readonly MIN_WATCH_TIMEOUT_SECONDS = 300;
    // Backoff applies to failures only (defaultBackoffInit/Max/Factor/Jitter),
    // and resets after BACKOFF_RESET_MS without use (defaultBackoffReset).
    private static readonly BACKOFF_INIT_MS = 800;
    private static readonly BACKOFF_MAX_MS = 30000;
    private static readonly BACKOFF_FACTOR = 2;
    private static readonly BACKOFF_JITTER = 1.0;
    private static readonly BACKOFF_RESET_MS = 120000;
    // VeryShortWatchError: closing this fast with nothing delivered is a failure.
    private static readonly VERY_SHORT_WATCH_MS = 1000;

    private objects: CacheMap<T> = new Map();
    private resourceVersion: string;
    private readonly indexCache: { [key: string]: T[] } = {};
    private readonly callbackCache: { [key: string]: (ObjectCallback<T> | ErrorCallback)[] } = {};
    private request: AbortController | undefined;
    private stopped: boolean = false;
    private backoffMs: number = 0;
    private lastBackoffAt: number | undefined;
    private connectedAt: number | undefined;
    private eventsSinceConnect: number = 0;
    private readonly delayFn: (ms: number) => Promise<void>;
    private readonly nowFn: () => number;
    private readonly randFn: () => number;
    private readonly minWatchTimeoutSeconds: number;
    private readonly path: string;
    private readonly watch: Watch;
    private readonly listFn: ListPromise<T>;
    private readonly labelSelector?: string;
    private readonly fieldSelector?: string;

    // TODO: collapse autoStart, labelSelector, fieldSelector into ListWatchOptions
    public constructor(
        path: string,
        watch: Watch,
        listFn: ListPromise<T>,
        autoStart: boolean = true,
        labelSelector?: string,
        fieldSelector?: string,
        options?: ListWatchOptions,
    ) {
        this.path = path;
        this.watch = watch;
        this.listFn = listFn;
        this.labelSelector = labelSelector;
        this.fieldSelector = fieldSelector;
        this.delayFn = options?.delayFn ?? setTimeout;
        this.nowFn = options?.nowFn ?? Date.now;
        this.randFn = options?.randFn ?? Math.random;
        this.minWatchTimeoutSeconds = options?.minWatchTimeoutSeconds ?? ListWatch.MIN_WATCH_TIMEOUT_SECONDS;

        this.callbackCache[ADD] = [];
        this.callbackCache[UPDATE] = [];
        this.callbackCache[DELETE] = [];
        this.callbackCache[ERROR] = [];
        this.callbackCache[CONNECT] = [];
        this.resourceVersion = '';
        if (autoStart) {
            this.doneHandler(null);
        }
    }

    public async start(): Promise<void> {
        this.stopped = false;
        this.backoffMs = 0;
        this.lastBackoffAt = undefined;
        this.connectedAt = undefined;
        this.eventsSinceConnect = 0;
        await this.doneHandler(null);
    }

    public async stop(): Promise<void> {
        this.stopped = true;
        this._stop();
    }

    public on(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    public on(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    public on(
        verb: ADD | UPDATE | DELETE | CHANGE | ERROR | CONNECT,
        cb: ObjectCallback<T> | ErrorCallback,
    ): void {
        if (verb === CHANGE) {
            this.on(ADD, cb);
            this.on(UPDATE, cb);
            this.on(DELETE, cb);
            return;
        }
        if (this.callbackCache[verb] === undefined) {
            throw new Error(`Unknown verb: ${verb}`);
        }
        this.callbackCache[verb].push(cb);
    }

    public off(verb: 'add' | 'update' | 'delete' | 'change', cb: ObjectCallback<T>): void;
    public off(verb: 'error' | 'connect', cb: ErrorCallback): void;
    public off(verb: string, cb: any): void {
        if (verb === CHANGE) {
            this.off('add', cb);
            this.off('update', cb);
            this.off('delete', cb);
            return;
        }
        if (this.callbackCache[verb] === undefined) {
            throw new Error(`Unknown verb: ${verb}`);
        }
        const indexToRemove: number = this.callbackCache[verb].findIndex(
            (cachedCb: ObjectCallback<T>) => cachedCb === cb,
        );
        if (indexToRemove === -1) {
            return;
        }
        this.callbackCache[verb].splice(indexToRemove, 1);
    }

    public get(name: string, namespace?: string): T | undefined {
        const nsObjects = this.objects.get(namespace || '');
        if (nsObjects) {
            return nsObjects.get(name);
        }
        return undefined;
    }

    public list(namespace?: string | undefined): ReadonlyArray<T> {
        if (!namespace) {
            const allObjects: T[] = [];
            for (const nsObjects of this.objects.values()) {
                allObjects.push(...nsObjects.values());
            }
            return allObjects;
        }
        const namespaceObjects = this.objects.get(namespace || '');
        if (!namespaceObjects) {
            return [];
        }
        return Array.from(namespaceObjects.values());
    }

    public latestResourceVersion(): string {
        return this.resourceVersion;
    }

    private _stop(): void {
        if (this.request) {
            this.request.abort();
            this.request = undefined;
        }
    }

    // Delay before the next attempt: exponential with jitter, reset once unused
    // for BACKOFF_RESET_MS.
    private nextBackoffDelayMs(): number {
        const now = this.nowFn();
        if (this.lastBackoffAt === undefined || now - this.lastBackoffAt >= ListWatch.BACKOFF_RESET_MS) {
            this.backoffMs = ListWatch.BACKOFF_INIT_MS;
        } else {
            this.backoffMs = Math.min(this.backoffMs * ListWatch.BACKOFF_FACTOR, ListWatch.BACKOFF_MAX_MS);
        }
        this.lastBackoffAt = now;
        return this.backoffMs + this.randFn() * ListWatch.BACKOFF_JITTER * this.backoffMs;
    }

    // A clean close is the normal end of a watch: the server hangs up when
    // timeoutSeconds expires. Only an instant, empty close is suspicious.
    private wasFailedConnection(err: any): boolean {
        if (err) {
            return true;
        }
        if (this.connectedAt === undefined) {
            return false;
        }
        return (
            this.eventsSinceConnect === 0 && this.nowFn() - this.connectedAt < ListWatch.VERY_SHORT_WATCH_MS
        );
    }

    private async doneHandler(err: any): Promise<void> {
        this._stop();
        const failed = this.wasFailedConnection(err);
        this.connectedAt = undefined;
        this.eventsSinceConnect = 0;
        if (
            err &&
            ((err as { statusCode?: number }).statusCode === 410 || (err as { code?: number }).code === 410)
        ) {
            this.resourceVersion = '';
        } else if (err && (err as { name?: string }).name === 'TimeoutError') {
            // Watch client-side timeout — reconnect from last known resourceVersion
        } else if (err) {
            this.callbackCache[ERROR].forEach((elt: ErrorCallback) => elt(err));
            return;
        }
        if (this.stopped) {
            // do not auto-restart
            return;
        }
        this.callbackCache[CONNECT].forEach((elt: ErrorCallback) => elt(undefined));
        if (!this.resourceVersion) {
            let list: KubernetesListObject<T>;
            try {
                const promise = this.listFn();
                list = await promise;
            } catch (err) {
                this.callbackCache[ERROR].forEach((elt: ErrorCallback) => elt(err));
                return;
            }
            this.objects = deleteItems(this.objects, list.items, this.callbackCache[DELETE].slice());
            this.addOrUpdateItems(list.items);
            this.resourceVersion = list.metadata ? list.metadata!.resourceVersion || '' : '';
        }
        const timeoutSeconds = Math.floor(
            this.minWatchTimeoutSeconds + this.randFn() * this.minWatchTimeoutSeconds,
        );
        const queryParams = {
            resourceVersion: this.resourceVersion,
            // Server-side bound, in place of a client-side deadline.
            timeoutSeconds,
            // Keeps a quiet watch producing traffic, and lets the next one
            // resume from a recent resourceVersion.
            allowWatchBookmarks: true,
        } as {
            resourceVersion: string | undefined;
            labelSelector: string | undefined;
            fieldSelector: string | undefined;
            timeoutSeconds: number;
            allowWatchBookmarks: boolean;
        };
        if (this.labelSelector !== undefined) {
            queryParams.labelSelector = ObjectSerializer.serialize(this.labelSelector, 'string');
        }
        if (this.fieldSelector !== undefined) {
            queryParams.fieldSelector = ObjectSerializer.serialize(this.fieldSelector, 'string');
        }
        if (failed) {
            await this.delayFn(this.nextBackoffDelayMs());
        }
        this.connectedAt = this.nowFn();
        this.eventsSinceConnect = 0;
        this.request = await this.watch.watch(
            this.path,
            queryParams,
            this.watchHandler.bind(this),
            this.doneHandler.bind(this),
        );
    }

    private addOrUpdateItems(items: T[]): void {
        if (items === undefined || items === null) {
            return;
        }
        items.forEach((obj: T) => {
            addOrUpdateObject(
                this.objects,
                obj,
                this.callbackCache[ADD].slice(),
                this.callbackCache[UPDATE].slice(),
            );
        });
    }

    private async watchHandler(
        phase: string,
        obj: T,
        watchObj?: { type: string; object: KubernetesObject },
    ): Promise<void> {
        switch (phase) {
            case 'ERROR':
                if ((obj as { code?: number }).code === 410) {
                    this.resourceVersion = '';
                }
                // We don't restart here, because it should be handled by the watch exiting if necessary
                return;
            case 'ADDED':
            case 'MODIFIED':
                addOrUpdateObject(
                    this.objects,
                    obj,
                    this.callbackCache[ADD].slice(),
                    this.callbackCache[UPDATE].slice(),
                );
                break;
            case 'DELETED':
                deleteObject(this.objects, obj, this.callbackCache[DELETE].slice());
                break;
            case 'BOOKMARK':
                // nothing to do, here for documentation, mostly.
                break;
        }
        this.eventsSinceConnect += 1;
        this.resourceVersion = obj.metadata ? obj.metadata!.resourceVersion || '' : '';
    }
}

// exported for testing
export function cacheMapFromList<T extends KubernetesObject>(newObjects: T[]): CacheMap<T> {
    const objects: CacheMap<T> = new Map();
    if (newObjects === undefined || newObjects === null) {
        return objects;
    }
    // build up the new list
    for (const obj of newObjects) {
        let namespaceObjects = objects.get(obj.metadata!.namespace || '');
        if (!namespaceObjects) {
            namespaceObjects = new Map();
            objects.set(obj.metadata!.namespace || '', namespaceObjects);
        }

        const name = obj.metadata!.name || '';
        namespaceObjects.set(name, obj);
    }
    return objects;
}

// external for testing
export function deleteItems<T extends KubernetesObject>(
    oldObjects: CacheMap<T>,
    newObjects: T[],
    deleteCallback?: ObjectCallback<T>[],
): CacheMap<T> {
    const newObjectsMap = cacheMapFromList(newObjects);

    for (const [namespace, oldNamespaceObjects] of oldObjects.entries()) {
        const newNamespaceObjects = newObjectsMap.get(namespace);
        if (newNamespaceObjects) {
            for (const [name, oldObj] of oldNamespaceObjects.entries()) {
                if (!newNamespaceObjects.has(name)) {
                    oldNamespaceObjects.delete(name);
                    if (deleteCallback) {
                        deleteCallback.forEach((fn: ObjectCallback<T>) => fn(oldObj));
                    }
                }
            }
        } else {
            oldObjects.delete(namespace);
            oldNamespaceObjects.forEach((obj: T) => {
                if (deleteCallback) {
                    deleteCallback.forEach((fn: ObjectCallback<T>) => fn(obj));
                }
            });
        }
    }

    return oldObjects;
}

// Only public for testing.
export function addOrUpdateObject<T extends KubernetesObject>(
    objects: CacheMap<T>,
    obj: T,
    addCallbacks?: ObjectCallback<T>[],
    updateCallbacks?: ObjectCallback<T>[],
): void {
    let namespaceObjects = objects.get(obj.metadata!.namespace || '');
    if (!namespaceObjects) {
        namespaceObjects = new Map();
        objects.set(obj.metadata!.namespace || '', namespaceObjects);
    }

    const name = obj.metadata!.name || '';
    const found = namespaceObjects.get(name);
    if (!found) {
        namespaceObjects.set(name, obj);
        if (addCallbacks) {
            addCallbacks.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
    } else {
        if (!isSameVersion(found, obj)) {
            namespaceObjects.set(name, obj);
            if (updateCallbacks) {
                updateCallbacks.forEach((elt: ObjectCallback<T>) => elt(obj));
            }
        }
    }
}

function isSameVersion<T extends KubernetesObject>(o1: any, o2: T): boolean {
    return (
        o1.metadata!.resourceVersion !== undefined &&
        o1.metadata!.resourceVersion !== null &&
        o1.metadata!.resourceVersion === o2.metadata!.resourceVersion
    );
}

// Public for testing.
export function deleteObject<T extends KubernetesObject>(
    objects: CacheMap<T>,
    obj: T,
    deleteCallbacks?: ObjectCallback<T>[],
): void {
    const namespace = obj.metadata!.namespace || '';
    const name = obj.metadata!.name || '';

    const namespaceObjects = objects.get(namespace);
    if (!namespaceObjects) {
        return;
    }
    const deleted = namespaceObjects.delete(name);
    if (deleted) {
        if (deleteCallbacks) {
            deleteCallbacks.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
        if (namespaceObjects.size === 0) {
            objects.delete(namespace);
        }
    }
}
