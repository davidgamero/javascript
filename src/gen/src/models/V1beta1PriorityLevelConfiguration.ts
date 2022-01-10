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
    V1ObjectMeta,
    V1ObjectMetaFromJSON,
    V1ObjectMetaFromJSONTyped,
    V1ObjectMetaToJSON,
} from './';
import {
    V1beta1PriorityLevelConfigurationSpec,
    V1beta1PriorityLevelConfigurationSpecFromJSON,
    V1beta1PriorityLevelConfigurationSpecFromJSONTyped,
    V1beta1PriorityLevelConfigurationSpecToJSON,
} from './';
import {
    V1beta1PriorityLevelConfigurationStatus,
    V1beta1PriorityLevelConfigurationStatusFromJSON,
    V1beta1PriorityLevelConfigurationStatusFromJSONTyped,
    V1beta1PriorityLevelConfigurationStatusToJSON,
} from './';

/**
 * PriorityLevelConfiguration represents the configuration of a priority level.
 * @export
 * @interface V1beta1PriorityLevelConfiguration
 */
export interface V1beta1PriorityLevelConfiguration {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof V1beta1PriorityLevelConfiguration
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof V1beta1PriorityLevelConfiguration
     */
    kind?: string;
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof V1beta1PriorityLevelConfiguration
     */
    metadata?: V1ObjectMeta;
    /**
     * 
     * @type {V1beta1PriorityLevelConfigurationSpec}
     * @memberof V1beta1PriorityLevelConfiguration
     */
    spec?: V1beta1PriorityLevelConfigurationSpec;
    /**
     * 
     * @type {V1beta1PriorityLevelConfigurationStatus}
     * @memberof V1beta1PriorityLevelConfiguration
     */
    status?: V1beta1PriorityLevelConfigurationStatus;
}

export function V1beta1PriorityLevelConfigurationFromJSON(json: any): V1beta1PriorityLevelConfiguration {
    return V1beta1PriorityLevelConfigurationFromJSONTyped(json, false);
}

export function V1beta1PriorityLevelConfigurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1beta1PriorityLevelConfiguration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : V1beta1PriorityLevelConfigurationSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : V1beta1PriorityLevelConfigurationStatusFromJSON(json['status']),
    };
}

export function V1beta1PriorityLevelConfigurationToJSON(value?: V1beta1PriorityLevelConfiguration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'kind': value.kind,
        'metadata': V1ObjectMetaToJSON(value.metadata),
        'spec': V1beta1PriorityLevelConfigurationSpecToJSON(value.spec),
        'status': V1beta1PriorityLevelConfigurationStatusToJSON(value.status),
    };
}

