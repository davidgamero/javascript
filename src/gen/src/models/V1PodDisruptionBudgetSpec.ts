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
    IntOrString,
    IntOrStringFromJSON,
    IntOrStringFromJSONTyped,
    IntOrStringToJSON,
} from './';
import {
    V1LabelSelector,
    V1LabelSelectorFromJSON,
    V1LabelSelectorFromJSONTyped,
    V1LabelSelectorToJSON,
} from './';

/**
 * PodDisruptionBudgetSpec is a description of a PodDisruptionBudget.
 * @export
 * @interface V1PodDisruptionBudgetSpec
 */
export interface V1PodDisruptionBudgetSpec {
    /**
     * IntOrString is a type that can hold an int32 or a string.  When used in JSON or YAML marshalling and unmarshalling, it produces or consumes the inner type.  This allows you to have, for example, a JSON field that can accept a name or number.
     * @type {IntOrString}
     * @memberof V1PodDisruptionBudgetSpec
     */
    maxUnavailable?: IntOrString;
    /**
     * IntOrString is a type that can hold an int32 or a string.  When used in JSON or YAML marshalling and unmarshalling, it produces or consumes the inner type.  This allows you to have, for example, a JSON field that can accept a name or number.
     * @type {IntOrString}
     * @memberof V1PodDisruptionBudgetSpec
     */
    minAvailable?: IntOrString;
    /**
     * 
     * @type {V1LabelSelector}
     * @memberof V1PodDisruptionBudgetSpec
     */
    selector?: V1LabelSelector;
}

export function V1PodDisruptionBudgetSpecFromJSON(json: any): V1PodDisruptionBudgetSpec {
    return V1PodDisruptionBudgetSpecFromJSONTyped(json, false);
}

export function V1PodDisruptionBudgetSpecFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1PodDisruptionBudgetSpec {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxUnavailable': !exists(json, 'maxUnavailable') ? undefined : IntOrStringFromJSON(json['maxUnavailable']),
        'minAvailable': !exists(json, 'minAvailable') ? undefined : IntOrStringFromJSON(json['minAvailable']),
        'selector': !exists(json, 'selector') ? undefined : V1LabelSelectorFromJSON(json['selector']),
    };
}

export function V1PodDisruptionBudgetSpecToJSON(value?: V1PodDisruptionBudgetSpec | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxUnavailable': IntOrStringToJSON(value.maxUnavailable),
        'minAvailable': IntOrStringToJSON(value.minAvailable),
        'selector': V1LabelSelectorToJSON(value.selector),
    };
}

