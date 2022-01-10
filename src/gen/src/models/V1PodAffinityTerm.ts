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
    V1LabelSelector,
    V1LabelSelectorFromJSON,
    V1LabelSelectorFromJSONTyped,
    V1LabelSelectorToJSON,
} from './';

/**
 * Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running
 * @export
 * @interface V1PodAffinityTerm
 */
export interface V1PodAffinityTerm {
    /**
     * 
     * @type {V1LabelSelector}
     * @memberof V1PodAffinityTerm
     */
    labelSelector?: V1LabelSelector;
    /**
     * 
     * @type {V1LabelSelector}
     * @memberof V1PodAffinityTerm
     */
    namespaceSelector?: V1LabelSelector;
    /**
     * namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod's namespace"
     * @type {Array<string>}
     * @memberof V1PodAffinityTerm
     */
    namespaces?: Array<string>;
    /**
     * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.
     * @type {string}
     * @memberof V1PodAffinityTerm
     */
    topologyKey: string;
}

export function V1PodAffinityTermFromJSON(json: any): V1PodAffinityTerm {
    return V1PodAffinityTermFromJSONTyped(json, false);
}

export function V1PodAffinityTermFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1PodAffinityTerm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'labelSelector': !exists(json, 'labelSelector') ? undefined : V1LabelSelectorFromJSON(json['labelSelector']),
        'namespaceSelector': !exists(json, 'namespaceSelector') ? undefined : V1LabelSelectorFromJSON(json['namespaceSelector']),
        'namespaces': !exists(json, 'namespaces') ? undefined : json['namespaces'],
        'topologyKey': json['topologyKey'],
    };
}

export function V1PodAffinityTermToJSON(value?: V1PodAffinityTerm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'labelSelector': V1LabelSelectorToJSON(value.labelSelector),
        'namespaceSelector': V1LabelSelectorToJSON(value.namespaceSelector),
        'namespaces': value.namespaces,
        'topologyKey': value.topologyKey,
    };
}

