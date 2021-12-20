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


import * as runtime from '../runtime';
import {
    V1APIResourceList,
    V1APIResourceListFromJSON,
    V1APIResourceListToJSON,
    V1DeleteOptions,
    V1DeleteOptionsFromJSON,
    V1DeleteOptionsToJSON,
    V1Status,
    V1StatusFromJSON,
    V1StatusToJSON,
    V1beta1EndpointSlice,
    V1beta1EndpointSliceFromJSON,
    V1beta1EndpointSliceToJSON,
    V1beta1EndpointSliceList,
    V1beta1EndpointSliceListFromJSON,
    V1beta1EndpointSliceListToJSON,
} from '../models';

export interface DiscoveryV1beta1ApiCreateNamespacedEndpointSliceRequest {
    namespace: string;
    body: V1beta1EndpointSlice;
    pretty?: string;
    dryRun?: string;
    fieldManager?: string;
}

export interface DiscoveryV1beta1ApiDeleteCollectionNamespacedEndpointSliceRequest {
    namespace: string;
    pretty?: string;
    _continue?: string;
    dryRun?: string;
    fieldSelector?: string;
    gracePeriodSeconds?: number;
    labelSelector?: string;
    limit?: number;
    orphanDependents?: boolean;
    propagationPolicy?: string;
    resourceVersion?: string;
    resourceVersionMatch?: string;
    timeoutSeconds?: number;
    body?: V1DeleteOptions;
}

export interface DiscoveryV1beta1ApiDeleteNamespacedEndpointSliceRequest {
    name: string;
    namespace: string;
    pretty?: string;
    dryRun?: string;
    gracePeriodSeconds?: number;
    orphanDependents?: boolean;
    propagationPolicy?: string;
    body?: V1DeleteOptions;
}

export interface DiscoveryV1beta1ApiListEndpointSliceForAllNamespacesRequest {
    allowWatchBookmarks?: boolean;
    _continue?: string;
    fieldSelector?: string;
    labelSelector?: string;
    limit?: number;
    pretty?: string;
    resourceVersion?: string;
    resourceVersionMatch?: string;
    timeoutSeconds?: number;
    watch?: boolean;
}

export interface DiscoveryV1beta1ApiListNamespacedEndpointSliceRequest {
    namespace: string;
    pretty?: string;
    allowWatchBookmarks?: boolean;
    _continue?: string;
    fieldSelector?: string;
    labelSelector?: string;
    limit?: number;
    resourceVersion?: string;
    resourceVersionMatch?: string;
    timeoutSeconds?: number;
    watch?: boolean;
}

export interface DiscoveryV1beta1ApiPatchNamespacedEndpointSliceRequest {
    name: string;
    namespace: string;
    body: object;
    pretty?: string;
    dryRun?: string;
    fieldManager?: string;
    force?: boolean;
}

export interface DiscoveryV1beta1ApiReadNamespacedEndpointSliceRequest {
    name: string;
    namespace: string;
    pretty?: string;
}

export interface DiscoveryV1beta1ApiReplaceNamespacedEndpointSliceRequest {
    name: string;
    namespace: string;
    body: V1beta1EndpointSlice;
    pretty?: string;
    dryRun?: string;
    fieldManager?: string;
}

/**
 * 
 */
export class DiscoveryV1beta1Api extends runtime.BaseAPI {

    /**
     * create an EndpointSlice
     */
    async createNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiCreateNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1beta1EndpointSlice>> {
        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling createNamespacedEndpointSlice.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters.dryRun !== undefined) {
            queryParameters['dryRun'] = requestParameters.dryRun;
        }

        if (requestParameters.fieldManager !== undefined) {
            queryParameters['fieldManager'] = requestParameters.fieldManager;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices`.replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: V1beta1EndpointSliceToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1beta1EndpointSliceFromJSON(jsonValue));
    }

    /**
     * create an EndpointSlice
     */
    async createNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiCreateNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1beta1EndpointSlice> {
        const response = await this.createNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * delete collection of EndpointSlice
     */
    async deleteCollectionNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiDeleteCollectionNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1Status>> {
        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling deleteCollectionNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters._continue !== undefined) {
            queryParameters['continue'] = requestParameters._continue;
        }

        if (requestParameters.dryRun !== undefined) {
            queryParameters['dryRun'] = requestParameters.dryRun;
        }

        if (requestParameters.fieldSelector !== undefined) {
            queryParameters['fieldSelector'] = requestParameters.fieldSelector;
        }

        if (requestParameters.gracePeriodSeconds !== undefined) {
            queryParameters['gracePeriodSeconds'] = requestParameters.gracePeriodSeconds;
        }

        if (requestParameters.labelSelector !== undefined) {
            queryParameters['labelSelector'] = requestParameters.labelSelector;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.orphanDependents !== undefined) {
            queryParameters['orphanDependents'] = requestParameters.orphanDependents;
        }

        if (requestParameters.propagationPolicy !== undefined) {
            queryParameters['propagationPolicy'] = requestParameters.propagationPolicy;
        }

        if (requestParameters.resourceVersion !== undefined) {
            queryParameters['resourceVersion'] = requestParameters.resourceVersion;
        }

        if (requestParameters.resourceVersionMatch !== undefined) {
            queryParameters['resourceVersionMatch'] = requestParameters.resourceVersionMatch;
        }

        if (requestParameters.timeoutSeconds !== undefined) {
            queryParameters['timeoutSeconds'] = requestParameters.timeoutSeconds;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices`.replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: V1DeleteOptionsToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1StatusFromJSON(jsonValue));
    }

    /**
     * delete collection of EndpointSlice
     */
    async deleteCollectionNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiDeleteCollectionNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1Status> {
        const response = await this.deleteCollectionNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * delete an EndpointSlice
     */
    async deleteNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiDeleteNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1Status>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling deleteNamespacedEndpointSlice.');
        }

        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling deleteNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters.dryRun !== undefined) {
            queryParameters['dryRun'] = requestParameters.dryRun;
        }

        if (requestParameters.gracePeriodSeconds !== undefined) {
            queryParameters['gracePeriodSeconds'] = requestParameters.gracePeriodSeconds;
        }

        if (requestParameters.orphanDependents !== undefined) {
            queryParameters['orphanDependents'] = requestParameters.orphanDependents;
        }

        if (requestParameters.propagationPolicy !== undefined) {
            queryParameters['propagationPolicy'] = requestParameters.propagationPolicy;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))).replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: V1DeleteOptionsToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1StatusFromJSON(jsonValue));
    }

    /**
     * delete an EndpointSlice
     */
    async deleteNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiDeleteNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1Status> {
        const response = await this.deleteNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get available resources
     */
    async getAPIResourcesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1APIResourceList>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1APIResourceListFromJSON(jsonValue));
    }

    /**
     * get available resources
     */
    async getAPIResources(initOverrides?: RequestInit): Promise<V1APIResourceList> {
        const response = await this.getAPIResourcesRaw(initOverrides);
        return await response.value();
    }

    /**
     * list or watch objects of kind EndpointSlice
     */
    async listEndpointSliceForAllNamespacesRaw(requestParameters: DiscoveryV1beta1ApiListEndpointSliceForAllNamespacesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1beta1EndpointSliceList>> {
        const queryParameters: any = {};

        if (requestParameters.allowWatchBookmarks !== undefined) {
            queryParameters['allowWatchBookmarks'] = requestParameters.allowWatchBookmarks;
        }

        if (requestParameters._continue !== undefined) {
            queryParameters['continue'] = requestParameters._continue;
        }

        if (requestParameters.fieldSelector !== undefined) {
            queryParameters['fieldSelector'] = requestParameters.fieldSelector;
        }

        if (requestParameters.labelSelector !== undefined) {
            queryParameters['labelSelector'] = requestParameters.labelSelector;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters.resourceVersion !== undefined) {
            queryParameters['resourceVersion'] = requestParameters.resourceVersion;
        }

        if (requestParameters.resourceVersionMatch !== undefined) {
            queryParameters['resourceVersionMatch'] = requestParameters.resourceVersionMatch;
        }

        if (requestParameters.timeoutSeconds !== undefined) {
            queryParameters['timeoutSeconds'] = requestParameters.timeoutSeconds;
        }

        if (requestParameters.watch !== undefined) {
            queryParameters['watch'] = requestParameters.watch;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/endpointslices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1beta1EndpointSliceListFromJSON(jsonValue));
    }

    /**
     * list or watch objects of kind EndpointSlice
     */
    async listEndpointSliceForAllNamespaces(requestParameters: DiscoveryV1beta1ApiListEndpointSliceForAllNamespacesRequest = {}, initOverrides?: RequestInit): Promise<V1beta1EndpointSliceList> {
        const response = await this.listEndpointSliceForAllNamespacesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * list or watch objects of kind EndpointSlice
     */
    async listNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiListNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1beta1EndpointSliceList>> {
        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling listNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters.allowWatchBookmarks !== undefined) {
            queryParameters['allowWatchBookmarks'] = requestParameters.allowWatchBookmarks;
        }

        if (requestParameters._continue !== undefined) {
            queryParameters['continue'] = requestParameters._continue;
        }

        if (requestParameters.fieldSelector !== undefined) {
            queryParameters['fieldSelector'] = requestParameters.fieldSelector;
        }

        if (requestParameters.labelSelector !== undefined) {
            queryParameters['labelSelector'] = requestParameters.labelSelector;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.resourceVersion !== undefined) {
            queryParameters['resourceVersion'] = requestParameters.resourceVersion;
        }

        if (requestParameters.resourceVersionMatch !== undefined) {
            queryParameters['resourceVersionMatch'] = requestParameters.resourceVersionMatch;
        }

        if (requestParameters.timeoutSeconds !== undefined) {
            queryParameters['timeoutSeconds'] = requestParameters.timeoutSeconds;
        }

        if (requestParameters.watch !== undefined) {
            queryParameters['watch'] = requestParameters.watch;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices`.replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1beta1EndpointSliceListFromJSON(jsonValue));
    }

    /**
     * list or watch objects of kind EndpointSlice
     */
    async listNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiListNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1beta1EndpointSliceList> {
        const response = await this.listNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * partially update the specified EndpointSlice
     */
    async patchNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiPatchNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1beta1EndpointSlice>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling patchNamespacedEndpointSlice.');
        }

        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling patchNamespacedEndpointSlice.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling patchNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters.dryRun !== undefined) {
            queryParameters['dryRun'] = requestParameters.dryRun;
        }

        if (requestParameters.fieldManager !== undefined) {
            queryParameters['fieldManager'] = requestParameters.fieldManager;
        }

        if (requestParameters.force !== undefined) {
            queryParameters['force'] = requestParameters.force;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))).replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1beta1EndpointSliceFromJSON(jsonValue));
    }

    /**
     * partially update the specified EndpointSlice
     */
    async patchNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiPatchNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1beta1EndpointSlice> {
        const response = await this.patchNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * read the specified EndpointSlice
     */
    async readNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiReadNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1beta1EndpointSlice>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling readNamespacedEndpointSlice.');
        }

        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling readNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))).replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1beta1EndpointSliceFromJSON(jsonValue));
    }

    /**
     * read the specified EndpointSlice
     */
    async readNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiReadNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1beta1EndpointSlice> {
        const response = await this.readNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * replace the specified EndpointSlice
     */
    async replaceNamespacedEndpointSliceRaw(requestParameters: DiscoveryV1beta1ApiReplaceNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1beta1EndpointSlice>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling replaceNamespacedEndpointSlice.');
        }

        if (requestParameters.namespace === null || requestParameters.namespace === undefined) {
            throw new runtime.RequiredError('namespace','Required parameter requestParameters.namespace was null or undefined when calling replaceNamespacedEndpointSlice.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling replaceNamespacedEndpointSlice.');
        }

        const queryParameters: any = {};

        if (requestParameters.pretty !== undefined) {
            queryParameters['pretty'] = requestParameters.pretty;
        }

        if (requestParameters.dryRun !== undefined) {
            queryParameters['dryRun'] = requestParameters.dryRun;
        }

        if (requestParameters.fieldManager !== undefined) {
            queryParameters['fieldManager'] = requestParameters.fieldManager;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["authorization"] = this.configuration.apiKey("authorization"); // BearerToken authentication
        }

        const response = await this.request({
            path: `/apis/discovery.k8s.io/v1beta1/namespaces/{namespace}/endpointslices/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))).replace(`{${"namespace"}}`, encodeURIComponent(String(requestParameters.namespace))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: V1beta1EndpointSliceToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1beta1EndpointSliceFromJSON(jsonValue));
    }

    /**
     * replace the specified EndpointSlice
     */
    async replaceNamespacedEndpointSlice(requestParameters: DiscoveryV1beta1ApiReplaceNamespacedEndpointSliceRequest, initOverrides?: RequestInit): Promise<V1beta1EndpointSlice> {
        const response = await this.replaceNamespacedEndpointSliceRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
