export * from './gen/api';

import fetch from 'node-fetch';

// inject node-fetch
if (!globalThis.fetch) {
    // @ts-ignore
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
    globalThis.Request = Request;
    globalThis.Response = Response;
}