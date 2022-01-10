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
    V1PolicyRule,
    V1PolicyRuleFromJSON,
    V1PolicyRuleFromJSONTyped,
    V1PolicyRuleToJSON,
} from './';

/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.
 * @export
 * @interface V1Role
 */
export interface V1Role {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof V1Role
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof V1Role
     */
    kind?: string;
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof V1Role
     */
    metadata?: V1ObjectMeta;
    /**
     * Rules holds all the PolicyRules for this Role
     * @type {Array<V1PolicyRule>}
     * @memberof V1Role
     */
    rules?: Array<V1PolicyRule>;
}

export function V1RoleFromJSON(json: any): V1Role {
    return V1RoleFromJSONTyped(json, false);
}

export function V1RoleFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1Role {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'rules': !exists(json, 'rules') ? undefined : ((json['rules'] as Array<any>).map(V1PolicyRuleFromJSON)),
    };
}

export function V1RoleToJSON(value?: V1Role | null): any {
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
        'rules': value.rules === undefined ? undefined : ((value.rules as Array<any>).map(V1PolicyRuleToJSON)),
    };
}

