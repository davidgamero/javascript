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
    V1RollingUpdateDaemonSet,
    V1RollingUpdateDaemonSetFromJSON,
    V1RollingUpdateDaemonSetFromJSONTyped,
    V1RollingUpdateDaemonSetToJSON,
} from './';

/**
 * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
 * @export
 * @interface V1DaemonSetUpdateStrategy
 */
export interface V1DaemonSetUpdateStrategy {
    /**
     * 
     * @type {V1RollingUpdateDaemonSet}
     * @memberof V1DaemonSetUpdateStrategy
     */
    rollingUpdate?: V1RollingUpdateDaemonSet;
    /**
     * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
     * @type {string}
     * @memberof V1DaemonSetUpdateStrategy
     */
    type?: string;
}

export function V1DaemonSetUpdateStrategyFromJSON(json: any): V1DaemonSetUpdateStrategy {
    return V1DaemonSetUpdateStrategyFromJSONTyped(json, false);
}

export function V1DaemonSetUpdateStrategyFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1DaemonSetUpdateStrategy {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'rollingUpdate': !exists(json, 'rollingUpdate') ? undefined : V1RollingUpdateDaemonSetFromJSON(json['rollingUpdate']),
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function V1DaemonSetUpdateStrategyToJSON(value?: V1DaemonSetUpdateStrategy | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'rollingUpdate': V1RollingUpdateDaemonSetToJSON(value.rollingUpdate),
        'type': value.type,
    };
}

