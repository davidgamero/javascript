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
    V1AttachedVolume,
    V1AttachedVolumeFromJSON,
    V1AttachedVolumeFromJSONTyped,
    V1AttachedVolumeToJSON,
} from './';
import {
    V1ContainerImage,
    V1ContainerImageFromJSON,
    V1ContainerImageFromJSONTyped,
    V1ContainerImageToJSON,
} from './';
import {
    V1NodeAddress,
    V1NodeAddressFromJSON,
    V1NodeAddressFromJSONTyped,
    V1NodeAddressToJSON,
} from './';
import {
    V1NodeCondition,
    V1NodeConditionFromJSON,
    V1NodeConditionFromJSONTyped,
    V1NodeConditionToJSON,
} from './';
import {
    V1NodeConfigStatus,
    V1NodeConfigStatusFromJSON,
    V1NodeConfigStatusFromJSONTyped,
    V1NodeConfigStatusToJSON,
} from './';
import {
    V1NodeDaemonEndpoints,
    V1NodeDaemonEndpointsFromJSON,
    V1NodeDaemonEndpointsFromJSONTyped,
    V1NodeDaemonEndpointsToJSON,
} from './';
import {
    V1NodeSystemInfo,
    V1NodeSystemInfoFromJSON,
    V1NodeSystemInfoFromJSONTyped,
    V1NodeSystemInfoToJSON,
} from './';

/**
 * NodeStatus is information about the current status of a node.
 * @export
 * @interface V1NodeStatus
 */
export interface V1NodeStatus {
    /**
     * List of addresses reachable to the node. Queried from cloud provider, if available. More info: https://kubernetes.io/docs/concepts/nodes/node/#addresses Note: This field is declared as mergeable, but the merge key is not sufficiently unique, which can cause data corruption when it is merged. Callers should instead use a full-replacement patch. See http://pr.k8s.io/79391 for an example.
     * @type {Array<V1NodeAddress>}
     * @memberof V1NodeStatus
     */
    addresses?: Array<V1NodeAddress>;
    /**
     * Allocatable represents the resources of a node that are available for scheduling. Defaults to Capacity.
     * @type {{ [key: string]: string; }}
     * @memberof V1NodeStatus
     */
    allocatable?: { [key: string]: string; };
    /**
     * Capacity represents the total resources of a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
     * @type {{ [key: string]: string; }}
     * @memberof V1NodeStatus
     */
    capacity?: { [key: string]: string; };
    /**
     * Conditions is an array of current observed node conditions. More info: https://kubernetes.io/docs/concepts/nodes/node/#condition
     * @type {Array<V1NodeCondition>}
     * @memberof V1NodeStatus
     */
    conditions?: Array<V1NodeCondition>;
    /**
     * 
     * @type {V1NodeConfigStatus}
     * @memberof V1NodeStatus
     */
    config?: V1NodeConfigStatus;
    /**
     * 
     * @type {V1NodeDaemonEndpoints}
     * @memberof V1NodeStatus
     */
    daemonEndpoints?: V1NodeDaemonEndpoints;
    /**
     * List of container images on this node
     * @type {Array<V1ContainerImage>}
     * @memberof V1NodeStatus
     */
    images?: Array<V1ContainerImage>;
    /**
     * 
     * @type {V1NodeSystemInfo}
     * @memberof V1NodeStatus
     */
    nodeInfo?: V1NodeSystemInfo;
    /**
     * NodePhase is the recently observed lifecycle phase of the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#phase The field is never populated, and now is deprecated.
     * @type {string}
     * @memberof V1NodeStatus
     */
    phase?: string;
    /**
     * List of volumes that are attached to the node.
     * @type {Array<V1AttachedVolume>}
     * @memberof V1NodeStatus
     */
    volumesAttached?: Array<V1AttachedVolume>;
    /**
     * List of attachable volumes in use (mounted) by the node.
     * @type {Array<string>}
     * @memberof V1NodeStatus
     */
    volumesInUse?: Array<string>;
}

export function V1NodeStatusFromJSON(json: any): V1NodeStatus {
    return V1NodeStatusFromJSONTyped(json, false);
}

export function V1NodeStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1NodeStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'addresses': !exists(json, 'addresses') ? undefined : ((json['addresses'] as Array<any>).map(V1NodeAddressFromJSON)),
        'allocatable': !exists(json, 'allocatable') ? undefined : json['allocatable'],
        'capacity': !exists(json, 'capacity') ? undefined : json['capacity'],
        'conditions': !exists(json, 'conditions') ? undefined : ((json['conditions'] as Array<any>).map(V1NodeConditionFromJSON)),
        'config': !exists(json, 'config') ? undefined : V1NodeConfigStatusFromJSON(json['config']),
        'daemonEndpoints': !exists(json, 'daemonEndpoints') ? undefined : V1NodeDaemonEndpointsFromJSON(json['daemonEndpoints']),
        'images': !exists(json, 'images') ? undefined : ((json['images'] as Array<any>).map(V1ContainerImageFromJSON)),
        'nodeInfo': !exists(json, 'nodeInfo') ? undefined : V1NodeSystemInfoFromJSON(json['nodeInfo']),
        'phase': !exists(json, 'phase') ? undefined : json['phase'],
        'volumesAttached': !exists(json, 'volumesAttached') ? undefined : ((json['volumesAttached'] as Array<any>).map(V1AttachedVolumeFromJSON)),
        'volumesInUse': !exists(json, 'volumesInUse') ? undefined : json['volumesInUse'],
    };
}

export function V1NodeStatusToJSON(value?: V1NodeStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'addresses': value.addresses === undefined ? undefined : ((value.addresses as Array<any>).map(V1NodeAddressToJSON)),
        'allocatable': value.allocatable,
        'capacity': value.capacity,
        'conditions': value.conditions === undefined ? undefined : ((value.conditions as Array<any>).map(V1NodeConditionToJSON)),
        'config': V1NodeConfigStatusToJSON(value.config),
        'daemonEndpoints': V1NodeDaemonEndpointsToJSON(value.daemonEndpoints),
        'images': value.images === undefined ? undefined : ((value.images as Array<any>).map(V1ContainerImageToJSON)),
        'nodeInfo': V1NodeSystemInfoToJSON(value.nodeInfo),
        'phase': value.phase,
        'volumesAttached': value.volumesAttached === undefined ? undefined : ((value.volumesAttached as Array<any>).map(V1AttachedVolumeToJSON)),
        'volumesInUse': value.volumesInUse,
    };
}

