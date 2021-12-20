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
 * Preconditions must be fulfilled before an operation (update, delete, etc.) is carried out.
 * @export
 * @interface V1Preconditions
 */
export interface V1Preconditions {
    /**
     * Specifies the target ResourceVersion
     * @type {string}
     * @memberof V1Preconditions
     */
    resourceVersion?: string;
    /**
     * Specifies the target UID.
     * @type {string}
     * @memberof V1Preconditions
     */
    uid?: string;
}

export function V1PreconditionsFromJSON(json: any): V1Preconditions {
    return V1PreconditionsFromJSONTyped(json, false);
}

export function V1PreconditionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1Preconditions {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resourceVersion': !exists(json, 'resourceVersion') ? undefined : json['resourceVersion'],
        'uid': !exists(json, 'uid') ? undefined : json['uid'],
    };
}

export function V1PreconditionsToJSON(value?: V1Preconditions | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'resourceVersion': value.resourceVersion,
        'uid': value.uid,
    };
}

