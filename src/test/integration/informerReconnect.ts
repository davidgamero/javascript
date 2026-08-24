import assert from 'node:assert';
import { setTimeout as sleep } from 'node:timers/promises';
import { CoreV1Api, KubeConfig, V1ConfigMap, V1ConfigMapList } from '../../index.js';
import { Watch } from '../../watch.js';
import { ListWatch, ListWatchOptions } from '../../cache.js';
import { generateName } from './name.js';
import { withTimeout } from './helpers.js';

// Longer than the client's requestTimeoutMs (30s), so that any client-side
// watch teardown would show up as a reconnect here.
const IDLE_WINDOW_MS = 40000;

// A watch is normally bounded by a server-side timeoutSeconds of 5-10 minutes,
// far too long to sit through, so the reconnect path is driven with a short
// minimum instead.
const WATCH_EXPIRY_SECONDS = 10;

interface Harness {
    informer: ListWatch<V1ConfigMap>;
    addedNames: string[];
    connects: () => number;
    errors: () => number;
    waitForAdd: (name: string, ms: number) => Promise<void>;
    waitForConnects: (count: number, ms: number) => Promise<void>;
}

function buildInformer(
    kc: KubeConfig,
    namespace: string,
    labelSelector: string,
    options?: ListWatchOptions,
): Harness {
    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const listFn = async (): Promise<V1ConfigMapList> =>
        coreV1Client.listNamespacedConfigMap({ namespace, labelSelector });

    const informer = new ListWatch<V1ConfigMap>(
        `/api/v1/namespaces/${namespace}/configmaps`,
        new Watch(kc),
        listFn,
        false,
        labelSelector,
        undefined,
        options,
    );

    const addedNames: string[] = [];
    const addWaiters = new Map<string, () => void>();
    const connectWaiters: { count: number; resolve: () => void }[] = [];
    let connects = 0;
    let errors = 0;

    informer.on('add', (obj: V1ConfigMap) => {
        const name = obj.metadata?.name ?? 'unknown';
        console.log(`Informer event: add ${name}`);
        addedNames.push(name);
        addWaiters.get(name)?.();
    });

    informer.on('connect', () => {
        connects++;
        console.log(`Informer event: connect (#${connects})`);
        for (const waiter of connectWaiters) {
            if (connects >= waiter.count) {
                waiter.resolve();
            }
        }
    });

    informer.on('error', (err: any) => {
        errors++;
        console.log(`Informer event: error ${err}`);
    });

    return {
        informer,
        addedNames,
        connects: () => connects,
        errors: () => errors,
        waitForAdd: (name, ms) =>
            withTimeout(
                new Promise<void>((resolve) => {
                    if (addedNames.includes(name)) {
                        resolve();
                        return;
                    }
                    addWaiters.set(name, resolve);
                }),
                ms,
                `Timed out waiting for add event for ${name}`,
            ),
        waitForConnects: (count, ms) =>
            withTimeout(
                new Promise<void>((resolve) => {
                    if (connects >= count) {
                        resolve();
                        return;
                    }
                    connectWaiters.push({ count, resolve });
                }),
                ms,
                `Timed out waiting for ${count} informer connects`,
            ),
    };
}

// A healthy informer sits still: the reflector holds a watch open until the
// server-side timeoutSeconds expires, so nothing reconnects in this window.
// Connection churn here would also compound, since repeated failures back off.
async function informerStaysConnected(kc: KubeConfig, namespace: string): Promise<void> {
    const labelValue = generateName('idle');
    const labelSelector = `informer-test=${labelValue}`;
    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const h = buildInformer(kc, namespace, labelSelector);
    const cmName = generateName('cm-idle');

    console.log(`\n--- A healthy informer does not reconnect (${IDLE_WINDOW_MS / 1000}s) ---`);

    try {
        await h.informer.start();
        await coreV1Client.createNamespacedConfigMap({
            namespace,
            body: {
                metadata: { name: cmName, labels: { 'informer-test': labelValue } },
                data: { key: 'value' },
            },
        });
        await h.waitForAdd(cmName, 15000);
        console.log(`✓ Received add event for ${cmName}`);

        const before = h.connects();
        console.log(`Watching for unexpected reconnects for ${IDLE_WINDOW_MS / 1000}s...`);
        await sleep(IDLE_WINDOW_MS);

        assert.strictEqual(
            h.connects(),
            before,
            `Informer should not reconnect while healthy, but connected ` +
                `${h.connects() - before} extra time(s) in ${IDLE_WINDOW_MS / 1000}s`,
        );
        assert.strictEqual(h.errors(), 0, `Expected no errors, got ${h.errors()}`);
        console.log(`✓ No reconnects or errors in ${IDLE_WINDOW_MS / 1000}s`);
    } finally {
        await h.informer.stop();
        try {
            await coreV1Client.deleteNamespacedConfigMap({ name: cmName, namespace });
        } catch {
            // already deleted
        }
    }
}

// When the server does expire the watch, that is a clean close, and the
// reflector reconnects on it immediately and resumes from the last
// resourceVersion rather than replaying the whole list.
async function informerReconnectsOnWatchExpiry(kc: KubeConfig, namespace: string): Promise<void> {
    const labelValue = generateName('expiry');
    const labelSelector = `informer-test=${labelValue}`;
    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const h = buildInformer(kc, namespace, labelSelector, {
        minWatchTimeoutSeconds: WATCH_EXPIRY_SECONDS,
    });
    const cm1Name = generateName('cm1');
    const cm2Name = generateName('cm2');

    console.log(`\n--- An informer reconnects when the server expires the watch ---`);

    try {
        await h.informer.start();
        await coreV1Client.createNamespacedConfigMap({
            namespace,
            body: {
                metadata: { name: cm1Name, labels: { 'informer-test': labelValue } },
                data: { key: 'value1' },
            },
        });
        await h.waitForAdd(cm1Name, 15000);
        console.log(`✓ Received add event for ${cm1Name}`);

        // The watch expires after timeoutSeconds, randomised over
        // [min, 2*min), so allow for the top of that window plus slack.
        const waitMs = (WATCH_EXPIRY_SECONDS * 2 + 20) * 1000;
        console.log(`Waiting for the server to expire the watch (~${WATCH_EXPIRY_SECONDS}s)...`);
        const startedAt = Date.now();
        await h.waitForConnects(2, waitMs);
        console.log(`✓ Informer reconnected ${Date.now() - startedAt}ms after the watch was established`);

        console.log(`Creating configmap ${cm2Name}`);
        await coreV1Client.createNamespacedConfigMap({
            namespace,
            body: {
                metadata: { name: cm2Name, labels: { 'informer-test': labelValue } },
                data: { key: 'value2' },
            },
        });
        await h.waitForAdd(cm2Name, 15000);
        console.log('✓ Received add event for cm2 after reconnection');

        const cm1Duplicates = h.addedNames.filter((n) => n === cm1Name).length;
        assert.strictEqual(
            cm1Duplicates,
            1,
            `cm1 should only appear once in add events, got ${cm1Duplicates}`,
        );
        console.log('✓ No duplicate add events for cm1 (delta-only after reconnect)');

        // A clean expiry is not a failure, so it must not surface as an error.
        assert.strictEqual(h.errors(), 0, `Expected no errors, got ${h.errors()}`);
        console.log('✓ No error events');
    } finally {
        await h.informer.stop();
        for (const name of [cm1Name, cm2Name]) {
            try {
                await coreV1Client.deleteNamespacedConfigMap({ name, namespace });
            } catch {
                // already deleted
            }
        }
    }
}

export default async function informerReconnect() {
    const kc = new KubeConfig();
    kc.loadFromDefault();
    const namespace = 'default';

    console.log('\n=== Informer Reconnect Integration Test ===');

    await informerStaysConnected(kc, namespace);
    await informerReconnectsOnWatchExpiry(kc, namespace);

    console.log('Informer reconnect integration test passed!');
}
