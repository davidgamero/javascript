import byline = require('byline');
import { RequestOptions } from 'https';
import request = require('request');
import fetch from 'node-fetch';
import { URL } from 'url';
import AbortController from 'abort-controller';
import { Duplex } from 'stream';
import { KubeConfig } from './config';

export interface WatchUpdate {
    type: string;
    object: object;
}

// We cannot use the type ReadableStream because Request returned by request
// library is not a true ReadableStream and there is extra abort method.
export interface RequestResult {
    pipe(stream: Duplex): void;
    on(ev: string, cb: (arg: any) => void): void;
    abort(): void;
}

export interface Response {
    statusCode: number;
    statusMessage: string;
    body: {
        pipe:  (stream: byline.LineStream) => void;
    }
}
export interface FetchInterface {
    webRequest(url: URL,opts: RequestOptions): Promise<Response>;
}

type FetchImpl =  (url: URL,opts: RequestOptions) => Promise<Response>

export class DefaultFetch implements FetchInterface {
    // requestImpl can be overriden in case we need to test mocked DefaultRequest
    private fetchImpl: FetchImpl;

    constructor(fetchImpl?: FetchImpl) {
        this.fetchImpl = fetchImpl || fetch;
    }

    // Using request lib can be confusing when combining Stream- with Callback-
    // style API. We avoid the callback and handle HTTP response errors, that
    // would otherwise require a different error handling, in a transparent way
    // to the user (see github issue request/request#647 for more info).
    public    webRequest(url: URL,opts: RequestOptions): Promise<Response>    {
        const req = this.fetchImpl(url,opts);
        return req;
    }
}

export class Watch {
    public static SERVER_SIDE_CLOSE: object = { error: 'Connection closed on server' };
    public config: KubeConfig;
    private readonly fetchImpl: FetchInterface;

    public constructor(config: KubeConfig, fetchImpl?: FetchInterface) {
        this.config = config;
        if (fetchImpl) {
            this.fetchImpl = fetchImpl;
        } else {
            this.fetchImpl = new DefaultFetch();
        }
    }

    // Watch the resource and call provided callback with parsed json object
    // upon event received over the watcher connection.
    //
    // "done" callback is called either when connection is closed or when there
    // is an error. In either case, watcher takes care of properly closing the
    // underlaying connection so that it doesn't leak any resources.
    public async watch(
        path: string,
        queryParams: any,
        callback: (phase: string, apiObj: any, watchObj?: any) => void,
        done: (err: any) => void,
    ): Promise<any> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const watchURL = new URL(cluster.server + path);
        watchURL.searchParams.set('watch', 'true');
        for (const [key, value] of Object.entries(queryParams) as [string, string][]) {
            watchURL.searchParams.set(key, value);
        }

        const httpsOptions: RequestOptions = {}
        // TODO: fix applytoHTTPSOptions for watch
        await this.config.applytoHTTPSOptions(httpsOptions);

        const controller = new AbortController();
        // @ts-ignore
        httpsOptions.signal = controller.signal;

        let doneCalled: boolean = false;
        const doneCallOnce = (err: any) => {
            if (!doneCalled) {
                controller.abort();
                doneCalled = true;
                done(err);
            }
        };
        const stream = byline.createStream();
        stream.on('error', doneCallOnce);
        stream.on('close', () => doneCallOnce(null));
        stream.on('data', (line) => {
            try {
                const data = JSON.parse(line.toString());
                callback(data.type, data.object, data);
            } catch (ignore) {
                // ignore parse errors
            }
        });

        const req = await this.fetchImpl.webRequest(watchURL, httpsOptions)
            .then((response: Response) => {
                response.body.pipe(stream)
            }).catch(doneCallOnce);
        return req;
    }
}
