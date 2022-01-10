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
    V1beta1CronJobSpec,
    V1beta1CronJobSpecFromJSON,
    V1beta1CronJobSpecFromJSONTyped,
    V1beta1CronJobSpecToJSON,
} from './';
import {
    V1beta1CronJobStatus,
    V1beta1CronJobStatusFromJSON,
    V1beta1CronJobStatusFromJSONTyped,
    V1beta1CronJobStatusToJSON,
} from './';

/**
 * CronJob represents the configuration of a single cron job.
 * @export
 * @interface V1beta1CronJob
 */
export interface V1beta1CronJob {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof V1beta1CronJob
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof V1beta1CronJob
     */
    kind?: string;
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof V1beta1CronJob
     */
    metadata?: V1ObjectMeta;
    /**
     * 
     * @type {V1beta1CronJobSpec}
     * @memberof V1beta1CronJob
     */
    spec?: V1beta1CronJobSpec;
    /**
     * 
     * @type {V1beta1CronJobStatus}
     * @memberof V1beta1CronJob
     */
    status?: V1beta1CronJobStatus;
}

export function V1beta1CronJobFromJSON(json: any): V1beta1CronJob {
    return V1beta1CronJobFromJSONTyped(json, false);
}

export function V1beta1CronJobFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1beta1CronJob {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'spec': !exists(json, 'spec') ? undefined : V1beta1CronJobSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : V1beta1CronJobStatusFromJSON(json['status']),
    };
}

export function V1beta1CronJobToJSON(value?: V1beta1CronJob | null): any {
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
        'spec': V1beta1CronJobSpecToJSON(value.spec),
        'status': V1beta1CronJobStatusToJSON(value.status),
    };
}

