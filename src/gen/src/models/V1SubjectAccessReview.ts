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
    V1SubjectAccessReviewSpec,
    V1SubjectAccessReviewSpecFromJSON,
    V1SubjectAccessReviewSpecFromJSONTyped,
    V1SubjectAccessReviewSpecToJSON,
} from './';
import {
    V1SubjectAccessReviewStatus,
    V1SubjectAccessReviewStatusFromJSON,
    V1SubjectAccessReviewStatusFromJSONTyped,
    V1SubjectAccessReviewStatusToJSON,
} from './';

/**
 * SubjectAccessReview checks whether or not a user or group can perform an action.
 * @export
 * @interface V1SubjectAccessReview
 */
export interface V1SubjectAccessReview {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof V1SubjectAccessReview
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof V1SubjectAccessReview
     */
    kind?: string;
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof V1SubjectAccessReview
     */
    metadata?: V1ObjectMeta;
    /**
     * 
     * @type {V1SubjectAccessReviewSpec}
     * @memberof V1SubjectAccessReview
     */
    spec: V1SubjectAccessReviewSpec;
    /**
     * 
     * @type {V1SubjectAccessReviewStatus}
     * @memberof V1SubjectAccessReview
     */
    status?: V1SubjectAccessReviewStatus;
}

export function V1SubjectAccessReviewFromJSON(json: any): V1SubjectAccessReview {
    return V1SubjectAccessReviewFromJSONTyped(json, false);
}

export function V1SubjectAccessReviewFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1SubjectAccessReview {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'spec': V1SubjectAccessReviewSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : V1SubjectAccessReviewStatusFromJSON(json['status']),
    };
}

export function V1SubjectAccessReviewToJSON(value?: V1SubjectAccessReview | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiVersion': value.apiVersion,
        'kind': value.kind,
        'metadata': V1ObjectMetaToJSON(value.metadata),
        'spec': V1SubjectAccessReviewSpecToJSON(value.spec),
        'status': V1SubjectAccessReviewStatusToJSON(value.status),
    };
}

