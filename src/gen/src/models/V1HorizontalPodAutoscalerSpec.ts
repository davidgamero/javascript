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
    V1CrossVersionObjectReference,
    V1CrossVersionObjectReferenceFromJSON,
    V1CrossVersionObjectReferenceFromJSONTyped,
    V1CrossVersionObjectReferenceToJSON,
} from './V1CrossVersionObjectReference';

/**
 * specification of a horizontal pod autoscaler.
 * @export
 * @interface V1HorizontalPodAutoscalerSpec
 */
export interface V1HorizontalPodAutoscalerSpec {
    /**
     * upper limit for the number of pods that can be set by the autoscaler; cannot be smaller than MinReplicas.
     * @type {number}
     * @memberof V1HorizontalPodAutoscalerSpec
     */
    maxReplicas: number;
    /**
     * minReplicas is the lower limit for the number of replicas to which the autoscaler can scale down.  It defaults to 1 pod.  minReplicas is allowed to be 0 if the alpha feature gate HPAScaleToZero is enabled and at least one Object or External metric is configured.  Scaling is active as long as at least one metric value is available.
     * @type {number}
     * @memberof V1HorizontalPodAutoscalerSpec
     */
    minReplicas?: number;
    /**
     * 
     * @type {V1CrossVersionObjectReference}
     * @memberof V1HorizontalPodAutoscalerSpec
     */
    scaleTargetRef: V1CrossVersionObjectReference;
    /**
     * target average CPU utilization (represented as a percentage of requested CPU) over all the pods; if not specified the default autoscaling policy will be used.
     * @type {number}
     * @memberof V1HorizontalPodAutoscalerSpec
     */
    targetCPUUtilizationPercentage?: number;
}

export function V1HorizontalPodAutoscalerSpecFromJSON(json: any): V1HorizontalPodAutoscalerSpec {
    return V1HorizontalPodAutoscalerSpecFromJSONTyped(json, false);
}

export function V1HorizontalPodAutoscalerSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1HorizontalPodAutoscalerSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxReplicas': json['maxReplicas'],
        'minReplicas': !exists(json, 'minReplicas') ? undefined : json['minReplicas'],
        'scaleTargetRef': V1CrossVersionObjectReferenceFromJSON(json['scaleTargetRef']),
        'targetCPUUtilizationPercentage': !exists(json, 'targetCPUUtilizationPercentage') ? undefined : json['targetCPUUtilizationPercentage'],
    };
}

export function V1HorizontalPodAutoscalerSpecToJSON(value?: V1HorizontalPodAutoscalerSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxReplicas': value.maxReplicas,
        'minReplicas': value.minReplicas,
        'scaleTargetRef': V1CrossVersionObjectReferenceToJSON(value.scaleTargetRef),
        'targetCPUUtilizationPercentage': value.targetCPUUtilizationPercentage,
    };
}

