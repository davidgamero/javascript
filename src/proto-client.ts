import http = require('http');
import url = require('url');
import fetch from "node-fetch";

import { KubeConfig } from './config';

import { RequestContext, HttpMethod } from './gen/http/http';

export class ProtoClient {
    public readonly 'config': KubeConfig;

    public async get(msgType: any, requestPath: string): Promise<any> {
        let method = HttpMethod.GET;

        let requestContext: RequestContext = new RequestContext(requestPath, method);
        this.config.applySecurityAuthentication(requestContext);

        const resultPromise = fetch(requestPath, {
            method: method,
            headers: requestContext.getHeaders(),
            agent: requestContext.getAgent(),
        })


        const server = this.config.getCurrentCluster()!.server;
        const u = new url.URL(server);
        const options = {
            path: requestPath,
            hostname: u.hostname,
            protocol: u.protocol,
        };
        await this.config.applytoHTTPSOptions(options);
        const req = http.request(options);

        const result = await new Promise<any>((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => {
                data = data + chunk;
            });
            req.on('end', () => {
                const obj = msgType.deserializeBinary(data);
                resolve(obj);
            });
            req.on('error', (err) => {
                reject(err);
            });
        });
        req.end();
        return result;
    }
}
