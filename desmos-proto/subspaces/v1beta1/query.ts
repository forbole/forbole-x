/* eslint-disable */
import { util, configure, Reader, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { Subspace } from '../../../desmos/subspaces/v1beta1/subspace'
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination'

export const protobufPackage = 'desmos.subspaces.v1beta1'

/** QuerySubspace is the request type for the Query/Subspace RPC method */
export interface QuerySubspaceRequest {
  subspaceId: string
}

/** QuerySubspaceResponse is the response type for the Query/Subspace method */
export interface QuerySubspaceResponse {
  subspace?: Subspace
}

/** QuerySubspacesRequest is the request type for the Query/Subspaces RPC method */
export interface QuerySubspacesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QuerySubspacesResponse is the response type for the Query/Subspaces RPC
 * method
 */
export interface QuerySubspacesResponse {
  subspaces: Subspace[]
  pagination?: PageResponse
}

/**
 * QueryAdminsRequest is the request type for the Query/Admins RPC
 * method
 */
export interface QueryAdminsRequest {
  subspaceId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryAdminsResponse is the response type for the Query/Admins RPC
 * method
 */
export interface QueryAdminsResponse {
  admins: string[]
  pagination?: PageResponse
}

/**
 * QueryRegisteredUsersRequest is the request type for the
 * Query/RegisteredUsers RPC method
 */
export interface QueryRegisteredUsersRequest {
  subspaceId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryRegisteredUsersResponse is the response type for the
 * Query/RegisteredUsers RPC method
 */
export interface QueryRegisteredUsersResponse {
  users: string[]
  pagination?: PageResponse
}

/**
 * QueryBannedUsersRequest is the request type for the Query/BannedUsers
 * RPC method
 */
export interface QueryBannedUsersRequest {
  subspaceId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryBannedUsersResponse is the response type for the
 * Query/BannedUsers RPC method
 */
export interface QueryBannedUsersResponse {
  users: string[]
  pagination?: PageResponse
}

const baseQuerySubspaceRequest: object = { subspaceId: '' }

export const QuerySubspaceRequest = {
  encode(
    message: QuerySubspaceRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySubspaceRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySubspaceRequest } as QuerySubspaceRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySubspaceRequest {
    const message = { ...baseQuerySubspaceRequest } as QuerySubspaceRequest
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    return message
  },

  toJSON(message: QuerySubspaceRequest): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    return obj
  },

  fromPartial(object: DeepPartial<QuerySubspaceRequest>): QuerySubspaceRequest {
    const message = { ...baseQuerySubspaceRequest } as QuerySubspaceRequest
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    return message
  },
}

const baseQuerySubspaceResponse: object = {}

export const QuerySubspaceResponse = {
  encode(
    message: QuerySubspaceResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subspace !== undefined) {
      Subspace.encode(message.subspace, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySubspaceResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySubspaceResponse } as QuerySubspaceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspace = Subspace.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySubspaceResponse {
    const message = { ...baseQuerySubspaceResponse } as QuerySubspaceResponse
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = Subspace.fromJSON(object.subspace)
    } else {
      message.subspace = undefined
    }
    return message
  },

  toJSON(message: QuerySubspaceResponse): unknown {
    const obj: any = {}
    message.subspace !== undefined &&
      (obj.subspace = message.subspace
        ? Subspace.toJSON(message.subspace)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QuerySubspaceResponse>
  ): QuerySubspaceResponse {
    const message = { ...baseQuerySubspaceResponse } as QuerySubspaceResponse
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = Subspace.fromPartial(object.subspace)
    } else {
      message.subspace = undefined
    }
    return message
  },
}

const baseQuerySubspacesRequest: object = {}

export const QuerySubspacesRequest = {
  encode(
    message: QuerySubspacesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySubspacesRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySubspacesRequest } as QuerySubspacesRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySubspacesRequest {
    const message = { ...baseQuerySubspacesRequest } as QuerySubspacesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QuerySubspacesRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QuerySubspacesRequest>
  ): QuerySubspacesRequest {
    const message = { ...baseQuerySubspacesRequest } as QuerySubspacesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQuerySubspacesResponse: object = {}

export const QuerySubspacesResponse = {
  encode(
    message: QuerySubspacesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.subspaces) {
      Subspace.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySubspacesResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySubspacesResponse } as QuerySubspacesResponse
    message.subspaces = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaces.push(Subspace.decode(reader, reader.uint32()))
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

  fromJSON(object: any): QuerySubspacesResponse {
    const message = { ...baseQuerySubspacesResponse } as QuerySubspacesResponse
    message.subspaces = []
    if (object.subspaces !== undefined && object.subspaces !== null) {
      for (const e of object.subspaces) {
        message.subspaces.push(Subspace.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QuerySubspacesResponse): unknown {
    const obj: any = {}
    if (message.subspaces) {
      obj.subspaces = message.subspaces.map((e) =>
        e ? Subspace.toJSON(e) : undefined
      )
    } else {
      obj.subspaces = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QuerySubspacesResponse>
  ): QuerySubspacesResponse {
    const message = { ...baseQuerySubspacesResponse } as QuerySubspacesResponse
    message.subspaces = []
    if (object.subspaces !== undefined && object.subspaces !== null) {
      for (const e of object.subspaces) {
        message.subspaces.push(Subspace.fromPartial(e))
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

const baseQueryAdminsRequest: object = { subspaceId: '' }

export const QueryAdminsRequest = {
  encode(
    message: QueryAdminsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAdminsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAdminsRequest } as QueryAdminsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
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

  fromJSON(object: any): QueryAdminsRequest {
    const message = { ...baseQueryAdminsRequest } as QueryAdminsRequest
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

  toJSON(message: QueryAdminsRequest): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAdminsRequest>): QueryAdminsRequest {
    const message = { ...baseQueryAdminsRequest } as QueryAdminsRequest
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

const baseQueryAdminsResponse: object = { admins: '' }

export const QueryAdminsResponse = {
  encode(
    message: QueryAdminsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.admins) {
      writer.uint32(10).string(v!)
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAdminsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAdminsResponse } as QueryAdminsResponse
    message.admins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.admins.push(reader.string())
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

  fromJSON(object: any): QueryAdminsResponse {
    const message = { ...baseQueryAdminsResponse } as QueryAdminsResponse
    message.admins = []
    if (object.admins !== undefined && object.admins !== null) {
      for (const e of object.admins) {
        message.admins.push(String(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAdminsResponse): unknown {
    const obj: any = {}
    if (message.admins) {
      obj.admins = message.admins.map((e) => e)
    } else {
      obj.admins = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAdminsResponse>): QueryAdminsResponse {
    const message = { ...baseQueryAdminsResponse } as QueryAdminsResponse
    message.admins = []
    if (object.admins !== undefined && object.admins !== null) {
      for (const e of object.admins) {
        message.admins.push(e)
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

const baseQueryRegisteredUsersRequest: object = { subspaceId: '' }

export const QueryRegisteredUsersRequest = {
  encode(
    message: QueryRegisteredUsersRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryRegisteredUsersRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryRegisteredUsersRequest,
    } as QueryRegisteredUsersRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
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

  fromJSON(object: any): QueryRegisteredUsersRequest {
    const message = {
      ...baseQueryRegisteredUsersRequest,
    } as QueryRegisteredUsersRequest
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

  toJSON(message: QueryRegisteredUsersRequest): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryRegisteredUsersRequest>
  ): QueryRegisteredUsersRequest {
    const message = {
      ...baseQueryRegisteredUsersRequest,
    } as QueryRegisteredUsersRequest
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

const baseQueryRegisteredUsersResponse: object = { users: '' }

export const QueryRegisteredUsersResponse = {
  encode(
    message: QueryRegisteredUsersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.users) {
      writer.uint32(10).string(v!)
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryRegisteredUsersResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryRegisteredUsersResponse,
    } as QueryRegisteredUsersResponse
    message.users = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.users.push(reader.string())
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

  fromJSON(object: any): QueryRegisteredUsersResponse {
    const message = {
      ...baseQueryRegisteredUsersResponse,
    } as QueryRegisteredUsersResponse
    message.users = []
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(String(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryRegisteredUsersResponse): unknown {
    const obj: any = {}
    if (message.users) {
      obj.users = message.users.map((e) => e)
    } else {
      obj.users = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryRegisteredUsersResponse>
  ): QueryRegisteredUsersResponse {
    const message = {
      ...baseQueryRegisteredUsersResponse,
    } as QueryRegisteredUsersResponse
    message.users = []
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(e)
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

const baseQueryBannedUsersRequest: object = { subspaceId: '' }

export const QueryBannedUsersRequest = {
  encode(
    message: QueryBannedUsersRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryBannedUsersRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryBannedUsersRequest,
    } as QueryBannedUsersRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
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

  fromJSON(object: any): QueryBannedUsersRequest {
    const message = {
      ...baseQueryBannedUsersRequest,
    } as QueryBannedUsersRequest
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

  toJSON(message: QueryBannedUsersRequest): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryBannedUsersRequest>
  ): QueryBannedUsersRequest {
    const message = {
      ...baseQueryBannedUsersRequest,
    } as QueryBannedUsersRequest
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

const baseQueryBannedUsersResponse: object = { users: '' }

export const QueryBannedUsersResponse = {
  encode(
    message: QueryBannedUsersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.users) {
      writer.uint32(10).string(v!)
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryBannedUsersResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryBannedUsersResponse,
    } as QueryBannedUsersResponse
    message.users = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.users.push(reader.string())
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

  fromJSON(object: any): QueryBannedUsersResponse {
    const message = {
      ...baseQueryBannedUsersResponse,
    } as QueryBannedUsersResponse
    message.users = []
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(String(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryBannedUsersResponse): unknown {
    const obj: any = {}
    if (message.users) {
      obj.users = message.users.map((e) => e)
    } else {
      obj.users = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryBannedUsersResponse>
  ): QueryBannedUsersResponse {
    const message = {
      ...baseQueryBannedUsersResponse,
    } as QueryBannedUsersResponse
    message.users = []
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(e)
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

/** Query defines the gRPC querier service */
export interface Query {
  /** Subspace queries all the information about the subspace with the given id */
  Subspace(request: QuerySubspaceRequest): Promise<QuerySubspaceResponse>
  /** Admins queries all the admins of the subspace having the given id */
  Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse>
  /**
   * RegisteredUsers queries all the registered users of the subspace having the
   * given id
   */
  RegisteredUsers(
    request: QueryRegisteredUsersRequest
  ): Promise<QueryRegisteredUsersResponse>
  /**
   * BannedUsers queries all the banned users of the subspace having the given
   * id
   */
  BannedUsers(
    request: QueryBannedUsersRequest
  ): Promise<QueryBannedUsersResponse>
  /** Subspaces queries all the subspaces inside Desmos */
  Subspaces(request: QuerySubspacesRequest): Promise<QuerySubspacesResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.Subspace = this.Subspace.bind(this)
    this.Admins = this.Admins.bind(this)
    this.RegisteredUsers = this.RegisteredUsers.bind(this)
    this.BannedUsers = this.BannedUsers.bind(this)
    this.Subspaces = this.Subspaces.bind(this)
  }
  Subspace(request: QuerySubspaceRequest): Promise<QuerySubspaceResponse> {
    const data = QuerySubspaceRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Query',
      'Subspace',
      data
    )
    return promise.then((data) =>
      QuerySubspaceResponse.decode(new Reader(data))
    )
  }

  Admins(request: QueryAdminsRequest): Promise<QueryAdminsResponse> {
    const data = QueryAdminsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Query',
      'Admins',
      data
    )
    return promise.then((data) => QueryAdminsResponse.decode(new Reader(data)))
  }

  RegisteredUsers(
    request: QueryRegisteredUsersRequest
  ): Promise<QueryRegisteredUsersResponse> {
    const data = QueryRegisteredUsersRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Query',
      'RegisteredUsers',
      data
    )
    return promise.then((data) =>
      QueryRegisteredUsersResponse.decode(new Reader(data))
    )
  }

  BannedUsers(
    request: QueryBannedUsersRequest
  ): Promise<QueryBannedUsersResponse> {
    const data = QueryBannedUsersRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Query',
      'BannedUsers',
      data
    )
    return promise.then((data) =>
      QueryBannedUsersResponse.decode(new Reader(data))
    )
  }

  Subspaces(request: QuerySubspacesRequest): Promise<QuerySubspacesResponse> {
    const data = QuerySubspacesRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Query',
      'Subspaces',
      data
    )
    return promise.then((data) =>
      QuerySubspacesResponse.decode(new Reader(data))
    )
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>
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
