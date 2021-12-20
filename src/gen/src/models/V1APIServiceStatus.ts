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
    V1APIServiceCondition,
    V1APIServiceConditionFromJSON,
    V1APIServiceConditionFromJSONTyped,
    V1APIServiceConditionToJSON,
} from './V1APIServiceCondition';

/**
 * APIServiceStatus contains derived information about an API server
 * @export
 * @interface V1APIServiceStatus
 */
export interface V1APIServiceStatus {
    /**
     * Current service state of apiService.
     * @type {Array<V1APIServiceCondition>}
     * @memberof V1APIServiceStatus
     */
    conditions?: Array<V1APIServiceCondition>;
}

export function V1APIServiceStatusFromJSON(json: any): V1APIServiceStatus {
    return V1APIServiceStatusFromJSONTyped(json, false);
}

export function V1APIServiceStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1APIServiceStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'conditions': !exists(json, 'conditions') ? undefined : ((json['conditions'] as Array<any>).map(V1APIServiceConditionFromJSON)),
    };
}

export function V1APIServiceStatusToJSON(value?: V1APIServiceStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'conditions': value.conditions === undefined ? undefined : ((value.conditions as Array<any>).map(V1APIServiceConditionToJSON)),
    };
}

