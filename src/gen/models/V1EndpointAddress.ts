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

import { V1ObjectReference } from '../models/V1ObjectReference';
import { HttpFile } from '../http/http';

/**
* EndpointAddress is a tuple that describes single IP address.
*/
export class V1EndpointAddress {
    /**
    * The Hostname of this endpoint
    */
    'hostname'?: string;
    /**
    * The IP of this endpoint. May not be loopback (127.0.0.0/8 or ::1), link-local (169.254.0.0/16 or fe80::/10), or link-local multicast (224.0.0.0/24 or ff02::/16).
    */
    'ip': string;
    /**
    * Optional: Node hosting this endpoint. This can be used to determine endpoints local to a node.
    */
    'nodeName'?: string;
    'targetRef'?: V1ObjectReference;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "hostname",
            "baseName": "hostname",
            "type": "string",
            "format": ""
        },
        {
            "name": "ip",
            "baseName": "ip",
            "type": "string",
            "format": ""
        },
        {
            "name": "nodeName",
            "baseName": "nodeName",
            "type": "string",
            "format": ""
        },
        {
            "name": "targetRef",
            "baseName": "targetRef",
            "type": "V1ObjectReference",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1EndpointAddress.attributeTypeMap;
    }

    public constructor() {
    }
}

