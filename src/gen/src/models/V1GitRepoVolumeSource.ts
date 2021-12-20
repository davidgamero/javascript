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
/**
 * Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.
 * 
 * DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
 * @export
 * @interface V1GitRepoVolumeSource
 */
export interface V1GitRepoVolumeSource {
    /**
     * Target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.
     * @type {string}
     * @memberof V1GitRepoVolumeSource
     */
    directory?: string;
    /**
     * Repository URL
     * @type {string}
     * @memberof V1GitRepoVolumeSource
     */
    repository: string;
    /**
     * Commit hash for the specified revision.
     * @type {string}
     * @memberof V1GitRepoVolumeSource
     */
    revision?: string;
}

export function V1GitRepoVolumeSourceFromJSON(json: any): V1GitRepoVolumeSource {
    return V1GitRepoVolumeSourceFromJSONTyped(json, false);
}

export function V1GitRepoVolumeSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1GitRepoVolumeSource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'directory': !exists(json, 'directory') ? undefined : json['directory'],
        'repository': json['repository'],
        'revision': !exists(json, 'revision') ? undefined : json['revision'],
    };
}

export function V1GitRepoVolumeSourceToJSON(value?: V1GitRepoVolumeSource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'directory': value.directory,
        'repository': value.repository,
        'revision': value.revision,
    };
}

