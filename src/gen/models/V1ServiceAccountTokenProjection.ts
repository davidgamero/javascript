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
* ServiceAccountTokenProjection represents a projected service account token volume. This projection can be used to insert a service account token into the pods runtime filesystem for use against APIs (Kubernetes API Server or otherwise).
*/
export class V1ServiceAccountTokenProjection {
    /**
    * Audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.
    */
    'audience'?: string;
    /**
    * ExpirationSeconds is the requested duration of validity of the service account token. As the token approaches expiration, the kubelet volume plugin will proactively rotate the service account token. The kubelet will start trying to rotate the token if the token is older than 80 percent of its time to live or if the token is older than 24 hours.Defaults to 1 hour and must be at least 10 minutes.
    */
    'expirationSeconds'?: number;
    /**
    * Path is the path relative to the mount point of the file to project the token into.
    */
    'path': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "audience",
            "baseName": "audience",
            "type": "string",
            "format": ""
        },
        {
            "name": "expirationSeconds",
            "baseName": "expirationSeconds",
            "type": "number",
            "format": "int64"
        },
        {
            "name": "path",
            "baseName": "path",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1ServiceAccountTokenProjection.attributeTypeMap;
    }

    public constructor() {
    }
}

