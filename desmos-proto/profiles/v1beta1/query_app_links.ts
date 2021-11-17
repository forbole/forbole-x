/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { ApplicationLink } from '../../../desmos/profiles/v1beta1/models_app_links'
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * QueryUserApplicationLinkRequest represents the request used when querying an
 * application link using an application name and username for a given user
 */
export interface QueryUserApplicationLinkRequest {
  /**
   * User contains the Desmos profile address associated for which the link
   * should be searched for
   */
  user: string
  /** Application represents the application name associated with the link */
  application: string
  /**
   * Username represents the username inside the application associated with the
   * link
   */
  username: string
}

/**
 * QueryUserApplicationLinkResponse represents the response to the query
 * allowing to get an application link for a specific user, searching via the
 * application name and username
 */
export interface QueryUserApplicationLinkResponse {
  link?: ApplicationLink
}

/**
 * QueryApplicationLinksRequest represents the request used when querying
 * the application links of a specific user
 */
export interface QueryApplicationLinksRequest {
  user: string
  /** Pagination defines an optional pagination for the request */
  pagination?: PageRequest
}

/**
 * QueryApplicationLinksResponse represents the response to the query used
 * to get the application links for a specific user
 */
export interface QueryApplicationLinksResponse {
  links: ApplicationLink[]
  /** Pagination defines the pagination response */
  pagination?: PageResponse
}

/**
 * QueryApplicationLinkByClientIDRequest contains the data of the request that
 * can be used to get an application link based on a client id
 */
export interface QueryApplicationLinkByClientIDRequest {
  /** ClientID represents the ID of the client to which search the link for */
  clientId: string
}

/**
 * QueryApplicationLinkByClientIDResponse contains the data returned by the
 * request allowing to get an application link using a client id
 */
export interface QueryApplicationLinkByClientIDResponse {
  link?: ApplicationLink
}

const baseQueryUserApplicationLinkRequest: object = {
  user: '',
  application: '',
  username: '',
}

export const QueryUserApplicationLinkRequest = {
  encode(
    message: QueryUserApplicationLinkRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.application !== '') {
      writer.uint32(18).string(message.application)
    }
    if (message.username !== '') {
      writer.uint32(26).string(message.username)
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUserApplicationLinkRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryUserApplicationLinkRequest,
    } as QueryUserApplicationLinkRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.application = reader.string()
          break
        case 3:
          message.username = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryUserApplicationLinkRequest {
    const message = {
      ...baseQueryUserApplicationLinkRequest,
    } as QueryUserApplicationLinkRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.application !== undefined && object.application !== null) {
      message.application = String(object.application)
    } else {
      message.application = ''
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username)
    } else {
      message.username = ''
    }
    return message
  },

  toJSON(message: QueryUserApplicationLinkRequest): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.application !== undefined && (obj.application = message.application)
    message.username !== undefined && (obj.username = message.username)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryUserApplicationLinkRequest>
  ): QueryUserApplicationLinkRequest {
    const message = {
      ...baseQueryUserApplicationLinkRequest,
    } as QueryUserApplicationLinkRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.application !== undefined && object.application !== null) {
      message.application = object.application
    } else {
      message.application = ''
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username
    } else {
      message.username = ''
    }
    return message
  },
}

const baseQueryUserApplicationLinkResponse: object = {}

export const QueryUserApplicationLinkResponse = {
  encode(
    message: QueryUserApplicationLinkResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.link !== undefined) {
      ApplicationLink.encode(message.link, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUserApplicationLinkResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryUserApplicationLinkResponse,
    } as QueryUserApplicationLinkResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.link = ApplicationLink.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryUserApplicationLinkResponse {
    const message = {
      ...baseQueryUserApplicationLinkResponse,
    } as QueryUserApplicationLinkResponse
    if (object.link !== undefined && object.link !== null) {
      message.link = ApplicationLink.fromJSON(object.link)
    } else {
      message.link = undefined
    }
    return message
  },

  toJSON(message: QueryUserApplicationLinkResponse): unknown {
    const obj: any = {}
    message.link !== undefined &&
      (obj.link = message.link
        ? ApplicationLink.toJSON(message.link)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryUserApplicationLinkResponse>
  ): QueryUserApplicationLinkResponse {
    const message = {
      ...baseQueryUserApplicationLinkResponse,
    } as QueryUserApplicationLinkResponse
    if (object.link !== undefined && object.link !== null) {
      message.link = ApplicationLink.fromPartial(object.link)
    } else {
      message.link = undefined
    }
    return message
  },
}

const baseQueryApplicationLinksRequest: object = { user: '' }

export const QueryApplicationLinksRequest = {
  encode(
    message: QueryApplicationLinksRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryApplicationLinksRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryApplicationLinksRequest,
    } as QueryApplicationLinksRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryApplicationLinksRequest {
    const message = {
      ...baseQueryApplicationLinksRequest,
    } as QueryApplicationLinksRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryApplicationLinksRequest): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryApplicationLinksRequest>
  ): QueryApplicationLinksRequest {
    const message = {
      ...baseQueryApplicationLinksRequest,
    } as QueryApplicationLinksRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryApplicationLinksResponse: object = {}

export const QueryApplicationLinksResponse = {
  encode(
    message: QueryApplicationLinksResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.links) {
      ApplicationLink.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryApplicationLinksResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryApplicationLinksResponse,
    } as QueryApplicationLinksResponse
    message.links = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.links.push(ApplicationLink.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryApplicationLinksResponse {
    const message = {
      ...baseQueryApplicationLinksResponse,
    } as QueryApplicationLinksResponse
    message.links = []
    if (object.links !== undefined && object.links !== null) {
      for (const e of object.links) {
        message.links.push(ApplicationLink.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryApplicationLinksResponse): unknown {
    const obj: any = {}
    if (message.links) {
      obj.links = message.links.map((e) =>
        e ? ApplicationLink.toJSON(e) : undefined
      )
    } else {
      obj.links = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryApplicationLinksResponse>
  ): QueryApplicationLinksResponse {
    const message = {
      ...baseQueryApplicationLinksResponse,
    } as QueryApplicationLinksResponse
    message.links = []
    if (object.links !== undefined && object.links !== null) {
      for (const e of object.links) {
        message.links.push(ApplicationLink.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryApplicationLinkByClientIDRequest: object = { clientId: '' }

export const QueryApplicationLinkByClientIDRequest = {
  encode(
    message: QueryApplicationLinkByClientIDRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.clientId !== '') {
      writer.uint32(10).string(message.clientId)
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryApplicationLinkByClientIDRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryApplicationLinkByClientIDRequest,
    } as QueryApplicationLinkByClientIDRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryApplicationLinkByClientIDRequest {
    const message = {
      ...baseQueryApplicationLinkByClientIDRequest,
    } as QueryApplicationLinkByClientIDRequest
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId)
    } else {
      message.clientId = ''
    }
    return message
  },

  toJSON(message: QueryApplicationLinkByClientIDRequest): unknown {
    const obj: any = {}
    message.clientId !== undefined && (obj.clientId = message.clientId)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryApplicationLinkByClientIDRequest>
  ): QueryApplicationLinkByClientIDRequest {
    const message = {
      ...baseQueryApplicationLinkByClientIDRequest,
    } as QueryApplicationLinkByClientIDRequest
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId
    } else {
      message.clientId = ''
    }
    return message
  },
}

const baseQueryApplicationLinkByClientIDResponse: object = {}

export const QueryApplicationLinkByClientIDResponse = {
  encode(
    message: QueryApplicationLinkByClientIDResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.link !== undefined) {
      ApplicationLink.encode(message.link, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryApplicationLinkByClientIDResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryApplicationLinkByClientIDResponse,
    } as QueryApplicationLinkByClientIDResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.link = ApplicationLink.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryApplicationLinkByClientIDResponse {
    const message = {
      ...baseQueryApplicationLinkByClientIDResponse,
    } as QueryApplicationLinkByClientIDResponse
    if (object.link !== undefined && object.link !== null) {
      message.link = ApplicationLink.fromJSON(object.link)
    } else {
      message.link = undefined
    }
    return message
  },

  toJSON(message: QueryApplicationLinkByClientIDResponse): unknown {
    const obj: any = {}
    message.link !== undefined &&
      (obj.link = message.link
        ? ApplicationLink.toJSON(message.link)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryApplicationLinkByClientIDResponse>
  ): QueryApplicationLinkByClientIDResponse {
    const message = {
      ...baseQueryApplicationLinkByClientIDResponse,
    } as QueryApplicationLinkByClientIDResponse
    if (object.link !== undefined && object.link !== null) {
      message.link = ApplicationLink.fromPartial(object.link)
    } else {
      message.link = undefined
    }
    return message
  },
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
