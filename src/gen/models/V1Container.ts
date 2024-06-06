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

import { V1ContainerPort } from '../models/V1ContainerPort';
import { V1ContainerResizePolicy } from '../models/V1ContainerResizePolicy';
import { V1EnvFromSource } from '../models/V1EnvFromSource';
import { V1EnvVar } from '../models/V1EnvVar';
import { V1Lifecycle } from '../models/V1Lifecycle';
import { V1Probe } from '../models/V1Probe';
import { V1ResourceRequirements } from '../models/V1ResourceRequirements';
import { V1SecurityContext } from '../models/V1SecurityContext';
import { V1VolumeDevice } from '../models/V1VolumeDevice';
import { V1VolumeMount } from '../models/V1VolumeMount';
import { HttpFile } from '../http/http';

/**
* A single application container that you want to run within a pod.
*/
export class V1Container {
    /**
    * Arguments to the entrypoint. The container image\'s CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. \"$$(VAR_NAME)\" will produce the string literal \"$(VAR_NAME)\". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
    */
    'args'?: Array<string>;
    /**
    * Entrypoint array. Not executed within a shell. The container image\'s ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. \"$$(VAR_NAME)\" will produce the string literal \"$(VAR_NAME)\". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
    */
    'command'?: Array<string>;
    /**
    * List of environment variables to set in the container. Cannot be updated.
    */
    'env'?: Array<V1EnvVar>;
    /**
    * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
    */
    'envFrom'?: Array<V1EnvFromSource>;
    /**
    * Container image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.
    */
    'image'?: string;
    /**
    * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
    */
    'imagePullPolicy'?: string;
    'lifecycle'?: V1Lifecycle;
    'livenessProbe'?: V1Probe;
    /**
    * Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
    */
    'name': string;
    /**
    * List of ports to expose from the container. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default \"0.0.0.0\" address inside a container will be accessible from the network. Modifying this array with strategic merge patch may corrupt the data. For more information See https://github.com/kubernetes/kubernetes/issues/108255. Cannot be updated.
    */
    'ports'?: Array<V1ContainerPort>;
    'readinessProbe'?: V1Probe;
    /**
    * Resources resize policy for the container.
    */
    'resizePolicy'?: Array<V1ContainerResizePolicy>;
    'resources'?: V1ResourceRequirements;
    /**
    * RestartPolicy defines the restart behavior of individual containers in a pod. This field may only be set for init containers, and the only allowed value is \"Always\". For non-init containers or when this field is not specified, the restart behavior is defined by the Pod\'s restart policy and the container type. Setting the RestartPolicy as \"Always\" for the init container will have the following effect: this init container will be continually restarted on exit until all regular containers have terminated. Once all regular containers have completed, all init containers with restartPolicy \"Always\" will be shut down. This lifecycle differs from normal init containers and is often referred to as a \"sidecar\" container. Although this init container still starts in the init container sequence, it does not wait for the container to complete before proceeding to the next init container. Instead, the next init container starts immediately after this init container is started, or after any startupProbe has successfully completed.
    */
    'restartPolicy'?: string;
    'securityContext'?: V1SecurityContext;
    'startupProbe'?: V1Probe;
    /**
    * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
    */
    'stdin'?: boolean;
    /**
    * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
    */
    'stdinOnce'?: boolean;
    /**
    * Optional: Path at which the file to which the container\'s termination message will be written is mounted into the container\'s filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
    */
    'terminationMessagePath'?: string;
    /**
    * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
    */
    'terminationMessagePolicy'?: string;
    /**
    * Whether this container should allocate a TTY for itself, also requires \'stdin\' to be true. Default is false.
    */
    'tty'?: boolean;
    /**
    * volumeDevices is the list of block devices to be used by the container.
    */
    'volumeDevices'?: Array<V1VolumeDevice>;
    /**
    * Pod volumes to mount into the container\'s filesystem. Cannot be updated.
    */
    'volumeMounts'?: Array<V1VolumeMount>;
    /**
    * Container\'s working directory. If not specified, the container runtime\'s default will be used, which might be configured in the container image. Cannot be updated.
    */
    'workingDir'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "args",
            "baseName": "args",
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "command",
            "baseName": "command",
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "env",
            "baseName": "env",
            "type": "Array<V1EnvVar>",
            "format": ""
        },
        {
            "name": "envFrom",
            "baseName": "envFrom",
            "type": "Array<V1EnvFromSource>",
            "format": ""
        },
        {
            "name": "image",
            "baseName": "image",
            "type": "string",
            "format": ""
        },
        {
            "name": "imagePullPolicy",
            "baseName": "imagePullPolicy",
            "type": "string",
            "format": ""
        },
        {
            "name": "lifecycle",
            "baseName": "lifecycle",
            "type": "V1Lifecycle",
            "format": ""
        },
        {
            "name": "livenessProbe",
            "baseName": "livenessProbe",
            "type": "V1Probe",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "ports",
            "baseName": "ports",
            "type": "Array<V1ContainerPort>",
            "format": ""
        },
        {
            "name": "readinessProbe",
            "baseName": "readinessProbe",
            "type": "V1Probe",
            "format": ""
        },
        {
            "name": "resizePolicy",
            "baseName": "resizePolicy",
            "type": "Array<V1ContainerResizePolicy>",
            "format": ""
        },
        {
            "name": "resources",
            "baseName": "resources",
            "type": "V1ResourceRequirements",
            "format": ""
        },
        {
            "name": "restartPolicy",
            "baseName": "restartPolicy",
            "type": "string",
            "format": ""
        },
        {
            "name": "securityContext",
            "baseName": "securityContext",
            "type": "V1SecurityContext",
            "format": ""
        },
        {
            "name": "startupProbe",
            "baseName": "startupProbe",
            "type": "V1Probe",
            "format": ""
        },
        {
            "name": "stdin",
            "baseName": "stdin",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "stdinOnce",
            "baseName": "stdinOnce",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "terminationMessagePath",
            "baseName": "terminationMessagePath",
            "type": "string",
            "format": ""
        },
        {
            "name": "terminationMessagePolicy",
            "baseName": "terminationMessagePolicy",
            "type": "string",
            "format": ""
        },
        {
            "name": "tty",
            "baseName": "tty",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "volumeDevices",
            "baseName": "volumeDevices",
            "type": "Array<V1VolumeDevice>",
            "format": ""
        },
        {
            "name": "volumeMounts",
            "baseName": "volumeMounts",
            "type": "Array<V1VolumeMount>",
            "format": ""
        },
        {
            "name": "workingDir",
            "baseName": "workingDir",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1Container.attributeTypeMap;
    }

    public constructor() {
    }
}

