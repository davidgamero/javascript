import assert from 'node:assert';
import { setTimeout as sleep } from 'node:timers/promises';
import { KubeConfig, V1Pod } from '../../index.js';
import { Watch } from '../../watch.js';

// How a watch is bounded, against a real API server. Nothing on the client
// limits an established watch; it ends when the server-side `timeoutSeconds`
// expires. See k8s.io/client-go/tools/cache/reflector.go.

// Longer than the client's requestTimeoutMs (30s), so that any client-side
// deadline would show up here.
const WATCH_LIFETIME_MS = 45000;

// Short enough to keep the suite quick, and far enough from requestTimeoutMs
// to tell a server-side close apart from a client-side one.
const SERVER_TIMEOUT_SECONDS = 10;

async function watchIsNotBoundedByTheClient(kc: KubeConfig): Promise<void> {
    const watch = new Watch(kc);

    console.log(`\n--- A watch is not bounded by the client (${WATCH_LIFETIME_MS / 1000}s) ---`);

    const t0 = Date.now();
    const at = () => `${((Date.now() - t0) / 1000).toFixed(2)}s`;

    let doneCalled = false;
    let doneErr: any;
    let doneAt: string | undefined;
    let events = 0;

    // Whether anything happens during the window is irrelevant: a quiet watch
    // must survive exactly as a busy one does.
    const controller = await watch.watch(
        '/api/v1/pods',
        {},
        (phase: string, obj: V1Pod) => {
            events++;
            console.log(`${at()} event ${phase} ${obj.metadata?.name ?? 'unknown'}`);
        },
        (err: any) => {
            doneCalled = true;
            doneErr = err;
            doneAt = at();
            console.log(`${at()} done ${err ? `${err.name}: ${err.message}` : '(no error)'}`);
        },
    );

    try {
        await sleep(WATCH_LIFETIME_MS);

        assert.ok(
            !doneCalled,
            `Watch should still be open after ${WATCH_LIFETIME_MS / 1000}s, but done() was ` +
                `called at ${doneAt} with ${doneErr ? `${doneErr.name}: ${doneErr.message}` : 'no error'}`,
        );
        console.log(`✓ Watch survived ${WATCH_LIFETIME_MS / 1000}s (${events} events received)`);
    } finally {
        controller.abort();
    }
}

async function watchIsBoundedByTheServer(kc: KubeConfig): Promise<void> {
    const watch = new Watch(kc);

    console.log(`\n--- A watch is bounded by the server (timeoutSeconds=${SERVER_TIMEOUT_SECONDS}) ---`);

    const t0 = Date.now();
    let doneErr: any = 'not called';
    let elapsedMs = 0;

    await new Promise<void>((resolve) => {
        watch
            .watch(
                '/api/v1/pods',
                { timeoutSeconds: SERVER_TIMEOUT_SECONDS, allowWatchBookmarks: true },
                () => {},
                (err: any) => {
                    doneErr = err;
                    elapsedMs = Date.now() - t0;
                    resolve();
                },
            )
            .catch(resolve);
    });

    const elapsedSeconds = (elapsedMs / 1000).toFixed(2);
    console.log(
        `Watch ended after ${elapsedSeconds}s with ` +
            `${doneErr ? `${doneErr.name}: ${doneErr.message}` : 'no error'}`,
    );

    // The server hanging up when timeoutSeconds expires is an ordinary end of
    // stream, so it must surface as a clean close and not as an error. This is
    // what lets ListWatch reconnect immediately instead of backing off.
    assert.strictEqual(
        doneErr,
        null,
        `Expected a clean server-side close, got ${doneErr?.name}: ${doneErr?.message}`,
    );

    // Bracket the timing so this cannot pass on a client-side abort: closing
    // early means timeoutSeconds was never honoured, and closing late means
    // something other than the server ended the watch.
    assert.ok(
        elapsedMs >= SERVER_TIMEOUT_SECONDS * 1000,
        `Watch closed after ${elapsedSeconds}s, before the requested ${SERVER_TIMEOUT_SECONDS}s`,
    );
    assert.ok(
        elapsedMs < (SERVER_TIMEOUT_SECONDS + 15) * 1000,
        `Watch closed after ${elapsedSeconds}s, far later than the requested ${SERVER_TIMEOUT_SECONDS}s`,
    );
    console.log(`✓ Server closed the watch cleanly at ${elapsedSeconds}s`);
}

export default async function watchTimeoutParity() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    console.log('\n=== Watch Timeout Parity Integration Test ===');

    await watchIsNotBoundedByTheClient(kc);
    await watchIsBoundedByTheServer(kc);

    console.log('Watch timeout parity integration test passed!');
}
