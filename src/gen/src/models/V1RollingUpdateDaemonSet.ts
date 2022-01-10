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

/**
 * Spec to control the desired behavior of daemon set rolling update.
 * @export
 * @interface V1RollingUpdateDaemonSet
 */
export interface V1RollingUpdateDaemonSet {
    /**
     * IntOrString is a type that can hold an int32 or a string.  When used in JSON or YAML marshalling and unmarshalling, it produces or consumes the inner type.  This allows you to have, for example, a JSON field that can accept a name or number.
     * @type {IntOrString}
     * @memberof V1RollingUpdateDaemonSet
     */
    maxSurge?: IntOrString;
    /**
     * IntOrString is a type that can hold an int32 or a string.  When used in JSON or YAML marshalling and unmarshalling, it produces or consumes the inner type.  This allows you to have, for example, a JSON field that can accept a name or number.
     * @type {IntOrString}
     * @memberof V1RollingUpdateDaemonSet
     */
    maxUnavailable?: IntOrString;
}

export function V1RollingUpdateDaemonSetFromJSON(json: any): V1RollingUpdateDaemonSet {
    return V1RollingUpdateDaemonSetFromJSONTyped(json, false);
}

export function V1RollingUpdateDaemonSetFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1RollingUpdateDaemonSet {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxSurge': !exists(json, 'maxSurge') ? undefined : IntOrStringFromJSON(json['maxSurge']),
        'maxUnavailable': !exists(json, 'maxUnavailable') ? undefined : IntOrStringFromJSON(json['maxUnavailable']),
    };
}

export function V1RollingUpdateDaemonSetToJSON(value?: V1RollingUpdateDaemonSet | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxSurge': IntOrStringToJSON(value.maxSurge),
        'maxUnavailable': IntOrStringToJSON(value.maxUnavailable),
    };
}

