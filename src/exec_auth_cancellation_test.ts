import { it } from 'node:test';
import assert from 'node:assert/strict';
import type { ChildProcessWithoutNullStreams, SpawnOptionsWithoutStdio } from 'node:child_process';
import { EventEmitter, getEventListeners } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { setTimeout as delay } from 'node:timers/promises';

import { CoreV1Api, HttpMethod, RequestContext, createConfiguration } from './api.js';
import { KubeConfig } from './config.js';
import { ExecAuth } from './exec_auth.js';

function alive(pid: number): boolean {
    try {
        process.kill(pid, 0);
        return true;
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ESRCH') return false;
        throw error;
    }
}

async function waitForPids(marker: string): Promise<number[]> {
    for (let attempt = 0; attempt < 200; attempt++) {
        try {
            return JSON.parse(await readFile(marker, 'utf8')) as number[];
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
            await delay(10);
        }
    }
    throw new Error('Credential fixture did not become ready.');
}

// The child keeps inherited pipes open and ignores SIGTERM. Cancelling only
// the credential parent cannot settle its close event or stop this child.
const stalledCredential = `
    const { spawn } = require('node:child_process');
    const { writeFileSync } = require('node:fs');
    const child = spawn(process.execPath, ['-e',
        "process.on('SIGTERM', () => {}); setInterval(() => {}, 1000)"],
        { stdio: 'inherit' });
    writeFileSync(process.argv[1], JSON.stringify([process.pid, child.pid]));
    process.on('SIGTERM', () => {});
    setInterval(() => {}, 1000);
`;

function fakeCredentialProcess(pid: number, onDirectKill: (signal?: NodeJS.Signals) => void) {
    const subprocess = new EventEmitter() as ChildProcessWithoutNullStreams;
    Object.assign(subprocess, {
        pid,
        stdin: new PassThrough(),
        stdout: new PassThrough(),
        stderr: new PassThrough(),
        kill(signal?: NodeJS.Signals) {
            onDirectKill(signal);
            return true;
        },
    });
    return subprocess;
}

for (const mode of ['interrupt', 'deadline'] as const) {
    it(
        `${mode} stops exec authentication and its process group before a generated API sends`,
        {
            skip: process.platform === 'win32',
            timeout: 5000,
        },
        async () => {
            const directory = await mkdtemp(path.join(tmpdir(), 'exec-auth-cancel-'));
            const marker = path.join(directory, 'pids.json');
            const controller = new AbortController();
            const signal = mode === 'deadline' ? AbortSignal.timeout(500) : controller.signal;
            let pids: number[] = [];
            let sends = 0;
            const config = new KubeConfig();
            config.loadFromOptions({
                clusters: [{ name: 'fixture', server: 'http://127.0.0.1', skipTLSVerify: true }],
                users: [
                    {
                        name: 'fixture',
                        exec: {
                            command: process.execPath,
                            args: ['-e', stalledCredential, marker],
                        },
                    },
                ],
                contexts: [{ name: 'fixture', cluster: 'fixture', user: 'fixture' }],
                currentContext: 'fixture',
            });
            const api = new CoreV1Api(
                createConfiguration({
                    baseServer: {
                        makeRequestContext(endpoint: string, method: HttpMethod): RequestContext {
                            const context = new RequestContext(`http://127.0.0.1${endpoint}`, method);
                            context.setSignal(signal);
                            return context;
                        },
                    },
                    authMethods: { default: config },
                    httpApi: {
                        send() {
                            sends++;
                            throw new Error('Cancelled authentication must not reach HTTP.');
                        },
                    },
                }),
            );
            const operation = api.listNamespace();
            // Attach rejection immediately; cancellation may happen during readiness.
            const rejection = assert.rejects(
                operation,
                (error: Error) => error.name === (mode === 'deadline' ? 'TimeoutError' : 'AbortError'),
            );
            try {
                pids = await waitForPids(marker);
                assert.equal(pids.every(alive), true);
                if (mode === 'interrupt') controller.abort();
                await Promise.race([
                    rejection,
                    delay(1500, undefined, { ref: false }).then(() => {
                        throw new Error('Credential cancellation did not settle.');
                    }),
                ]);
                // Reparented children can take a short interval to be reaped by init.
                for (let attempt = 0; attempt < 100 && pids.some(alive); attempt++) await delay(10);
                assert.equal(pids.some(alive), false, 'credential parent and child must both terminate');
                assert.equal(sends, 0);
            } finally {
                controller.abort();
                for (const pid of pids) {
                    if (alive(pid)) process.kill(pid, 'SIGKILL');
                }
                await operation.catch(() => {});
                await rm(directory, { recursive: true, force: true });
            }
        },
    );
}

it('rejects a pre-aborted signal before spawning or using cached credentials', async () => {
    const auth = new ExecAuth();
    const user = {
        name: 'fixture',
        exec: {
            command: process.execPath,
            args: [
                '-e',
                'console.log(JSON.stringify({status:{token:"fixture",expirationTimestamp:"2095-03-29T00:00:00Z"}}))',
            ],
        },
    };
    await auth.applyAuthentication(user, {});
    const controller = new AbortController();
    const reason = new Error('operation cancelled');
    controller.abort(reason);
    await assert.rejects(auth.applyAuthentication(user, { signal: controller.signal }), reason);
    await assert.rejects(
        auth.applyAuthentication(
            {
                name: 'not-cached',
                exec: {
                    command: 'must-not-spawn-this-command',
                },
            },
            { signal: controller.signal },
        ),
        reason,
    );
});

it('does not project cached credentials when interrupted during the await boundary', async () => {
    const auth = new ExecAuth();
    const user = {
        name: 'fixture',
        exec: {
            command: process.execPath,
            args: [
                '-e',
                'console.log(JSON.stringify({status:{token:"fixture",expirationTimestamp:"2095-03-29T00:00:00Z"}}))',
            ],
        },
    };
    await auth.applyAuthentication(user, {});
    const controller = new AbortController();
    const opts = { signal: controller.signal, headers: {} };
    const operation = auth.applyAuthentication(user, opts);
    controller.abort();
    await assert.rejects(operation, (error: Error) => error.name === 'AbortError');
    assert.deepEqual(opts.headers, {});
});

it('keeps sibling credential requests and successful credential caching independent', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'exec-auth-siblings-'));
    const marker = path.join(directory, 'pids.json');
    const auth = new ExecAuth();
    const user = {
        name: 'fixture',
        exec: {
            command: process.execPath,
            args: [
                '-e',
                `
        require('node:fs').appendFileSync(process.argv[1], process.pid + '\\n');
        setTimeout(() => console.log(JSON.stringify({status:{token:'sibling',expirationTimestamp:'2095-03-29T00:00:00Z'}})), 300);
    `,
                marker,
            ],
        },
    };
    const controller = new AbortController();
    const interrupted = auth.applyAuthentication(user, { signal: controller.signal });
    const rejection = assert.rejects(interrupted, (error: Error) => error.name === 'AbortError');
    const successful: import('node:https').RequestOptions = {};
    const sibling = auth.applyAuthentication(user, successful);
    let pids: number[] = [];
    try {
        for (let attempt = 0; attempt < 200 && pids.length !== 2; attempt++) {
            try {
                pids = (await readFile(marker, 'utf8')).trim().split('\n').map(Number);
            } catch (error) {
                if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
            }
            if (pids.length !== 2) await delay(10);
        }
        assert.equal(pids.length, 2);
        controller.abort();
        await rejection;
        await sibling;
        assert.deepEqual(successful.headers, { Authorization: 'Bearer sibling' });
        // An invalid command would fail if the successful sibling had not cached.
        const cached: import('node:https').RequestOptions = {};
        await auth.applyAuthentication({ ...user, exec: { command: 'must-not-spawn' } }, cached);
        assert.deepEqual(cached.headers, { Authorization: 'Bearer sibling' });
        assert.equal(pids.some(alive), false);
    } finally {
        controller.abort();
        for (const pid of pids) if (alive(pid)) process.kill(pid, 'SIGKILL');
        await Promise.allSettled([interrupted, sibling]);
        await rm(directory, { recursive: true, force: true });
    }
});

it('cancels the legacy authProvider exec form and removes its abort listener', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'exec-auth-legacy-cancel-'));
    const marker = path.join(directory, 'pids.json');
    const auth = new ExecAuth();
    const controller = new AbortController();
    const reason = new Error('legacy credential cancelled');
    const operation = auth.applyAuthentication(
        {
            name: 'legacy-fixture',
            authProvider: {
                name: 'legacy-exec',
                config: {
                    exec: {
                        command: process.execPath,
                        args: [
                            '-e',
                            `
                                require('node:fs').writeFileSync(
                                    process.argv[1],
                                    JSON.stringify([process.pid]),
                                );
                                setInterval(() => {}, 1000);
                            `,
                            marker,
                        ],
                    },
                },
            },
        },
        { signal: controller.signal },
    );
    const rejection = assert.rejects(operation, (error: unknown) => error === reason);
    let pids: number[] = [];
    try {
        pids = await waitForPids(marker);
        assert.equal(getEventListeners(controller.signal, 'abort').length, 1);
        controller.abort(reason);
        await rejection;
        assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
        assert.equal(pids.some(alive), false);
    } finally {
        controller.abort(reason);
        for (const pid of pids) if (alive(pid)) process.kill(pid, 'SIGKILL');
        await operation.catch(() => {});
        await rm(directory, { recursive: true, force: true });
    }
});

it('does not project certificate credentials when a running plugin is cancelled', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'exec-auth-cert-cancel-'));
    const marker = path.join(directory, 'pids.json');
    const auth = new ExecAuth();
    const controller = new AbortController();
    const reason = new Error('certificate credential cancelled');
    const opts: import('node:https').RequestOptions = {
        signal: controller.signal,
        headers: {},
    };
    const operation = auth.applyAuthentication(
        {
            name: 'certificate-fixture',
            exec: {
                command: process.execPath,
                args: [
                    '-e',
                    `
                        require('node:fs').writeFileSync(
                            process.argv[1],
                            JSON.stringify([process.pid]),
                        );
                        setTimeout(() => console.log(JSON.stringify({
                            status: {
                                clientCertificateData: 'certificate',
                                clientKeyData: 'private-key',
                            },
                        })), 2000);
                    `,
                    marker,
                ],
            },
        },
        opts,
    );
    const rejection = assert.rejects(operation, (error: unknown) => error === reason);
    let pids: number[] = [];
    try {
        pids = await waitForPids(marker);
        controller.abort(reason);
        await rejection;
        assert.equal(opts.cert, undefined);
        assert.equal(opts.key, undefined);
        assert.deepEqual(opts.headers, {});
        assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
        assert.equal(pids.some(alive), false);
    } finally {
        controller.abort(reason);
        for (const pid of pids) if (alive(pid)) process.kill(pid, 'SIGKILL');
        await operation.catch(() => {});
        await rm(directory, { recursive: true, force: true });
    }
});

it('targets the owned POSIX process group and preserves the abort reason', async (t) => {
    const auth = new ExecAuth();
    const controller = new AbortController();
    const reason = new Error('credential cancelled');
    const pid = 424242;
    const directKills: Array<NodeJS.Signals | undefined> = [];
    const groupKills: Array<[number, NodeJS.Signals | number | undefined]> = [];
    const subprocess = fakeCredentialProcess(pid, (signal) => {
        directKills.push(signal);
        queueMicrotask(() => subprocess.emit('close', null, signal));
    });
    let spawnOptions: SpawnOptionsWithoutStdio | undefined;
    (auth as any).execFn = (
        _command: string,
        _args: readonly string[],
        options: SpawnOptionsWithoutStdio,
    ) => {
        spawnOptions = options;
        return subprocess;
    };
    t.mock.method(process, 'kill', ((target: number, signal?: NodeJS.Signals | number) => {
        groupKills.push([target, signal]);
        queueMicrotask(() => subprocess.emit('close', null, signal));
        return true;
    }) as typeof process.kill);

    const operation = auth.applyAuthentication(
        {
            name: 'fixture',
            exec: { command: 'credential-plugin' },
        },
        { signal: controller.signal },
    );
    assert.equal(getEventListeners(controller.signal, 'abort').length, 1);
    controller.abort(reason);
    await assert.rejects(operation, (error: unknown) => error === reason);

    if (process.platform === 'win32') {
        assert.equal(spawnOptions?.detached, false);
        assert.deepEqual(directKills, ['SIGKILL']);
        assert.deepEqual(groupKills, []);
    } else {
        assert.equal(spawnOptions?.detached, true);
        assert.deepEqual(groupKills, [[-pid, 'SIGKILL']]);
        assert.deepEqual(directKills, []);
    }
    assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
});
