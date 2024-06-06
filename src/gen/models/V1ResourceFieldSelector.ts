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

import { HttpFile } from '../http/http';

/**
* ResourceFieldSelector represents container resources (cpu, memory) and their output format
*/
export class V1ResourceFieldSelector {
    /**
    * Container name: required for volumes, optional for env vars
    */
    'containerName'?: string;
    /**
    * Specifies the output format of the exposed resources, defaults to \"1\"
    */
    'divisor'?: string;
    /**
    * Required: resource to select
    */
    'resource': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "containerName",
            "baseName": "containerName",
            "type": "string",
            "format": ""
        },
        {
            "name": "divisor",
            "baseName": "divisor",
            "type": "string",
            "format": ""
        },
        {
            "name": "resource",
            "baseName": "resource",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1ResourceFieldSelector.attributeTypeMap;
    }

    public constructor() {
    }
}

