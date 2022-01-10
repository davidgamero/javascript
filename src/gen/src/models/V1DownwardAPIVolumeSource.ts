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
    V1DownwardAPIVolumeFile,
    V1DownwardAPIVolumeFileFromJSON,
    V1DownwardAPIVolumeFileFromJSONTyped,
    V1DownwardAPIVolumeFileToJSON,
} from './';

/**
 * DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.
 * @export
 * @interface V1DownwardAPIVolumeSource
 */
export interface V1DownwardAPIVolumeSource {
    /**
     * Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     * @type {number}
     * @memberof V1DownwardAPIVolumeSource
     */
    defaultMode?: number;
    /**
     * Items is a list of downward API volume file
     * @type {Array<V1DownwardAPIVolumeFile>}
     * @memberof V1DownwardAPIVolumeSource
     */
    items?: Array<V1DownwardAPIVolumeFile>;
}

export function V1DownwardAPIVolumeSourceFromJSON(json: any): V1DownwardAPIVolumeSource {
    return V1DownwardAPIVolumeSourceFromJSONTyped(json, false);
}

export function V1DownwardAPIVolumeSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1DownwardAPIVolumeSource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'defaultMode': !exists(json, 'defaultMode') ? undefined : json['defaultMode'],
        'items': !exists(json, 'items') ? undefined : ((json['items'] as Array<any>).map(V1DownwardAPIVolumeFileFromJSON)),
    };
}

export function V1DownwardAPIVolumeSourceToJSON(value?: V1DownwardAPIVolumeSource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'defaultMode': value.defaultMode,
        'items': value.items === undefined ? undefined : ((value.items as Array<any>).map(V1DownwardAPIVolumeFileToJSON)),
    };
}

