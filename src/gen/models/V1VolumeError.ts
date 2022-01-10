/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.22.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

/**
* VolumeError captures an error encountered during a volume operation.
*/
export class V1VolumeError {
    /**
    * String detailing the error encountered during Attach or Detach operation. This string may be logged, so it should not contain sensitive information.
    */
    'message'?: string;
    /**
    * Time the error was encountered.
    */
    'time'?: Date;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "message",
            "baseName": "message",
            "type": "string",
            "format": ""
        },
        {
            "name": "time",
            "baseName": "time",
            "type": "Date",
            "format": "date-time"
        }    ];

    static getAttributeTypeMap() {
        return V1VolumeError.attributeTypeMap;
    }

    public constructor() {
    }
}

