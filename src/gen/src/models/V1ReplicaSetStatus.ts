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
    V1ReplicaSetCondition,
    V1ReplicaSetConditionFromJSON,
    V1ReplicaSetConditionFromJSONTyped,
    V1ReplicaSetConditionToJSON,
} from './';

/**
 * ReplicaSetStatus represents the current status of a ReplicaSet.
 * @export
 * @interface V1ReplicaSetStatus
 */
export interface V1ReplicaSetStatus {
    /**
     * The number of available replicas (ready for at least minReadySeconds) for this replica set.
     * @type {number}
     * @memberof V1ReplicaSetStatus
     */
    availableReplicas?: number;
    /**
     * Represents the latest available observations of a replica set's current state.
     * @type {Array<V1ReplicaSetCondition>}
     * @memberof V1ReplicaSetStatus
     */
    conditions?: Array<V1ReplicaSetCondition>;
    /**
     * The number of pods that have labels matching the labels of the pod template of the replicaset.
     * @type {number}
     * @memberof V1ReplicaSetStatus
     */
    fullyLabeledReplicas?: number;
    /**
     * ObservedGeneration reflects the generation of the most recently observed ReplicaSet.
     * @type {number}
     * @memberof V1ReplicaSetStatus
     */
    observedGeneration?: number;
    /**
     * The number of ready replicas for this replica set.
     * @type {number}
     * @memberof V1ReplicaSetStatus
     */
    readyReplicas?: number;
    /**
     * Replicas is the most recently oberved number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller
     * @type {number}
     * @memberof V1ReplicaSetStatus
     */
    replicas: number;
}

export function V1ReplicaSetStatusFromJSON(json: any): V1ReplicaSetStatus {
    return V1ReplicaSetStatusFromJSONTyped(json, false);
}

export function V1ReplicaSetStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1ReplicaSetStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'availableReplicas': !exists(json, 'availableReplicas') ? undefined : json['availableReplicas'],
        'conditions': !exists(json, 'conditions') ? undefined : ((json['conditions'] as Array<any>).map(V1ReplicaSetConditionFromJSON)),
        'fullyLabeledReplicas': !exists(json, 'fullyLabeledReplicas') ? undefined : json['fullyLabeledReplicas'],
        'observedGeneration': !exists(json, 'observedGeneration') ? undefined : json['observedGeneration'],
        'readyReplicas': !exists(json, 'readyReplicas') ? undefined : json['readyReplicas'],
        'replicas': json['replicas'],
    };
}

export function V1ReplicaSetStatusToJSON(value?: V1ReplicaSetStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'availableReplicas': value.availableReplicas,
        'conditions': value.conditions === undefined ? undefined : ((value.conditions as Array<any>).map(V1ReplicaSetConditionToJSON)),
        'fullyLabeledReplicas': value.fullyLabeledReplicas,
        'observedGeneration': value.observedGeneration,
        'readyReplicas': value.readyReplicas,
        'replicas': value.replicas,
    };
}

