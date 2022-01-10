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

import { V1LoadBalancerIngress } from './V1LoadBalancerIngress';
import { HttpFile } from '../http/http';

/**
* LoadBalancerStatus represents the status of a load-balancer.
*/
export class V1LoadBalancerStatus {
    /**
    * Ingress is a list containing ingress points for the load-balancer. Traffic intended for the service should be sent to these ingress points.
    */
    'ingress'?: Array<V1LoadBalancerIngress>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "ingress",
            "baseName": "ingress",
            "type": "Array<V1LoadBalancerIngress>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1LoadBalancerStatus.attributeTypeMap;
    }

    public constructor() {
    }
}

