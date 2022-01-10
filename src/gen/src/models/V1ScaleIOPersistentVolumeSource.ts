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
    V1SecretReference,
    V1SecretReferenceFromJSON,
    V1SecretReferenceFromJSONTyped,
    V1SecretReferenceToJSON,
} from './';

/**
 * ScaleIOPersistentVolumeSource represents a persistent ScaleIO volume
 * @export
 * @interface V1ScaleIOPersistentVolumeSource
 */
export interface V1ScaleIOPersistentVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs"
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    fsType?: string;
    /**
     * The host address of the ScaleIO API Gateway.
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    gateway: string;
    /**
     * The name of the ScaleIO Protection Domain for the configured storage.
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    protectionDomain?: string;
    /**
     * Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @type {boolean}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    readOnly?: boolean;
    /**
     * 
     * @type {V1SecretReference}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    secretRef: V1SecretReference;
    /**
     * Flag to enable/disable SSL communication with Gateway, default false
     * @type {boolean}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    sslEnabled?: boolean;
    /**
     * Indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    storageMode?: string;
    /**
     * The ScaleIO Storage Pool associated with the protection domain.
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    storagePool?: string;
    /**
     * The name of the storage system as configured in ScaleIO.
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    system: string;
    /**
     * The name of a volume already created in the ScaleIO system that is associated with this volume source.
     * @type {string}
     * @memberof V1ScaleIOPersistentVolumeSource
     */
    volumeName?: string;
}

export function V1ScaleIOPersistentVolumeSourceFromJSON(json: any): V1ScaleIOPersistentVolumeSource {
    return V1ScaleIOPersistentVolumeSourceFromJSONTyped(json, false);
}

export function V1ScaleIOPersistentVolumeSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1ScaleIOPersistentVolumeSource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fsType': !exists(json, 'fsType') ? undefined : json['fsType'],
        'gateway': json['gateway'],
        'protectionDomain': !exists(json, 'protectionDomain') ? undefined : json['protectionDomain'],
        'readOnly': !exists(json, 'readOnly') ? undefined : json['readOnly'],
        'secretRef': V1SecretReferenceFromJSON(json['secretRef']),
        'sslEnabled': !exists(json, 'sslEnabled') ? undefined : json['sslEnabled'],
        'storageMode': !exists(json, 'storageMode') ? undefined : json['storageMode'],
        'storagePool': !exists(json, 'storagePool') ? undefined : json['storagePool'],
        'system': json['system'],
        'volumeName': !exists(json, 'volumeName') ? undefined : json['volumeName'],
    };
}

export function V1ScaleIOPersistentVolumeSourceToJSON(value?: V1ScaleIOPersistentVolumeSource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fsType': value.fsType,
        'gateway': value.gateway,
        'protectionDomain': value.protectionDomain,
        'readOnly': value.readOnly,
        'secretRef': V1SecretReferenceToJSON(value.secretRef),
        'sslEnabled': value.sslEnabled,
        'storageMode': value.storageMode,
        'storagePool': value.storagePool,
        'system': value.system,
        'volumeName': value.volumeName,
    };
}

