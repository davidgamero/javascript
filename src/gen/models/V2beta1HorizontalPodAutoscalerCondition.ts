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
* HorizontalPodAutoscalerCondition describes the state of a HorizontalPodAutoscaler at a certain point.
*/
export class V2beta1HorizontalPodAutoscalerCondition {
    /**
    * lastTransitionTime is the last time the condition transitioned from one status to another
    */
    'lastTransitionTime'?: Date;
    /**
    * message is a human-readable explanation containing details about the transition
    */
    'message'?: string;
    /**
    * reason is the reason for the condition's last transition.
    */
    'reason'?: string;
    /**
    * status is the status of the condition (True, False, Unknown)
    */
    'status': string;
    /**
    * type describes the current condition
    */
    'type': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "lastTransitionTime",
            "baseName": "lastTransitionTime",
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "message",
            "baseName": "message",
            "type": "string",
            "format": ""
        },
        {
            "name": "reason",
            "baseName": "reason",
            "type": "string",
            "format": ""
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "string",
            "format": ""
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V2beta1HorizontalPodAutoscalerCondition.attributeTypeMap;
    }

    public constructor() {
    }
}

