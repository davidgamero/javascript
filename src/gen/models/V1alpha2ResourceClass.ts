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

import { V1NodeSelector } from '../models/V1NodeSelector';
import { V1ObjectMeta } from '../models/V1ObjectMeta';
import { V1alpha2ResourceClassParametersReference } from '../models/V1alpha2ResourceClassParametersReference';
import { HttpFile } from '../http/http';

/**
* ResourceClass is used by administrators to influence how resources are allocated.  This is an alpha type and requires enabling the DynamicResourceAllocation feature gate.
*/
export class V1alpha2ResourceClass {
    /**
    * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
    */
    'apiVersion'?: string;
    /**
    * DriverName defines the name of the dynamic resource driver that is used for allocation of a ResourceClaim that uses this class.  Resource drivers have a unique name in forward domain order (acme.example.com).
    */
    'driverName': string;
    /**
    * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
    */
    'kind'?: string;
    'metadata'?: V1ObjectMeta;
    'parametersRef'?: V1alpha2ResourceClassParametersReference;
    'suitableNodes'?: V1NodeSelector;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "apiVersion",
            "baseName": "apiVersion",
            "type": "string",
            "format": ""
        },
        {
            "name": "driverName",
            "baseName": "driverName",
            "type": "string",
            "format": ""
        },
        {
            "name": "kind",
            "baseName": "kind",
            "type": "string",
            "format": ""
        },
        {
            "name": "metadata",
            "baseName": "metadata",
            "type": "V1ObjectMeta",
            "format": ""
        },
        {
            "name": "parametersRef",
            "baseName": "parametersRef",
            "type": "V1alpha2ResourceClassParametersReference",
            "format": ""
        },
        {
            "name": "suitableNodes",
            "baseName": "suitableNodes",
            "type": "V1NodeSelector",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha2ResourceClass.attributeTypeMap;
    }

    public constructor() {
    }
}

