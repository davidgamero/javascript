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
    V1Toleration,
    V1TolerationFromJSON,
    V1TolerationFromJSONTyped,
    V1TolerationToJSON,
} from './V1Toleration';

/**
 * Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.
 * @export
 * @interface V1alpha1Scheduling
 */
export interface V1alpha1Scheduling {
    /**
     * nodeSelector lists labels that must be present on nodes that support this RuntimeClass. Pods using this RuntimeClass can only be scheduled to a node matched by this selector. The RuntimeClass nodeSelector is merged with a pod's existing nodeSelector. Any conflicts will cause the pod to be rejected in admission.
     * @type {{ [key: string]: string; }}
     * @memberof V1alpha1Scheduling
     */
    nodeSelector?: { [key: string]: string; };
    /**
     * tolerations are appended (excluding duplicates) to pods running with this RuntimeClass during admission, effectively unioning the set of nodes tolerated by the pod and the RuntimeClass.
     * @type {Array<V1Toleration>}
     * @memberof V1alpha1Scheduling
     */
    tolerations?: Array<V1Toleration>;
}

export function V1alpha1SchedulingFromJSON(json: any): V1alpha1Scheduling {
    return V1alpha1SchedulingFromJSONTyped(json, false);
}

export function V1alpha1SchedulingFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1alpha1Scheduling {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nodeSelector': !exists(json, 'nodeSelector') ? undefined : json['nodeSelector'],
        'tolerations': !exists(json, 'tolerations') ? undefined : ((json['tolerations'] as Array<any>).map(V1TolerationFromJSON)),
    };
}

export function V1alpha1SchedulingToJSON(value?: V1alpha1Scheduling | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nodeSelector': value.nodeSelector,
        'tolerations': value.tolerations === undefined ? undefined : ((value.tolerations as Array<any>).map(V1TolerationToJSON)),
    };
}

