/* tslint:disable */
/* eslint-disable */
/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.22.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    IntOrString,
    IntOrStringFromJSON,
    IntOrStringFromJSONTyped,
    IntOrStringToJSON,
} from './';
import {
    V1HTTPHeader,
    V1HTTPHeaderFromJSON,
    V1HTTPHeaderFromJSONTyped,
    V1HTTPHeaderToJSON,
} from './';

/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 * @export
 * @interface V1HTTPGetAction
 */
export interface V1HTTPGetAction {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
     * @type {string}
     * @memberof V1HTTPGetAction
     */
    host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     * @type {Array<V1HTTPHeader>}
     * @memberof V1HTTPGetAction
     */
    httpHeaders?: Array<V1HTTPHeader>;
    /**
     * Path to access on the HTTP server.
     * @type {string}
     * @memberof V1HTTPGetAction
     */
    path?: string;
    /**
     * IntOrString is a type that can hold an int32 or a string.  When used in JSON or YAML marshalling and unmarshalling, it produces or consumes the inner type.  This allows you to have, for example, a JSON field that can accept a name or number.
     * @type {IntOrString}
     * @memberof V1HTTPGetAction
     */
    port: IntOrString;
    /**
     * Scheme to use for connecting to the host. Defaults to HTTP.
     * @type {string}
     * @memberof V1HTTPGetAction
     */
    scheme?: string;
}

export function V1HTTPGetActionFromJSON(json: any): V1HTTPGetAction {
    return V1HTTPGetActionFromJSONTyped(json, false);
}

export function V1HTTPGetActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1HTTPGetAction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'host': !exists(json, 'host') ? undefined : json['host'],
        'httpHeaders': !exists(json, 'httpHeaders') ? undefined : ((json['httpHeaders'] as Array<any>).map(V1HTTPHeaderFromJSON)),
        'path': !exists(json, 'path') ? undefined : json['path'],
        'port': IntOrStringFromJSON(json['port']),
        'scheme': !exists(json, 'scheme') ? undefined : json['scheme'],
    };
}

export function V1HTTPGetActionToJSON(value?: V1HTTPGetAction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'host': value.host,
        'httpHeaders': value.httpHeaders === undefined ? undefined : ((value.httpHeaders as Array<any>).map(V1HTTPHeaderToJSON)),
        'path': value.path,
        'port': IntOrStringToJSON(value.port),
        'scheme': value.scheme,
    };
}

