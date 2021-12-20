/* tslint:disable */
/* eslint-disable */
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

import { exists, mapValues } from '../runtime';
import {
    ApiextensionsV1WebhookClientConfig,
    ApiextensionsV1WebhookClientConfigFromJSON,
    ApiextensionsV1WebhookClientConfigFromJSONTyped,
    ApiextensionsV1WebhookClientConfigToJSON,
} from './ApiextensionsV1WebhookClientConfig';

/**
 * WebhookConversion describes how to call a conversion webhook
 * @export
 * @interface V1WebhookConversion
 */
export interface V1WebhookConversion {
    /**
     * 
     * @type {ApiextensionsV1WebhookClientConfig}
     * @memberof V1WebhookConversion
     */
    clientConfig?: ApiextensionsV1WebhookClientConfig;
    /**
     * conversionReviewVersions is an ordered list of preferred `ConversionReview` versions the Webhook expects. The API server will use the first version in the list which it supports. If none of the versions specified in this list are supported by API server, conversion will fail for the custom resource. If a persisted Webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail.
     * @type {Array<string>}
     * @memberof V1WebhookConversion
     */
    conversionReviewVersions: Array<string>;
}

export function V1WebhookConversionFromJSON(json: any): V1WebhookConversion {
    return V1WebhookConversionFromJSONTyped(json, false);
}

export function V1WebhookConversionFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1WebhookConversion {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clientConfig': !exists(json, 'clientConfig') ? undefined : ApiextensionsV1WebhookClientConfigFromJSON(json['clientConfig']),
        'conversionReviewVersions': json['conversionReviewVersions'],
    };
}

export function V1WebhookConversionToJSON(value?: V1WebhookConversion | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'clientConfig': ApiextensionsV1WebhookClientConfigToJSON(value.clientConfig),
        'conversionReviewVersions': value.conversionReviewVersions,
    };
}

