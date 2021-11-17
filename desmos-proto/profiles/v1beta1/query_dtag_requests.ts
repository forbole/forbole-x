/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination'
import { DTagTransferRequest } from '../../../desmos/profiles/v1beta1/models_dtag_requests'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * QueryIncomingDTagTransferRequestsRequest is the request type for the
 * Query/IncomingDTagTransferRequests RPC endpoint
 */
export interface QueryIncomingDTagTransferRequestsRequest {
  /**
   * Receiver represents the address of the user to which query the incoming
   * requests for
   */
  receiver: string
  /** Pagination defines an optional pagination for the request */
  pagination?: PageRequest
}

/**
 * QueryIncomingDTagTransferRequestsResponse is the response type for the
 * Query/IncomingDTagTransferRequests RPC method.
 */
export interface QueryIncomingDTagTransferRequestsResponse {
  /**
   * Requests represent the list of all the DTag transfer requests made towards
   * the user
   */
  requests: DTagTransferRequest[]
  /** Pagination defines the pagination response */
  pagination?: PageResponse
}

const baseQueryIncomingDTagTransferRequestsRequest: object = { receiver: '' }

export const QueryIncomingDTagTransferRequestsRequest = {
  encode(
    message: QueryIncomingDTagTransferRequestsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.receiver !== '') {
      writer.uint32(10).string(message.receiver)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryIncomingDTagTransferRequestsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryIncomingDTagTransferRequestsRequest,
    } as QueryIncomingDTagTransferRequestsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string()
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

  fromJSON(object: any): QueryIncomingDTagTransferRequestsRequest {
    const message = {
      ...baseQueryIncomingDTagTransferRequestsRequest,
    } as QueryIncomingDTagTransferRequestsRequest
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver)
    } else {
      message.receiver = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryIncomingDTagTransferRequestsRequest): unknown {
    const obj: any = {}
    message.receiver !== undefined && (obj.receiver = message.receiver)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryIncomingDTagTransferRequestsRequest>
  ): QueryIncomingDTagTransferRequestsRequest {
    const message = {
      ...baseQueryIncomingDTagTransferRequestsRequest,
    } as QueryIncomingDTagTransferRequestsRequest
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryIncomingDTagTransferRequestsResponse: object = {}

export const QueryIncomingDTagTransferRequestsResponse = {
  encode(
    message: QueryIncomingDTagTransferRequestsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.requests) {
      DTagTransferRequest.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryIncomingDTagTransferRequestsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryIncomingDTagTransferRequestsResponse,
    } as QueryIncomingDTagTransferRequestsResponse
    message.requests = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.requests.push(
            DTagTransferRequest.decode(reader, reader.uint32())
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

  fromJSON(object: any): QueryIncomingDTagTransferRequestsResponse {
    const message = {
      ...baseQueryIncomingDTagTransferRequestsResponse,
    } as QueryIncomingDTagTransferRequestsResponse
    message.requests = []
    if (object.requests !== undefined && object.requests !== null) {
      for (const e of object.requests) {
        message.requests.push(DTagTransferRequest.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryIncomingDTagTransferRequestsResponse): unknown {
    const obj: any = {}
    if (message.requests) {
      obj.requests = message.requests.map((e) =>
        e ? DTagTransferRequest.toJSON(e) : undefined
      )
    } else {
      obj.requests = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryIncomingDTagTransferRequestsResponse>
  ): QueryIncomingDTagTransferRequestsResponse {
    const message = {
      ...baseQueryIncomingDTagTransferRequestsResponse,
    } as QueryIncomingDTagTransferRequestsResponse
    message.requests = []
    if (object.requests !== undefined && object.requests !== null) {
      for (const e of object.requests) {
        message.requests.push(DTagTransferRequest.fromPartial(e))
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
