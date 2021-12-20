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
    V1ExternalDocumentation,
    V1ExternalDocumentationFromJSON,
    V1ExternalDocumentationFromJSONTyped,
    V1ExternalDocumentationToJSON,
} from './V1ExternalDocumentation';

/**
 * JSONSchemaProps is a JSON-Schema following Specification Draft 4 (http://json-schema.org/).
 * @export
 * @interface V1JSONSchemaProps
 */
export interface V1JSONSchemaProps {
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    $ref?: string;
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    $schema?: string;
    /**
     * JSONSchemaPropsOrBool represents JSONSchemaProps or a boolean value. Defaults to true for the boolean property.
     * @type {object}
     * @memberof V1JSONSchemaProps
     */
    additionalItems?: object;
    /**
     * JSONSchemaPropsOrBool represents JSONSchemaProps or a boolean value. Defaults to true for the boolean property.
     * @type {object}
     * @memberof V1JSONSchemaProps
     */
    additionalProperties?: object;
    /**
     * 
     * @type {Array<V1JSONSchemaProps>}
     * @memberof V1JSONSchemaProps
     */
    allOf?: Array<V1JSONSchemaProps>;
    /**
     * 
     * @type {Array<V1JSONSchemaProps>}
     * @memberof V1JSONSchemaProps
     */
    anyOf?: Array<V1JSONSchemaProps>;
    /**
     * default is a default value for undefined object fields. Defaulting is a beta feature under the CustomResourceDefaulting feature gate. Defaulting requires spec.preserveUnknownFields to be false.
     * @type {object}
     * @memberof V1JSONSchemaProps
     */
    _default?: object;
    /**
     * 
     * @type {{ [key: string]: V1JSONSchemaProps; }}
     * @memberof V1JSONSchemaProps
     */
    definitions?: { [key: string]: V1JSONSchemaProps; };
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof V1JSONSchemaProps
     */
    dependencies?: { [key: string]: object; };
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    description?: string;
    /**
     * 
     * @type {Array<object>}
     * @memberof V1JSONSchemaProps
     */
    _enum?: Array<object>;
    /**
     * JSON represents any valid JSON value. These types are supported: bool, int64, float64, string, []interface{}, map[string]interface{} and nil.
     * @type {object}
     * @memberof V1JSONSchemaProps
     */
    example?: object;
    /**
     * 
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    exclusiveMaximum?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    exclusiveMinimum?: boolean;
    /**
     * 
     * @type {V1ExternalDocumentation}
     * @memberof V1JSONSchemaProps
     */
    externalDocs?: V1ExternalDocumentation;
    /**
     * format is an OpenAPI v3 format string. Unknown formats are ignored. The following formats are validated:
     * 
     * - bsonobjectid: a bson object ID, i.e. a 24 characters hex string - uri: an URI as parsed by Golang net/url.ParseRequestURI - email: an email address as parsed by Golang net/mail.ParseAddress - hostname: a valid representation for an Internet host name, as defined by RFC 1034, section 3.1 [RFC1034]. - ipv4: an IPv4 IP as parsed by Golang net.ParseIP - ipv6: an IPv6 IP as parsed by Golang net.ParseIP - cidr: a CIDR as parsed by Golang net.ParseCIDR - mac: a MAC address as parsed by Golang net.ParseMAC - uuid: an UUID that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$ - uuid3: an UUID3 that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?3[0-9a-f]{3}-?[0-9a-f]{4}-?[0-9a-f]{12}$ - uuid4: an UUID4 that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?4[0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$ - uuid5: an UUID5 that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?5[0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$ - isbn: an ISBN10 or ISBN13 number string like "0321751043" or "978-0321751041" - isbn10: an ISBN10 number string like "0321751043" - isbn13: an ISBN13 number string like "978-0321751041" - creditcard: a credit card number defined by the regex ^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$ with any non digit characters mixed in - ssn: a U.S. social security number following the regex ^\d{3}[- ]?\d{2}[- ]?\d{4}$ - hexcolor: an hexadecimal color code like "#FFFFFF: following the regex ^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$ - rgbcolor: an RGB color code like rgb like "rgb(255,255,2559" - byte: base64 encoded binary data - password: any kind of string - date: a date string like "2006-01-02" as defined by full-date in RFC3339 - duration: a duration string like "22 ns" as parsed by Golang time.ParseDuration or compatible with Scala duration format - datetime: a date time string like "2014-12-15T19:30:20.000Z" as defined by date-time in RFC3339.
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    format?: string;
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    id?: string;
    /**
     * JSONSchemaPropsOrArray represents a value that can either be a JSONSchemaProps or an array of JSONSchemaProps. Mainly here for serialization purposes.
     * @type {object}
     * @memberof V1JSONSchemaProps
     */
    items?: object;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    maxItems?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    maxLength?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    maxProperties?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    maximum?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    minItems?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    minLength?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    minProperties?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    minimum?: number;
    /**
     * 
     * @type {number}
     * @memberof V1JSONSchemaProps
     */
    multipleOf?: number;
    /**
     * 
     * @type {V1JSONSchemaProps}
     * @memberof V1JSONSchemaProps
     */
    not?: V1JSONSchemaProps;
    /**
     * 
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    nullable?: boolean;
    /**
     * 
     * @type {Array<V1JSONSchemaProps>}
     * @memberof V1JSONSchemaProps
     */
    oneOf?: Array<V1JSONSchemaProps>;
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    pattern?: string;
    /**
     * 
     * @type {{ [key: string]: V1JSONSchemaProps; }}
     * @memberof V1JSONSchemaProps
     */
    patternProperties?: { [key: string]: V1JSONSchemaProps; };
    /**
     * 
     * @type {{ [key: string]: V1JSONSchemaProps; }}
     * @memberof V1JSONSchemaProps
     */
    properties?: { [key: string]: V1JSONSchemaProps; };
    /**
     * 
     * @type {Array<string>}
     * @memberof V1JSONSchemaProps
     */
    required?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    type?: string;
    /**
     * 
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    uniqueItems?: boolean;
    /**
     * x-kubernetes-embedded-resource defines that the value is an embedded Kubernetes runtime.Object, with TypeMeta and ObjectMeta. The type must be object. It is allowed to further restrict the embedded object. kind, apiVersion and metadata are validated automatically. x-kubernetes-preserve-unknown-fields is allowed to be true, but does not have to be if the object is fully specified (up to kind, apiVersion, metadata).
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    x_kubernetes_embedded_resource?: boolean;
    /**
     * x-kubernetes-int-or-string specifies that this value is either an integer or a string. If this is true, an empty type is allowed and type as child of anyOf is permitted if following one of the following patterns:
     * 
     * 1) anyOf:
     *    - type: integer
     *    - type: string
     * 2) allOf:
     *    - anyOf:
     *      - type: integer
     *      - type: string
     *    - ... zero or more
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    x_kubernetes_int_or_string?: boolean;
    /**
     * x-kubernetes-list-map-keys annotates an array with the x-kubernetes-list-type `map` by specifying the keys used as the index of the map.
     * 
     * This tag MUST only be used on lists that have the "x-kubernetes-list-type" extension set to "map". Also, the values specified for this attribute must be a scalar typed field of the child structure (no nesting is supported).
     * 
     * The properties specified must either be required or have a default value, to ensure those properties are present for all list items.
     * @type {Array<string>}
     * @memberof V1JSONSchemaProps
     */
    x_kubernetes_list_map_keys?: Array<string>;
    /**
     * x-kubernetes-list-type annotates an array to further describe its topology. This extension must only be used on lists and may have 3 possible values:
     * 
     * 1) `atomic`: the list is treated as a single entity, like a scalar.
     *      Atomic lists will be entirely replaced when updated. This extension
     *      may be used on any type of list (struct, scalar, ...).
     * 2) `set`:
     *      Sets are lists that must not have multiple items with the same value. Each
     *      value must be a scalar, an object with x-kubernetes-map-type `atomic` or an
     *      array with x-kubernetes-list-type `atomic`.
     * 3) `map`:
     *      These lists are like maps in that their elements have a non-index key
     *      used to identify them. Order is preserved upon merge. The map tag
     *      must only be used on a list with elements of type object.
     * Defaults to atomic for arrays.
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    x_kubernetes_list_type?: string;
    /**
     * x-kubernetes-map-type annotates an object to further describe its topology. This extension must only be used when type is object and may have 2 possible values:
     * 
     * 1) `granular`:
     *      These maps are actual maps (key-value pairs) and each fields are independent
     *      from each other (they can each be manipulated by separate actors). This is
     *      the default behaviour for all maps.
     * 2) `atomic`: the list is treated as a single entity, like a scalar.
     *      Atomic maps will be entirely replaced when updated.
     * @type {string}
     * @memberof V1JSONSchemaProps
     */
    x_kubernetes_map_type?: string;
    /**
     * x-kubernetes-preserve-unknown-fields stops the API server decoding step from pruning fields which are not specified in the validation schema. This affects fields recursively, but switches back to normal pruning behaviour if nested properties or additionalProperties are specified in the schema. This can either be true or undefined. False is forbidden.
     * @type {boolean}
     * @memberof V1JSONSchemaProps
     */
    x_kubernetes_preserve_unknown_fields?: boolean;
}

export function V1JSONSchemaPropsFromJSON(json: any): V1JSONSchemaProps {
    return V1JSONSchemaPropsFromJSONTyped(json, false);
}

export function V1JSONSchemaPropsFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1JSONSchemaProps {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '$ref': !exists(json, '$ref') ? undefined : json['$ref'],
        '$schema': !exists(json, '$schema') ? undefined : json['$schema'],
        'additionalItems': !exists(json, 'additionalItems') ? undefined : json['additionalItems'],
        'additionalProperties': !exists(json, 'additionalProperties') ? undefined : json['additionalProperties'],
        'allOf': !exists(json, 'allOf') ? undefined : ((json['allOf'] as Array<any>).map(V1JSONSchemaPropsFromJSON)),
        'anyOf': !exists(json, 'anyOf') ? undefined : ((json['anyOf'] as Array<any>).map(V1JSONSchemaPropsFromJSON)),
        '_default': !exists(json, 'default') ? undefined : json['default'],
        'definitions': !exists(json, 'definitions') ? undefined : (mapValues(json['definitions'], V1JSONSchemaPropsFromJSON)),
        'dependencies': !exists(json, 'dependencies') ? undefined : json['dependencies'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        '_enum': !exists(json, 'enum') ? undefined : json['enum'],
        'example': !exists(json, 'example') ? undefined : json['example'],
        'exclusiveMaximum': !exists(json, 'exclusiveMaximum') ? undefined : json['exclusiveMaximum'],
        'exclusiveMinimum': !exists(json, 'exclusiveMinimum') ? undefined : json['exclusiveMinimum'],
        'externalDocs': !exists(json, 'externalDocs') ? undefined : V1ExternalDocumentationFromJSON(json['externalDocs']),
        'format': !exists(json, 'format') ? undefined : json['format'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'items': !exists(json, 'items') ? undefined : json['items'],
        'maxItems': !exists(json, 'maxItems') ? undefined : json['maxItems'],
        'maxLength': !exists(json, 'maxLength') ? undefined : json['maxLength'],
        'maxProperties': !exists(json, 'maxProperties') ? undefined : json['maxProperties'],
        'maximum': !exists(json, 'maximum') ? undefined : json['maximum'],
        'minItems': !exists(json, 'minItems') ? undefined : json['minItems'],
        'minLength': !exists(json, 'minLength') ? undefined : json['minLength'],
        'minProperties': !exists(json, 'minProperties') ? undefined : json['minProperties'],
        'minimum': !exists(json, 'minimum') ? undefined : json['minimum'],
        'multipleOf': !exists(json, 'multipleOf') ? undefined : json['multipleOf'],
        'not': !exists(json, 'not') ? undefined : V1JSONSchemaPropsFromJSON(json['not']),
        'nullable': !exists(json, 'nullable') ? undefined : json['nullable'],
        'oneOf': !exists(json, 'oneOf') ? undefined : ((json['oneOf'] as Array<any>).map(V1JSONSchemaPropsFromJSON)),
        'pattern': !exists(json, 'pattern') ? undefined : json['pattern'],
        'patternProperties': !exists(json, 'patternProperties') ? undefined : (mapValues(json['patternProperties'], V1JSONSchemaPropsFromJSON)),
        'properties': !exists(json, 'properties') ? undefined : (mapValues(json['properties'], V1JSONSchemaPropsFromJSON)),
        'required': !exists(json, 'required') ? undefined : json['required'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'uniqueItems': !exists(json, 'uniqueItems') ? undefined : json['uniqueItems'],
        'x_kubernetes_embedded_resource': !exists(json, 'x-kubernetes-embedded-resource') ? undefined : json['x-kubernetes-embedded-resource'],
        'x_kubernetes_int_or_string': !exists(json, 'x-kubernetes-int-or-string') ? undefined : json['x-kubernetes-int-or-string'],
        'x_kubernetes_list_map_keys': !exists(json, 'x-kubernetes-list-map-keys') ? undefined : json['x-kubernetes-list-map-keys'],
        'x_kubernetes_list_type': !exists(json, 'x-kubernetes-list-type') ? undefined : json['x-kubernetes-list-type'],
        'x_kubernetes_map_type': !exists(json, 'x-kubernetes-map-type') ? undefined : json['x-kubernetes-map-type'],
        'x_kubernetes_preserve_unknown_fields': !exists(json, 'x-kubernetes-preserve-unknown-fields') ? undefined : json['x-kubernetes-preserve-unknown-fields'],
    };
}

export function V1JSONSchemaPropsToJSON(value?: V1JSONSchemaProps | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '$ref': value.$ref,
        '$schema': value.$schema,
        'additionalItems': value.additionalItems,
        'additionalProperties': value.additionalProperties,
        'allOf': value.allOf === undefined ? undefined : ((value.allOf as Array<any>).map(V1JSONSchemaPropsToJSON)),
        'anyOf': value.anyOf === undefined ? undefined : ((value.anyOf as Array<any>).map(V1JSONSchemaPropsToJSON)),
        'default': value._default,
        'definitions': value.definitions === undefined ? undefined : (mapValues(value.definitions, V1JSONSchemaPropsToJSON)),
        'dependencies': value.dependencies,
        'description': value.description,
        'enum': value._enum,
        'example': value.example,
        'exclusiveMaximum': value.exclusiveMaximum,
        'exclusiveMinimum': value.exclusiveMinimum,
        'externalDocs': V1ExternalDocumentationToJSON(value.externalDocs),
        'format': value.format,
        'id': value.id,
        'items': value.items,
        'maxItems': value.maxItems,
        'maxLength': value.maxLength,
        'maxProperties': value.maxProperties,
        'maximum': value.maximum,
        'minItems': value.minItems,
        'minLength': value.minLength,
        'minProperties': value.minProperties,
        'minimum': value.minimum,
        'multipleOf': value.multipleOf,
        'not': V1JSONSchemaPropsToJSON(value.not),
        'nullable': value.nullable,
        'oneOf': value.oneOf === undefined ? undefined : ((value.oneOf as Array<any>).map(V1JSONSchemaPropsToJSON)),
        'pattern': value.pattern,
        'patternProperties': value.patternProperties === undefined ? undefined : (mapValues(value.patternProperties, V1JSONSchemaPropsToJSON)),
        'properties': value.properties === undefined ? undefined : (mapValues(value.properties, V1JSONSchemaPropsToJSON)),
        'required': value.required,
        'title': value.title,
        'type': value.type,
        'uniqueItems': value.uniqueItems,
        'x-kubernetes-embedded-resource': value.x_kubernetes_embedded_resource,
        'x-kubernetes-int-or-string': value.x_kubernetes_int_or_string,
        'x-kubernetes-list-map-keys': value.x_kubernetes_list_map_keys,
        'x-kubernetes-list-type': value.x_kubernetes_list_type,
        'x-kubernetes-map-type': value.x_kubernetes_map_type,
        'x-kubernetes-preserve-unknown-fields': value.x_kubernetes_preserve_unknown_fields,
    };
}

