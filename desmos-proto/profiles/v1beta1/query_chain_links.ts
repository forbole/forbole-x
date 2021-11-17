/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { ChainLink } from '../../../desmos/profiles/v1beta1/models_chain_links'
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * QueryUserChainLinkRequest represents the request that should be used in order
 * to retrieve the link associated with the provided user, for the given chain
 * and having the given target address
 */
export interface QueryUserChainLinkRequest {
  /** User represents the Desmos address of the user to which search the link for */
  user: string
  /** ChainName contains the name of the chain to which search the link for */
  chainName: string
  /** Target must contain the external address to which query the link for */
  target: string
}

/**
 * QueryUserChainLinkResponse contains the data that is returned when querying a
 * specific chain link
 */
export interface QueryUserChainLinkResponse {
  link?: ChainLink
}

/**
 * QueryChainLinksRequest is the request type for the
 * Query/ChainLinks RPC endpoint
 */
export interface QueryChainLinksRequest {
  user: string
  /** Pagination defines an optional pagination for the request */
  pagination?: PageRequest
}

/**
 * QueryChainLinksResponse is the response type for the
 * Query/ChainLinks RPC method.
 */
export interface QueryChainLinksResponse {
  links: ChainLink[]
  /** Pagination defines the pagination response */
  pagination?: PageResponse
}

const baseQueryUserChainLinkRequest: object = {
  user: '',
  chainName: '',
  target: '',
}

export const QueryUserChainLinkRequest = {
  encode(
    message: QueryUserChainLinkRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.chainName !== '') {
      writer.uint32(18).string(message.chainName)
    }
    if (message.target !== '') {
      writer.uint32(26).string(message.target)
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUserChainLinkRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryUserChainLinkRequest,
    } as QueryUserChainLinkRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.chainName = reader.string()
          break
        case 3:
          message.target = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryUserChainLinkRequest {
    const message = {
      ...baseQueryUserChainLinkRequest,
    } as QueryUserChainLinkRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.chainName !== undefined && object.chainName !== null) {
      message.chainName = String(object.chainName)
    } else {
      message.chainName = ''
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target)
    } else {
      message.target = ''
    }
    return message
  },

  toJSON(message: QueryUserChainLinkRequest): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.chainName !== undefined && (obj.chainName = message.chainName)
    message.target !== undefined && (obj.target = message.target)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryUserChainLinkRequest>
  ): QueryUserChainLinkRequest {
    const message = {
      ...baseQueryUserChainLinkRequest,
    } as QueryUserChainLinkRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.chainName !== undefined && object.chainName !== null) {
      message.chainName = object.chainName
    } else {
      message.chainName = ''
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target
    } else {
      message.target = ''
    }
    return message
  },
}

const baseQueryUserChainLinkResponse: object = {}

export const QueryUserChainLinkResponse = {
  encode(
    message: QueryUserChainLinkResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.link !== undefined) {
      ChainLink.encode(message.link, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUserChainLinkResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryUserChainLinkResponse,
    } as QueryUserChainLinkResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.link = ChainLink.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryUserChainLinkResponse {
    const message = {
      ...baseQueryUserChainLinkResponse,
    } as QueryUserChainLinkResponse
    if (object.link !== undefined && object.link !== null) {
      message.link = ChainLink.fromJSON(object.link)
    } else {
      message.link = undefined
    }
    return message
  },

  toJSON(message: QueryUserChainLinkResponse): unknown {
    const obj: any = {}
    message.link !== undefined &&
      (obj.link = message.link ? ChainLink.toJSON(message.link) : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryUserChainLinkResponse>
  ): QueryUserChainLinkResponse {
    const message = {
      ...baseQueryUserChainLinkResponse,
    } as QueryUserChainLinkResponse
    if (object.link !== undefined && object.link !== null) {
      message.link = ChainLink.fromPartial(object.link)
    } else {
      message.link = undefined
    }
    return message
  },
}

const baseQueryChainLinksRequest: object = { user: '' }

export const QueryChainLinksRequest = {
  encode(
    message: QueryChainLinksRequest,
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

  decode(input: Reader | Uint8Array, length?: number): QueryChainLinksRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryChainLinksRequest } as QueryChainLinksRequest
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

  fromJSON(object: any): QueryChainLinksRequest {
    const message = { ...baseQueryChainLinksRequest } as QueryChainLinksRequest
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

  toJSON(message: QueryChainLinksRequest): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryChainLinksRequest>
  ): QueryChainLinksRequest {
    const message = { ...baseQueryChainLinksRequest } as QueryChainLinksRequest
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

const baseQueryChainLinksResponse: object = {}

export const QueryChainLinksResponse = {
  encode(
    message: QueryChainLinksResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.links) {
      ChainLink.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryChainLinksResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryChainLinksResponse,
    } as QueryChainLinksResponse
    message.links = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.links.push(ChainLink.decode(reader, reader.uint32()))
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

  fromJSON(object: any): QueryChainLinksResponse {
    const message = {
      ...baseQueryChainLinksResponse,
    } as QueryChainLinksResponse
    message.links = []
    if (object.links !== undefined && object.links !== null) {
      for (const e of object.links) {
        message.links.push(ChainLink.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryChainLinksResponse): unknown {
    const obj: any = {}
    if (message.links) {
      obj.links = message.links.map((e) =>
        e ? ChainLink.toJSON(e) : undefined
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
    object: DeepPartial<QueryChainLinksResponse>
  ): QueryChainLinksResponse {
    const message = {
      ...baseQueryChainLinksResponse,
    } as QueryChainLinksResponse
    message.links = []
    if (object.links !== undefined && object.links !== null) {
      for (const e of object.links) {
        message.links.push(ChainLink.fromPartial(e))
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
