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
    V1HTTPIngressPath,
    V1HTTPIngressPathFromJSON,
    V1HTTPIngressPathFromJSONTyped,
    V1HTTPIngressPathToJSON,
} from './V1HTTPIngressPath';

/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 * @export
 * @interface V1HTTPIngressRuleValue
 */
export interface V1HTTPIngressRuleValue {
    /**
     * A collection of paths that map requests to backends.
     * @type {Array<V1HTTPIngressPath>}
     * @memberof V1HTTPIngressRuleValue
     */
    paths: Array<V1HTTPIngressPath>;
}

export function V1HTTPIngressRuleValueFromJSON(json: any): V1HTTPIngressRuleValue {
    return V1HTTPIngressRuleValueFromJSONTyped(json, false);
}

export function V1HTTPIngressRuleValueFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1HTTPIngressRuleValue {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paths': ((json['paths'] as Array<any>).map(V1HTTPIngressPathFromJSON)),
    };
}

export function V1HTTPIngressRuleValueToJSON(value?: V1HTTPIngressRuleValue | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paths': ((value.paths as Array<any>).map(V1HTTPIngressPathToJSON)),
    };
}

