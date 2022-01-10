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
    AdmissionregistrationV1WebhookClientConfig,
    AdmissionregistrationV1WebhookClientConfigFromJSON,
    AdmissionregistrationV1WebhookClientConfigFromJSONTyped,
    AdmissionregistrationV1WebhookClientConfigToJSON,
} from './';
import {
    V1LabelSelector,
    V1LabelSelectorFromJSON,
    V1LabelSelectorFromJSONTyped,
    V1LabelSelectorToJSON,
} from './';
import {
    V1RuleWithOperations,
    V1RuleWithOperationsFromJSON,
    V1RuleWithOperationsFromJSONTyped,
    V1RuleWithOperationsToJSON,
} from './';

/**
 * ValidatingWebhook describes an admission webhook and the resources and operations it applies to.
 * @export
 * @interface V1ValidatingWebhook
 */
export interface V1ValidatingWebhook {
    /**
     * AdmissionReviewVersions is an ordered list of preferred `AdmissionReview` versions the Webhook expects. API server will try to use first version in the list which it supports. If none of the versions specified in this list supported by API server, validation will fail for this object. If a persisted webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail and be subject to the failure policy.
     * @type {Array<string>}
     * @memberof V1ValidatingWebhook
     */
    admissionReviewVersions: Array<string>;
    /**
     * 
     * @type {AdmissionregistrationV1WebhookClientConfig}
     * @memberof V1ValidatingWebhook
     */
    clientConfig: AdmissionregistrationV1WebhookClientConfig;
    /**
     * FailurePolicy defines how unrecognized errors from the admission endpoint are handled - allowed values are Ignore or Fail. Defaults to Fail.
     * @type {string}
     * @memberof V1ValidatingWebhook
     */
    failurePolicy?: string;
    /**
     * matchPolicy defines how the "rules" list is used to match incoming requests. Allowed values are "Exact" or "Equivalent".
     * 
     * - Exact: match a request only if it exactly matches a specified rule. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, but "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would not be sent to the webhook.
     * 
     * - Equivalent: match a request if modifies a resource listed in rules, even via another API group or version. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, and "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would be converted to apps/v1 and sent to the webhook.
     * 
     * Defaults to "Equivalent"
     * @type {string}
     * @memberof V1ValidatingWebhook
     */
    matchPolicy?: string;
    /**
     * The name of the admission webhook. Name should be fully qualified, e.g., imagepolicy.kubernetes.io, where "imagepolicy" is the name of the webhook, and kubernetes.io is the name of the organization. Required.
     * @type {string}
     * @memberof V1ValidatingWebhook
     */
    name: string;
    /**
     * 
     * @type {V1LabelSelector}
     * @memberof V1ValidatingWebhook
     */
    namespaceSelector?: V1LabelSelector;
    /**
     * 
     * @type {V1LabelSelector}
     * @memberof V1ValidatingWebhook
     */
    objectSelector?: V1LabelSelector;
    /**
     * Rules describes what operations on what resources/subresources the webhook cares about. The webhook cares about an operation if it matches _any_ Rule. However, in order to prevent ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks from putting the cluster in a state which cannot be recovered from without completely disabling the plugin, ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks are never called on admission requests for ValidatingWebhookConfiguration and MutatingWebhookConfiguration objects.
     * @type {Array<V1RuleWithOperations>}
     * @memberof V1ValidatingWebhook
     */
    rules?: Array<V1RuleWithOperations>;
    /**
     * SideEffects states whether this webhook has side effects. Acceptable values are: None, NoneOnDryRun (webhooks created via v1beta1 may also specify Some or Unknown). Webhooks with side effects MUST implement a reconciliation system, since a request may be rejected by a future step in the admission chain and the side effects therefore need to be undone. Requests with the dryRun attribute will be auto-rejected if they match a webhook with sideEffects == Unknown or Some.
     * @type {string}
     * @memberof V1ValidatingWebhook
     */
    sideEffects: string;
    /**
     * TimeoutSeconds specifies the timeout for this webhook. After the timeout passes, the webhook call will be ignored or the API call will fail based on the failure policy. The timeout value must be between 1 and 30 seconds. Default to 10 seconds.
     * @type {number}
     * @memberof V1ValidatingWebhook
     */
    timeoutSeconds?: number;
}

export function V1ValidatingWebhookFromJSON(json: any): V1ValidatingWebhook {
    return V1ValidatingWebhookFromJSONTyped(json, false);
}

export function V1ValidatingWebhookFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1ValidatingWebhook {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'admissionReviewVersions': json['admissionReviewVersions'],
        'clientConfig': AdmissionregistrationV1WebhookClientConfigFromJSON(json['clientConfig']),
        'failurePolicy': !exists(json, 'failurePolicy') ? undefined : json['failurePolicy'],
        'matchPolicy': !exists(json, 'matchPolicy') ? undefined : json['matchPolicy'],
        'name': json['name'],
        'namespaceSelector': !exists(json, 'namespaceSelector') ? undefined : V1LabelSelectorFromJSON(json['namespaceSelector']),
        'objectSelector': !exists(json, 'objectSelector') ? undefined : V1LabelSelectorFromJSON(json['objectSelector']),
        'rules': !exists(json, 'rules') ? undefined : ((json['rules'] as Array<any>).map(V1RuleWithOperationsFromJSON)),
        'sideEffects': json['sideEffects'],
        'timeoutSeconds': !exists(json, 'timeoutSeconds') ? undefined : json['timeoutSeconds'],
    };
}

export function V1ValidatingWebhookToJSON(value?: V1ValidatingWebhook | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'admissionReviewVersions': value.admissionReviewVersions,
        'clientConfig': AdmissionregistrationV1WebhookClientConfigToJSON(value.clientConfig),
        'failurePolicy': value.failurePolicy,
        'matchPolicy': value.matchPolicy,
        'name': value.name,
        'namespaceSelector': V1LabelSelectorToJSON(value.namespaceSelector),
        'objectSelector': V1LabelSelectorToJSON(value.objectSelector),
        'rules': value.rules === undefined ? undefined : ((value.rules as Array<any>).map(V1RuleWithOperationsToJSON)),
        'sideEffects': value.sideEffects,
        'timeoutSeconds': value.timeoutSeconds,
    };
}

