import { STATUS_CODES } from 'node:http';
import { createInterface } from 'node:readline';
import { Readable } from 'node:stream';
import { fetch } from 'undici';
import { KubeConfig } from './config.js';
import { HttpMethod, RequestContext } from './gen/http/http.js';

export class Watch {
    public static SERVER_SIDE_CLOSE: object = { error: 'Connection closed on server' };
    public config: KubeConfig;
    private requestTimeoutMs: number = 30000;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    // Watch the resource and call provided callback with parsed json object
    // upon event received over the watcher connection.
    //
    // "done" callback is called either when connection is closed or when there
    // is an error. In either case, watcher takes care of properly closing the
    // underlaying connection so that it doesn't leak any resources.
    public async watch(
        path: string,
        queryParams: Record<string, string | number | boolean | undefined>,
        callback: (phase: string, apiObj: any, watchObj?: any) => void,
        done: (err: any) => void,
    ): Promise<AbortController> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const watchURL = new URL(cluster.server + path);
        watchURL.searchParams.set('watch', 'true');

        for (const [key, val] of Object.entries(queryParams || {})) {
            if (val !== undefined) {
                watchURL.searchParams.set(key, val.toString());
            }
        }

        const controller = new AbortController();
        // The timeout is an *idle* timeout, not a deadline for the whole
        // request: a watch is a long-lived stream that is expected to stay open
        // for as long as the server keeps sending events. The timer is reset
        // every time we receive data and cleared when the watch finishes, so
        // only a silent connection is aborted.
        const timeoutController = new AbortController();
        const signal = AbortSignal.any([controller.signal, timeoutController.signal]);

        let idleTimer: ReturnType<typeof setTimeout> | undefined;
        const clearIdleTimer = () => {
            if (idleTimer !== undefined) {
                clearTimeout(idleTimer);
                idleTimer = undefined;
            }
        };
        const resetIdleTimer = () => {
            clearIdleTimer();
            idleTimer = setTimeout(() => {
                idleTimer = undefined;
                timeoutController.abort();
            }, this.requestTimeoutMs);
            // Don't hold the event loop open purely for the idle timer.
            idleTimer.unref?.();
        };

        const ctx = new RequestContext(watchURL.toString(), HttpMethod.GET);
        await this.config.applySecurityAuthentication(ctx);

        let doneCalled: boolean = false;
        const doneCallOnce = (err: any) => {
            if (!doneCalled) {
                doneCalled = true;
                clearIdleTimer();
                const timedOut = timeoutController.signal.aborted;
                controller.abort();
                if (err && timedOut) {
                    done(new DOMException('The operation was aborted due to timeout', 'TimeoutError'));
                } else {
                    done(err);
                }
            }
        };

        // Start the idle timer before the request: a server that never responds
        // at all has to time out too.
        resetIdleTimer();

        try {
            const response = await fetch(watchURL, {
                method: 'GET',
                headers: ctx.getHeaders(),
                dispatcher: ctx.getDispatcher(),
                signal,
            });

            if (response.status === 200) {
                // Headers received: start counting idle time from now.
                resetIdleTimer();
                const body = Readable.fromWeb(response.body! as any);

                body.on('error', doneCallOnce);
                body.on('close', () => doneCallOnce(null));
                body.on('finish', () => doneCallOnce(null));

                const lines = createInterface(body);
                lines.on('error', doneCallOnce);
                lines.on('close', () => doneCallOnce(null));
                lines.on('finish', () => doneCallOnce(null));
                lines.on('line', (line) => {
                    // Any data at all means the connection is alive.
                    resetIdleTimer();
                    try {
                        const data = JSON.parse(line.toString());
                        callback(data.type, data.object, data);
                    } catch {
                        // ignore parse errors
                    }
                });
            } else {
                const statusText =
                    response.statusText || STATUS_CODES[response.status] || 'Internal Server Error';
                const error = new Error(statusText) as Error & {
                    statusCode: number | undefined;
                };
                error.statusCode = response.status;
                throw error;
            }
        } catch (err) {
            doneCallOnce(err);
        }

        return controller;
    }
}
