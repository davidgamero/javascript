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
    V2beta2ContainerResourceMetricSource,
    V2beta2ContainerResourceMetricSourceFromJSON,
    V2beta2ContainerResourceMetricSourceFromJSONTyped,
    V2beta2ContainerResourceMetricSourceToJSON,
} from './';
import {
    V2beta2ExternalMetricSource,
    V2beta2ExternalMetricSourceFromJSON,
    V2beta2ExternalMetricSourceFromJSONTyped,
    V2beta2ExternalMetricSourceToJSON,
} from './';
import {
    V2beta2ObjectMetricSource,
    V2beta2ObjectMetricSourceFromJSON,
    V2beta2ObjectMetricSourceFromJSONTyped,
    V2beta2ObjectMetricSourceToJSON,
} from './';
import {
    V2beta2PodsMetricSource,
    V2beta2PodsMetricSourceFromJSON,
    V2beta2PodsMetricSourceFromJSONTyped,
    V2beta2PodsMetricSourceToJSON,
} from './';
import {
    V2beta2ResourceMetricSource,
    V2beta2ResourceMetricSourceFromJSON,
    V2beta2ResourceMetricSourceFromJSONTyped,
    V2beta2ResourceMetricSourceToJSON,
} from './';

/**
 * MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
 * @export
 * @interface V2beta2MetricSpec
 */
export interface V2beta2MetricSpec {
    /**
     * 
     * @type {V2beta2ContainerResourceMetricSource}
     * @memberof V2beta2MetricSpec
     */
    containerResource?: V2beta2ContainerResourceMetricSource;
    /**
     * 
     * @type {V2beta2ExternalMetricSource}
     * @memberof V2beta2MetricSpec
     */
    external?: V2beta2ExternalMetricSource;
    /**
     * 
     * @type {V2beta2ObjectMetricSource}
     * @memberof V2beta2MetricSpec
     */
    object?: V2beta2ObjectMetricSource;
    /**
     * 
     * @type {V2beta2PodsMetricSource}
     * @memberof V2beta2MetricSpec
     */
    pods?: V2beta2PodsMetricSource;
    /**
     * 
     * @type {V2beta2ResourceMetricSource}
     * @memberof V2beta2MetricSpec
     */
    resource?: V2beta2ResourceMetricSource;
    /**
     * type is the type of metric source.  It should be one of "ContainerResource", "External", "Object", "Pods" or "Resource", each mapping to a matching field in the object. Note: "ContainerResource" type is available on when the feature-gate HPAContainerMetrics is enabled
     * @type {string}
     * @memberof V2beta2MetricSpec
     */
    type: string;
}

export function V2beta2MetricSpecFromJSON(json: any): V2beta2MetricSpec {
    return V2beta2MetricSpecFromJSONTyped(json, false);
}

export function V2beta2MetricSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): V2beta2MetricSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'containerResource': !exists(json, 'containerResource') ? undefined : V2beta2ContainerResourceMetricSourceFromJSON(json['containerResource']),
        'external': !exists(json, 'external') ? undefined : V2beta2ExternalMetricSourceFromJSON(json['external']),
        'object': !exists(json, 'object') ? undefined : V2beta2ObjectMetricSourceFromJSON(json['object']),
        'pods': !exists(json, 'pods') ? undefined : V2beta2PodsMetricSourceFromJSON(json['pods']),
        'resource': !exists(json, 'resource') ? undefined : V2beta2ResourceMetricSourceFromJSON(json['resource']),
        'type': json['type'],
    };
}

export function V2beta2MetricSpecToJSON(value?: V2beta2MetricSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'containerResource': V2beta2ContainerResourceMetricSourceToJSON(value.containerResource),
        'external': V2beta2ExternalMetricSourceToJSON(value.external),
        'object': V2beta2ObjectMetricSourceToJSON(value.object),
        'pods': V2beta2PodsMetricSourceToJSON(value.pods),
        'resource': V2beta2ResourceMetricSourceToJSON(value.resource),
        'type': value.type,
    };
}

