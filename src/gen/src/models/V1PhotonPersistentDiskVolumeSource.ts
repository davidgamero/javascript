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
/**
 * Represents a Photon Controller persistent disk resource.
 * @export
 * @interface V1PhotonPersistentDiskVolumeSource
 */
export interface V1PhotonPersistentDiskVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     * @type {string}
     * @memberof V1PhotonPersistentDiskVolumeSource
     */
    fsType?: string;
    /**
     * ID that identifies Photon Controller persistent disk
     * @type {string}
     * @memberof V1PhotonPersistentDiskVolumeSource
     */
    pdID: string;
}

export function V1PhotonPersistentDiskVolumeSourceFromJSON(json: any): V1PhotonPersistentDiskVolumeSource {
    return V1PhotonPersistentDiskVolumeSourceFromJSONTyped(json, false);
}

export function V1PhotonPersistentDiskVolumeSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1PhotonPersistentDiskVolumeSource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fsType': !exists(json, 'fsType') ? undefined : json['fsType'],
        'pdID': json['pdID'],
    };
}

export function V1PhotonPersistentDiskVolumeSourceToJSON(value?: V1PhotonPersistentDiskVolumeSource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fsType': value.fsType,
        'pdID': value.pdID,
    };
}

