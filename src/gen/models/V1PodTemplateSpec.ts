/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.29.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1ObjectMeta } from '../models/V1ObjectMeta';
import { V1PodSpec } from '../models/V1PodSpec';
import { HttpFile } from '../http/http';

/**
* PodTemplateSpec describes the data a pod should have when created from a template
*/
export class V1PodTemplateSpec {
    'metadata'?: V1ObjectMeta;
    'spec'?: V1PodSpec;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "metadata",
            "baseName": "metadata",
            "type": "V1ObjectMeta",
            "format": ""
        },
        {
            "name": "spec",
            "baseName": "spec",
            "type": "V1PodSpec",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1PodTemplateSpec.attributeTypeMap;
    }

    public constructor() {
    }
}

