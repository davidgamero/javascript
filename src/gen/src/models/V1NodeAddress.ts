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
/**
 * NodeAddress contains information for the node's address.
 * @export
 * @interface V1NodeAddress
 */
export interface V1NodeAddress {
    /**
     * The node address.
     * @type {string}
     * @memberof V1NodeAddress
     */
    address: string;
    /**
     * Node address type, one of Hostname, ExternalIP or InternalIP.
     * @type {string}
     * @memberof V1NodeAddress
     */
    type: string;
}

export function V1NodeAddressFromJSON(json: any): V1NodeAddress {
    return V1NodeAddressFromJSONTyped(json, false);
}

export function V1NodeAddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1NodeAddress {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'address': json['address'],
        'type': json['type'],
    };
}

export function V1NodeAddressToJSON(value?: V1NodeAddress | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'address': value.address,
        'type': value.type,
    };
}

