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

import { V1ResourceClaim } from '../models/V1ResourceClaim';
import { HttpFile } from '../http/http';

/**
* ResourceRequirements describes the compute resource requirements.
*/
export class V1ResourceRequirements {
    /**
    * Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.  This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.  This field is immutable. It can only be set for containers.
    */
    'claims'?: Array<V1ResourceClaim>;
    /**
    * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
    */
    'limits'?: { [key: string]: string; };
    /**
    * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
    */
    'requests'?: { [key: string]: string; };

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "claims",
            "baseName": "claims",
            "type": "Array<V1ResourceClaim>",
            "format": ""
        },
        {
            "name": "limits",
            "baseName": "limits",
            "type": "{ [key: string]: string; }",
            "format": ""
        },
        {
            "name": "requests",
            "baseName": "requests",
            "type": "{ [key: string]: string; }",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1ResourceRequirements.attributeTypeMap;
    }

    public constructor() {
    }
}

