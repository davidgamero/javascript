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
} from './V1ObjectMeta';
import {
    V1VolumeAttachmentSpec,
    V1VolumeAttachmentSpecFromJSON,
    V1VolumeAttachmentSpecFromJSONTyped,
    V1VolumeAttachmentSpecToJSON,
} from './V1VolumeAttachmentSpec';
import {
    V1VolumeAttachmentStatus,
    V1VolumeAttachmentStatusFromJSON,
    V1VolumeAttachmentStatusFromJSONTyped,
    V1VolumeAttachmentStatusToJSON,
} from './V1VolumeAttachmentStatus';

/**
 * VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node.
 * 
 * VolumeAttachment objects are non-namespaced.
 * @export
 * @interface V1VolumeAttachment
 */
export interface V1VolumeAttachment {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     * @type {string}
     * @memberof V1VolumeAttachment
     */
    apiVersion?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     * @type {string}
     * @memberof V1VolumeAttachment
     */
    kind?: string;
    /**
     * 
     * @type {V1ObjectMeta}
     * @memberof V1VolumeAttachment
     */
    metadata?: V1ObjectMeta;
    /**
     * 
     * @type {V1VolumeAttachmentSpec}
     * @memberof V1VolumeAttachment
     */
    spec: V1VolumeAttachmentSpec;
    /**
     * 
     * @type {V1VolumeAttachmentStatus}
     * @memberof V1VolumeAttachment
     */
    status?: V1VolumeAttachmentStatus;
}

export function V1VolumeAttachmentFromJSON(json: any): V1VolumeAttachment {
    return V1VolumeAttachmentFromJSONTyped(json, false);
}

export function V1VolumeAttachmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1VolumeAttachment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiVersion': !exists(json, 'apiVersion') ? undefined : json['apiVersion'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'metadata': !exists(json, 'metadata') ? undefined : V1ObjectMetaFromJSON(json['metadata']),
        'spec': V1VolumeAttachmentSpecFromJSON(json['spec']),
        'status': !exists(json, 'status') ? undefined : V1VolumeAttachmentStatusFromJSON(json['status']),
    };
}

export function V1VolumeAttachmentToJSON(value?: V1VolumeAttachment | null): any {
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
        'spec': V1VolumeAttachmentSpecToJSON(value.spec),
        'status': V1VolumeAttachmentStatusToJSON(value.status),
    };
}

