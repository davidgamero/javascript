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
* IDRange provides a min/max of an allowed range of IDs.
*/
export class V1beta1IDRange {
    /**
    * max is the end of the range, inclusive.
    */
    'max': number;
    /**
    * min is the start of the range, inclusive.
    */
    'min': number;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "max",
            "baseName": "max",
            "type": "number",
            "format": "int64"
        },
        {
            "name": "min",
            "baseName": "min",
            "type": "number",
            "format": "int64"
        }    ];

    static getAttributeTypeMap() {
        return V1beta1IDRange.attributeTypeMap;
    }

    public constructor() {
    }
}

