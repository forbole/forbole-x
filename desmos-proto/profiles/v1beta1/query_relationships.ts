/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination'
import {
  Relationship,
  UserBlock,
} from '../../../desmos/profiles/v1beta1/models_relationships'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * QueryRelationshipsRequest is the request type for the
 * Query/Relationships RPC method.
 */
export interface QueryRelationshipsRequest {
  /** address of the user to query the relationships for */
  user: string
  /** subspace to query the relationships for */
  subspaceId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryRelationshipsResponse is the response type for the
 * Query/Relationships RPC method.
 */
export interface QueryRelationshipsResponse {
  relationships: Relationship[]
  /** pagination defines an optional pagination for the request. */
  pagination?: PageResponse
}

/**
 * QueryBlocksRequest is the request type for the Query/Blocks RPC
 * endpoint
 */
export interface QueryBlocksRequest {
  /** address of the user to query the blocks for */
  user: string
  subspaceId: string
  pagination?: PageRequest
}

/**
 * QueryBlocksResponse is the response type for the Query/Blocks RPC
 * method.
 */
export interface QueryBlocksResponse {
  blocks: UserBlock[]
  pagination?: PageResponse
}

const baseQueryRelationshipsRequest: object = { user: '', subspaceId: '' }

export const QueryRelationshipsRequest = {
  encode(
    message: QueryRelationshipsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.subspaceId !== '') {
      writer.uint32(18).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryRelationshipsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryRelationshipsRequest,
    } as QueryRelationshipsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.subspaceId = reader.string()
          break
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryRelationshipsRequest {
    const message = {
      ...baseQueryRelationshipsRequest,
    } as QueryRelationshipsRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryRelationshipsRequest): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryRelationshipsRequest>
  ): QueryRelationshipsRequest {
    const message = {
      ...baseQueryRelationshipsRequest,
    } as QueryRelationshipsRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryRelationshipsResponse: object = {}

export const QueryRelationshipsResponse = {
  encode(
    message: QueryRelationshipsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.relationships) {
      Relationship.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryRelationshipsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryRelationshipsResponse,
    } as QueryRelationshipsResponse
    message.relationships = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.relationships.push(
            Relationship.decode(reader, reader.uint32())
          )
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

  fromJSON(object: any): QueryRelationshipsResponse {
    const message = {
      ...baseQueryRelationshipsResponse,
    } as QueryRelationshipsResponse
    message.relationships = []
    if (object.relationships !== undefined && object.relationships !== null) {
      for (const e of object.relationships) {
        message.relationships.push(Relationship.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryRelationshipsResponse): unknown {
    const obj: any = {}
    if (message.relationships) {
      obj.relationships = message.relationships.map((e) =>
        e ? Relationship.toJSON(e) : undefined
      )
    } else {
      obj.relationships = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryRelationshipsResponse>
  ): QueryRelationshipsResponse {
    const message = {
      ...baseQueryRelationshipsResponse,
    } as QueryRelationshipsResponse
    message.relationships = []
    if (object.relationships !== undefined && object.relationships !== null) {
      for (const e of object.relationships) {
        message.relationships.push(Relationship.fromPartial(e))
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

const baseQueryBlocksRequest: object = { user: '', subspaceId: '' }

export const QueryBlocksRequest = {
  encode(
    message: QueryBlocksRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.subspaceId !== '') {
      writer.uint32(18).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryBlocksRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryBlocksRequest } as QueryBlocksRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.subspaceId = reader.string()
          break
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryBlocksRequest {
    const message = { ...baseQueryBlocksRequest } as QueryBlocksRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryBlocksRequest): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryBlocksRequest>): QueryBlocksRequest {
    const message = { ...baseQueryBlocksRequest } as QueryBlocksRequest
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryBlocksResponse: object = {}

export const QueryBlocksResponse = {
  encode(
    message: QueryBlocksResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.blocks) {
      UserBlock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryBlocksResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryBlocksResponse } as QueryBlocksResponse
    message.blocks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.blocks.push(UserBlock.decode(reader, reader.uint32()))
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

  fromJSON(object: any): QueryBlocksResponse {
    const message = { ...baseQueryBlocksResponse } as QueryBlocksResponse
    message.blocks = []
    if (object.blocks !== undefined && object.blocks !== null) {
      for (const e of object.blocks) {
        message.blocks.push(UserBlock.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryBlocksResponse): unknown {
    const obj: any = {}
    if (message.blocks) {
      obj.blocks = message.blocks.map((e) =>
        e ? UserBlock.toJSON(e) : undefined
      )
    } else {
      obj.blocks = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryBlocksResponse>): QueryBlocksResponse {
    const message = { ...baseQueryBlocksResponse } as QueryBlocksResponse
    message.blocks = []
    if (object.blocks !== undefined && object.blocks !== null) {
      for (const e of object.blocks) {
        message.blocks.push(UserBlock.fromPartial(e))
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
