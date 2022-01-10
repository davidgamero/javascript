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
    V1NodeConfigSource,
    V1NodeConfigSourceFromJSON,
    V1NodeConfigSourceFromJSONTyped,
    V1NodeConfigSourceToJSON,
} from './';

/**
 * NodeConfigStatus describes the status of the config assigned by Node.Spec.ConfigSource.
 * @export
 * @interface V1NodeConfigStatus
 */
export interface V1NodeConfigStatus {
    /**
     * 
     * @type {V1NodeConfigSource}
     * @memberof V1NodeConfigStatus
     */
    active?: V1NodeConfigSource;
    /**
     * 
     * @type {V1NodeConfigSource}
     * @memberof V1NodeConfigStatus
     */
    assigned?: V1NodeConfigSource;
    /**
     * Error describes any problems reconciling the Spec.ConfigSource to the Active config. Errors may occur, for example, attempting to checkpoint Spec.ConfigSource to the local Assigned record, attempting to checkpoint the payload associated with Spec.ConfigSource, attempting to load or validate the Assigned config, etc. Errors may occur at different points while syncing config. Earlier errors (e.g. download or checkpointing errors) will not result in a rollback to LastKnownGood, and may resolve across Kubelet retries. Later errors (e.g. loading or validating a checkpointed config) will result in a rollback to LastKnownGood. In the latter case, it is usually possible to resolve the error by fixing the config assigned in Spec.ConfigSource. You can find additional information for debugging by searching the error message in the Kubelet log. Error is a human-readable description of the error state; machines can check whether or not Error is empty, but should not rely on the stability of the Error text across Kubelet versions.
     * @type {string}
     * @memberof V1NodeConfigStatus
     */
    error?: string;
    /**
     * 
     * @type {V1NodeConfigSource}
     * @memberof V1NodeConfigStatus
     */
    lastKnownGood?: V1NodeConfigSource;
}

export function V1NodeConfigStatusFromJSON(json: any): V1NodeConfigStatus {
    return V1NodeConfigStatusFromJSONTyped(json, false);
}

export function V1NodeConfigStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1NodeConfigStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'active': !exists(json, 'active') ? undefined : V1NodeConfigSourceFromJSON(json['active']),
        'assigned': !exists(json, 'assigned') ? undefined : V1NodeConfigSourceFromJSON(json['assigned']),
        'error': !exists(json, 'error') ? undefined : json['error'],
        'lastKnownGood': !exists(json, 'lastKnownGood') ? undefined : V1NodeConfigSourceFromJSON(json['lastKnownGood']),
    };
}

export function V1NodeConfigStatusToJSON(value?: V1NodeConfigStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'active': V1NodeConfigSourceToJSON(value.active),
        'assigned': V1NodeConfigSourceToJSON(value.assigned),
        'error': value.error,
        'lastKnownGood': V1NodeConfigSourceToJSON(value.lastKnownGood),
    };
}

