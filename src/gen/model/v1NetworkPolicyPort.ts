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

import { RequestFile } from './models';

/**
* NetworkPolicyPort describes a port to allow traffic on
*/
export class V1NetworkPolicyPort {
    /**
    * If set, indicates that the range of ports from port to endPort, inclusive, should be allowed by the policy. This field cannot be defined if the port field is not defined or if the port field is defined as a named (string) port. The endPort must be equal or greater than port. This feature is in Beta state and is enabled by default. It can be disabled using the Feature Gate \"NetworkPolicyEndPort\".
    */
    'endPort'?: number;
    /**
    * The port on the given protocol. This can either be a numerical or named port on a pod. If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
    */
    'port'?: object;
    /**
    * The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
    */
    'protocol'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "endPort",
            "baseName": "endPort",
            "type": "number"
        },
        {
            "name": "port",
            "baseName": "port",
            "type": "object"
        },
        {
            "name": "protocol",
            "baseName": "protocol",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return V1NetworkPolicyPort.attributeTypeMap;
    }
}

