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
    V1Condition,
    V1ConditionFromJSON,
    V1ConditionFromJSONTyped,
    V1ConditionToJSON,
} from './';
import {
    V1LoadBalancerStatus,
    V1LoadBalancerStatusFromJSON,
    V1LoadBalancerStatusFromJSONTyped,
    V1LoadBalancerStatusToJSON,
} from './';

/**
 * ServiceStatus represents the current status of a service.
 * @export
 * @interface V1ServiceStatus
 */
export interface V1ServiceStatus {
    /**
     * Current service state
     * @type {Array<V1Condition>}
     * @memberof V1ServiceStatus
     */
    conditions?: Array<V1Condition>;
    /**
     * 
     * @type {V1LoadBalancerStatus}
     * @memberof V1ServiceStatus
     */
    loadBalancer?: V1LoadBalancerStatus;
}

export function V1ServiceStatusFromJSON(json: any): V1ServiceStatus {
    return V1ServiceStatusFromJSONTyped(json, false);
}

export function V1ServiceStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1ServiceStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'conditions': !exists(json, 'conditions') ? undefined : ((json['conditions'] as Array<any>).map(V1ConditionFromJSON)),
        'loadBalancer': !exists(json, 'loadBalancer') ? undefined : V1LoadBalancerStatusFromJSON(json['loadBalancer']),
    };
}

export function V1ServiceStatusToJSON(value?: V1ServiceStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'conditions': value.conditions === undefined ? undefined : ((value.conditions as Array<any>).map(V1ConditionToJSON)),
        'loadBalancer': V1LoadBalancerStatusToJSON(value.loadBalancer),
    };
}

