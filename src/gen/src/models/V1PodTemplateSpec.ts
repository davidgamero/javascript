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
    V1PodSpec,
    V1PodSpecFromJSON,
    V1PodSpecFromJSONTyped,
    V1PodSpecToJSON,
} from './';

/**
 * PodTemplateSpec describes the data a pod should have when created from a template
 * @export
 * @interface V1PodTemplateSpec
 */
export interface V1PodTemplateSpec {
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof V1PodTemplateSpec
     */
    metadata?: V1ObjectMeta;
    /**
     * 
     * @type {V1PodSpec}
     * @memberof V1PodTemplateSpec
     */
    spec?: V1PodSpec;
}

export function V1PodTemplateSpecFromJSON(json: any): V1PodTemplateSpec {
    return V1PodTemplateSpecFromJSONTyped(json, false);
}

export function V1PodTemplateSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1PodTemplateSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : V1PodSpecFromJSON(json['spec']),
    };
}

export function V1PodTemplateSpecToJSON(value?: V1PodTemplateSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'metadata': V1ObjectMetaToJSON(value.metadata),
        'spec': V1PodSpecToJSON(value.spec),
    };
}

