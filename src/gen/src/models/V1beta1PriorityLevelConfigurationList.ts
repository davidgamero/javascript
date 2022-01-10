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
    V1ListMeta,
    V1ListMetaFromJSON,
    V1ListMetaFromJSONTyped,
    V1ListMetaToJSON,
} from './';
import {
    V1beta1PriorityLevelConfiguration,
    V1beta1PriorityLevelConfigurationFromJSON,
    V1beta1PriorityLevelConfigurationFromJSONTyped,
    V1beta1PriorityLevelConfigurationToJSON,
} from './';

/**
 * PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects.
 * @export
 * @interface V1beta1PriorityLevelConfigurationList
 */
export interface V1beta1PriorityLevelConfigurationList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof V1beta1PriorityLevelConfigurationList
     */
    apiVersion?: string;
    /**
     * `items` is a list of request-priorities.
     * @type {Array<V1beta1PriorityLevelConfiguration>}
     * @memberof V1beta1PriorityLevelConfigurationList
     */
    items: Array<V1beta1PriorityLevelConfiguration>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof V1beta1PriorityLevelConfigurationList
     */
    kind?: string;
    /**
     * 
     * @type {V1ListMeta}
     * @memberof V1beta1PriorityLevelConfigurationList
     */
    metadata?: V1ListMeta;
}

export function V1beta1PriorityLevelConfigurationListFromJSON(json: any): V1beta1PriorityLevelConfigurationList {
    return V1beta1PriorityLevelConfigurationListFromJSONTyped(json, false);
}

export function V1beta1PriorityLevelConfigurationListFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1beta1PriorityLevelConfigurationList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'items': ((json['items'] as Array<any>).map(V1beta1PriorityLevelConfigurationFromJSON)),
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ListMetaFromJSON(json['metadata']),
    };
}

export function V1beta1PriorityLevelConfigurationListToJSON(value?: V1beta1PriorityLevelConfigurationList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'items': ((value.items as Array<any>).map(V1beta1PriorityLevelConfigurationToJSON)),
        'kind': value.kind,
        'metadata': V1ListMetaToJSON(value.metadata),
    };
}

