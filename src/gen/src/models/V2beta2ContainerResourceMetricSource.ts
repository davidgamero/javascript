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
    V2beta2MetricTarget,
    V2beta2MetricTargetFromJSON,
    V2beta2MetricTargetFromJSONTyped,
    V2beta2MetricTargetToJSON,
} from './';

/**
 * ContainerResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.  Only one "target" type should be set.
 * @export
 * @interface V2beta2ContainerResourceMetricSource
 */
export interface V2beta2ContainerResourceMetricSource {
    /**
     * container is the name of the container in the pods of the scaling target
     * @type {string}
     * @memberof V2beta2ContainerResourceMetricSource
     */
    container: string;
    /**
     * name is the name of the resource in question.
     * @type {string}
     * @memberof V2beta2ContainerResourceMetricSource
     */
    name: string;
    /**
     * 
     * @type {V2beta2MetricTarget}
     * @memberof V2beta2ContainerResourceMetricSource
     */
    target: V2beta2MetricTarget;
}

export function V2beta2ContainerResourceMetricSourceFromJSON(json: any): V2beta2ContainerResourceMetricSource {
    return V2beta2ContainerResourceMetricSourceFromJSONTyped(json, false);
}

export function V2beta2ContainerResourceMetricSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): V2beta2ContainerResourceMetricSource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'container': json['container'],
        'name': json['name'],
        'target': V2beta2MetricTargetFromJSON(json['target']),
    };
}

export function V2beta2ContainerResourceMetricSourceToJSON(value?: V2beta2ContainerResourceMetricSource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'container': value.container,
        'name': value.name,
        'target': V2beta2MetricTargetToJSON(value.target),
    };
}

