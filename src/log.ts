import { RequestOptions } from 'https';
import fetch from 'node-fetch';
import request = require('request');
import { Writable } from 'stream';
import { URL, URLSearchParams } from 'url';
import { ApiException } from './api';
import { KubeConfig } from './config';
import { V1Status } from './gen';
export interface LogOptions {
    /**
     * Follow the log stream of the pod. Defaults to false.
     */
    follow?: boolean;

    /**
     * If set, the number of bytes to read from the server before terminating the log output. This may not display a
     * complete final line of logging, and may return slightly more or slightly less than the specified limit.
     */
    limitBytes?: number;

    /**
     * If true, then the output is pretty printed.
     */
    pretty?: boolean;

    /**
     * Return previous terminated container logs. Defaults to false.
     */
    previous?: boolean;

    /**
     * A relative time in seconds before the current time from which to show logs. If this value precedes the time a
     * pod was started, only logs since the pod start will be returned. If this value is in the future, no logs will
     * be returned. Only one of sinceSeconds or sinceTime may be specified.
     */
    sinceSeconds?: number;

    /**
     * If set, the number of lines from the end of the logs to show. If not specified, logs are shown from the creation
     * of the container or sinceSeconds or sinceTime
     */
    tailLines?: number;

    /**
     * If true, add an RFC3339 or RFC3339Nano timestamp at the beginning of every line of log output. Defaults to false.
     */
    timestamps?: boolean;
}

export function AddOptionsToSearchParams(
    options: LogOptions | undefined,
    searchParams: URLSearchParams,
): URLSearchParams | undefined {
    if (!options) {
        return;
    }
    if (!searchParams.has('pretty')) {
        searchParams.set('pretty', 'false');
    }
    if (!searchParams.has('previous')) {
        searchParams.set('previous', 'false');
    }
    if (!searchParams.has('timestamps')) {
        searchParams.set('timestamps', 'false');
    }
    if (!options) {
        return searchParams;
    }
    if (options.follow) {
        searchParams.set('follow', options.follow.toString() || 'false');
        searchParams.set('pretty', options.follow.toString() || 'false');
    }
    if (options.limitBytes) {
        searchParams.set('limitBytes', options.limitBytes.toString());
    }
    if (options.previous) {
        searchParams.set('previous', options.previous.toString());
    }
    if (options.sinceSeconds) {
        searchParams.set('sinceSeconds', options.sinceSeconds.toString() || 'false');
    }
    searchParams.set('timestamps', options?.timestamps?.toString() || 'false');
    return searchParams;
}

export class Log {
    public config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public async log(
        namespace: string,
        podName: string,
        containerName: string,
        stream: Writable,
        options?: LogOptions,
    ): Promise<request.Request>;
    /** @deprecated done callback is deprecated */
    public async log(
        namespace: string,
        podName: string,
        containerName: string,
        stream: Writable,
        done: (err: any) => void,
        options?: LogOptions,
    ): Promise<request.Request>;
    public async log(
        namespace: string,
        podName: string,
        containerName: string,
        stream: Writable,
        doneOrOptions?: ((err: any) => void) | LogOptions,
        options?: LogOptions,
    ): Promise<request.Request> {
        let done: (err: any) => void = () => undefined;
        if (typeof doneOrOptions === 'function') {
            done = doneOrOptions;
        } else {
            options = doneOrOptions;
        }

        const path = `/api/v1/namespaces/${namespace}/pods/${podName}/log`;

        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const url = cluster.server + path;

        const requestOptions: RequestOptions = {};

        const requestURL = new URL(cluster.server + path);

        const searchParams = requestURL.searchParams;
        AddOptionsToSearchParams(options, searchParams);

        await this.config.applytoHTTPSOptions(requestOptions);

        const req = await fetch(requestURL.toString(), requestOptions)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    // TODO: the follow search param still has the stream close prematurely based on my testing
                    response.body.pipe(stream);
                } else if (status === 500) {
                    const v1status = response.body as V1Status;
                    const v1code = v1status.code;
                    const v1message = v1status.message;
                    if (v1code !== undefined && v1message !== undefined) {
                        throw new ApiException<undefined | V1Status>(
                            v1code,
                            v1message,
                            v1status,
                            response.headers.raw(),
                        );
                    }
                } else {
                    throw new ApiException<undefined>(
                        status,
                        'Error occurred in log request',
                        undefined,
                        response.headers.raw(),
                    );
                }
            })
            .catch((err) => {
                throw new ApiException<undefined>(err, 'Error occurred in log request', undefined, err);
            });
        return req;
    }
}
