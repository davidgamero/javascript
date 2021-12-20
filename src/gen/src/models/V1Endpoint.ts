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
    V1EndpointConditions,
    V1EndpointConditionsFromJSON,
    V1EndpointConditionsFromJSONTyped,
    V1EndpointConditionsToJSON,
} from './V1EndpointConditions';
import {
    V1EndpointHints,
    V1EndpointHintsFromJSON,
    V1EndpointHintsFromJSONTyped,
    V1EndpointHintsToJSON,
} from './V1EndpointHints';
import {
    V1ObjectReference,
    V1ObjectReferenceFromJSON,
    V1ObjectReferenceFromJSONTyped,
    V1ObjectReferenceToJSON,
} from './V1ObjectReference';

/**
 * Endpoint represents a single logical "backend" implementing a service.
 * @export
 * @interface V1Endpoint
 */
export interface V1Endpoint {
    /**
     * addresses of this endpoint. The contents of this field are interpreted according to the corresponding EndpointSlice addressType field. Consumers must handle different types of addresses in the context of their own capabilities. This must contain at least one address but no more than 100.
     * @type {Array<string>}
     * @memberof V1Endpoint
     */
    addresses: Array<string>;
    /**
     * 
     * @type {V1EndpointConditions}
     * @memberof V1Endpoint
     */
    conditions?: V1EndpointConditions;
    /**
     * deprecatedTopology contains topology information part of the v1beta1 API. This field is deprecated, and will be removed when the v1beta1 API is removed (no sooner than kubernetes v1.24).  While this field can hold values, it is not writable through the v1 API, and any attempts to write to it will be silently ignored. Topology information can be found in the zone and nodeName fields instead.
     * @type {{ [key: string]: string; }}
     * @memberof V1Endpoint
     */
    deprecatedTopology?: { [key: string]: string; };
    /**
     * 
     * @type {V1EndpointHints}
     * @memberof V1Endpoint
     */
    hints?: V1EndpointHints;
    /**
     * hostname of this endpoint. This field may be used by consumers of endpoints to distinguish endpoints from each other (e.g. in DNS names). Multiple endpoints which use the same hostname should be considered fungible (e.g. multiple A values in DNS). Must be lowercase and pass DNS Label (RFC 1123) validation.
     * @type {string}
     * @memberof V1Endpoint
     */
    hostname?: string;
    /**
     * nodeName represents the name of the Node hosting this endpoint. This can be used to determine endpoints local to a Node. This field can be enabled with the EndpointSliceNodeName feature gate.
     * @type {string}
     * @memberof V1Endpoint
     */
    nodeName?: string;
    /**
     * 
     * @type {V1ObjectReference}
     * @memberof V1Endpoint
     */
    targetRef?: V1ObjectReference;
    /**
     * zone is the name of the Zone this endpoint exists in.
     * @type {string}
     * @memberof V1Endpoint
     */
    zone?: string;
}

export function V1EndpointFromJSON(json: any): V1Endpoint {
    return V1EndpointFromJSONTyped(json, false);
}

export function V1EndpointFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1Endpoint {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'addresses': json['addresses'],
        'conditions': !exists(json, 'conditions') ? undefined : V1EndpointConditionsFromJSON(json['conditions']),
        'deprecatedTopology': !exists(json, 'deprecatedTopology') ? undefined : json['deprecatedTopology'],
        'hints': !exists(json, 'hints') ? undefined : V1EndpointHintsFromJSON(json['hints']),
        'hostname': !exists(json, 'hostname') ? undefined : json['hostname'],
        'nodeName': !exists(json, 'nodeName') ? undefined : json['nodeName'],
        'targetRef': !exists(json, 'targetRef') ? undefined : V1ObjectReferenceFromJSON(json['targetRef']),
        'zone': !exists(json, 'zone') ? undefined : json['zone'],
    };
}

export function V1EndpointToJSON(value?: V1Endpoint | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'addresses': value.addresses,
        'conditions': V1EndpointConditionsToJSON(value.conditions),
        'deprecatedTopology': value.deprecatedTopology,
        'hints': V1EndpointHintsToJSON(value.hints),
        'hostname': value.hostname,
        'nodeName': value.nodeName,
        'targetRef': V1ObjectReferenceToJSON(value.targetRef),
        'zone': value.zone,
    };
}

