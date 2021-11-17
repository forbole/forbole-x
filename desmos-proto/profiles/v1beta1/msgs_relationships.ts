/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * MsgCreateRelationship represents a message to create a relationship
 * between two users on a specific subspace.
 */
export interface MsgCreateRelationship {
  sender: string
  receiver: string
  subspace: string
}

/**
 * MsgCreateRelationshipResponse defines the Msg/CreateRelationship response
 * type.
 */
export interface MsgCreateRelationshipResponse {}

/**
 * MsgDeleteRelationship represents a message to delete the relationship
 * between two users.
 */
export interface MsgDeleteRelationship {
  user: string
  counterparty: string
  subspace: string
}

/**
 * MsgDeleteRelationshipResponse defines the Msg/DeleteRelationship response
 * type.
 */
export interface MsgDeleteRelationshipResponse {}

/**
 * MsgBlockUser represents a message to block another user specifying an
 * optional reason.
 */
export interface MsgBlockUser {
  blocker: string
  blocked: string
  reason: string
  subspace: string
}

/** MsgBlockUserResponse defines the Msg/BlockUser response type. */
export interface MsgBlockUserResponse {}

/** MsgUnblockUser represents a message to unblock a previously blocked user. */
export interface MsgUnblockUser {
  blocker: string
  blocked: string
  subspace: string
}

/** MsgUnblockUserResponse defines the Msg/UnblockUser response type. */
export interface MsgUnblockUserResponse {}

const baseMsgCreateRelationship: object = {
  sender: '',
  receiver: '',
  subspace: '',
}

export const MsgCreateRelationship = {
  encode(
    message: MsgCreateRelationship,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender)
    }
    if (message.receiver !== '') {
      writer.uint32(18).string(message.receiver)
    }
    if (message.subspace !== '') {
      writer.uint32(26).string(message.subspace)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRelationship {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateRelationship } as MsgCreateRelationship
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string()
          break
        case 2:
          message.receiver = reader.string()
          break
        case 3:
          message.subspace = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateRelationship {
    const message = { ...baseMsgCreateRelationship } as MsgCreateRelationship
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver)
    } else {
      message.receiver = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    return message
  },

  toJSON(message: MsgCreateRelationship): unknown {
    const obj: any = {}
    message.sender !== undefined && (obj.sender = message.sender)
    message.receiver !== undefined && (obj.receiver = message.receiver)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    return obj
  },

  fromPartial(
    object: DeepPartial<MsgCreateRelationship>
  ): MsgCreateRelationship {
    const message = { ...baseMsgCreateRelationship } as MsgCreateRelationship
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    return message
  },
}

const baseMsgCreateRelationshipResponse: object = {}

export const MsgCreateRelationshipResponse = {
  encode(
    _: MsgCreateRelationshipResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateRelationshipResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgCreateRelationshipResponse,
    } as MsgCreateRelationshipResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgCreateRelationshipResponse {
    const message = {
      ...baseMsgCreateRelationshipResponse,
    } as MsgCreateRelationshipResponse
    return message
  },

  toJSON(_: MsgCreateRelationshipResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgCreateRelationshipResponse>
  ): MsgCreateRelationshipResponse {
    const message = {
      ...baseMsgCreateRelationshipResponse,
    } as MsgCreateRelationshipResponse
    return message
  },
}

const baseMsgDeleteRelationship: object = {
  user: '',
  counterparty: '',
  subspace: '',
}

export const MsgDeleteRelationship = {
  encode(
    message: MsgDeleteRelationship,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.counterparty !== '') {
      writer.uint32(18).string(message.counterparty)
    }
    if (message.subspace !== '') {
      writer.uint32(26).string(message.subspace)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteRelationship {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteRelationship } as MsgDeleteRelationship
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.counterparty = reader.string()
          break
        case 3:
          message.subspace = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgDeleteRelationship {
    const message = { ...baseMsgDeleteRelationship } as MsgDeleteRelationship
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.counterparty !== undefined && object.counterparty !== null) {
      message.counterparty = String(object.counterparty)
    } else {
      message.counterparty = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    return message
  },

  toJSON(message: MsgDeleteRelationship): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.counterparty !== undefined &&
      (obj.counterparty = message.counterparty)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    return obj
  },

  fromPartial(
    object: DeepPartial<MsgDeleteRelationship>
  ): MsgDeleteRelationship {
    const message = { ...baseMsgDeleteRelationship } as MsgDeleteRelationship
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.counterparty !== undefined && object.counterparty !== null) {
      message.counterparty = object.counterparty
    } else {
      message.counterparty = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    return message
  },
}

const baseMsgDeleteRelationshipResponse: object = {}

export const MsgDeleteRelationshipResponse = {
  encode(
    _: MsgDeleteRelationshipResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteRelationshipResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgDeleteRelationshipResponse,
    } as MsgDeleteRelationshipResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgDeleteRelationshipResponse {
    const message = {
      ...baseMsgDeleteRelationshipResponse,
    } as MsgDeleteRelationshipResponse
    return message
  },

  toJSON(_: MsgDeleteRelationshipResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgDeleteRelationshipResponse>
  ): MsgDeleteRelationshipResponse {
    const message = {
      ...baseMsgDeleteRelationshipResponse,
    } as MsgDeleteRelationshipResponse
    return message
  },
}

const baseMsgBlockUser: object = {
  blocker: '',
  blocked: '',
  reason: '',
  subspace: '',
}

export const MsgBlockUser = {
  encode(message: MsgBlockUser, writer: Writer = Writer.create()): Writer {
    if (message.blocker !== '') {
      writer.uint32(10).string(message.blocker)
    }
    if (message.blocked !== '') {
      writer.uint32(18).string(message.blocked)
    }
    if (message.reason !== '') {
      writer.uint32(26).string(message.reason)
    }
    if (message.subspace !== '') {
      writer.uint32(34).string(message.subspace)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBlockUser {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBlockUser } as MsgBlockUser
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.blocker = reader.string()
          break
        case 2:
          message.blocked = reader.string()
          break
        case 3:
          message.reason = reader.string()
          break
        case 4:
          message.subspace = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBlockUser {
    const message = { ...baseMsgBlockUser } as MsgBlockUser
    if (object.blocker !== undefined && object.blocker !== null) {
      message.blocker = String(object.blocker)
    } else {
      message.blocker = ''
    }
    if (object.blocked !== undefined && object.blocked !== null) {
      message.blocked = String(object.blocked)
    } else {
      message.blocked = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = String(object.reason)
    } else {
      message.reason = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    return message
  },

  toJSON(message: MsgBlockUser): unknown {
    const obj: any = {}
    message.blocker !== undefined && (obj.blocker = message.blocker)
    message.blocked !== undefined && (obj.blocked = message.blocked)
    message.reason !== undefined && (obj.reason = message.reason)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    return obj
  },

  fromPartial(object: DeepPartial<MsgBlockUser>): MsgBlockUser {
    const message = { ...baseMsgBlockUser } as MsgBlockUser
    if (object.blocker !== undefined && object.blocker !== null) {
      message.blocker = object.blocker
    } else {
      message.blocker = ''
    }
    if (object.blocked !== undefined && object.blocked !== null) {
      message.blocked = object.blocked
    } else {
      message.blocked = ''
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason
    } else {
      message.reason = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    return message
  },
}

const baseMsgBlockUserResponse: object = {}

export const MsgBlockUserResponse = {
  encode(_: MsgBlockUserResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBlockUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBlockUserResponse } as MsgBlockUserResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgBlockUserResponse {
    const message = { ...baseMsgBlockUserResponse } as MsgBlockUserResponse
    return message
  },

  toJSON(_: MsgBlockUserResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgBlockUserResponse>): MsgBlockUserResponse {
    const message = { ...baseMsgBlockUserResponse } as MsgBlockUserResponse
    return message
  },
}

const baseMsgUnblockUser: object = { blocker: '', blocked: '', subspace: '' }

export const MsgUnblockUser = {
  encode(message: MsgUnblockUser, writer: Writer = Writer.create()): Writer {
    if (message.blocker !== '') {
      writer.uint32(10).string(message.blocker)
    }
    if (message.blocked !== '') {
      writer.uint32(18).string(message.blocked)
    }
    if (message.subspace !== '') {
      writer.uint32(34).string(message.subspace)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnblockUser {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnblockUser } as MsgUnblockUser
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.blocker = reader.string()
          break
        case 2:
          message.blocked = reader.string()
          break
        case 4:
          message.subspace = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUnblockUser {
    const message = { ...baseMsgUnblockUser } as MsgUnblockUser
    if (object.blocker !== undefined && object.blocker !== null) {
      message.blocker = String(object.blocker)
    } else {
      message.blocker = ''
    }
    if (object.blocked !== undefined && object.blocked !== null) {
      message.blocked = String(object.blocked)
    } else {
      message.blocked = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    return message
  },

  toJSON(message: MsgUnblockUser): unknown {
    const obj: any = {}
    message.blocker !== undefined && (obj.blocker = message.blocker)
    message.blocked !== undefined && (obj.blocked = message.blocked)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUnblockUser>): MsgUnblockUser {
    const message = { ...baseMsgUnblockUser } as MsgUnblockUser
    if (object.blocker !== undefined && object.blocker !== null) {
      message.blocker = object.blocker
    } else {
      message.blocker = ''
    }
    if (object.blocked !== undefined && object.blocked !== null) {
      message.blocked = object.blocked
    } else {
      message.blocked = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    return message
  },
}

const baseMsgUnblockUserResponse: object = {}

export const MsgUnblockUserResponse = {
  encode(_: MsgUnblockUserResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnblockUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnblockUserResponse } as MsgUnblockUserResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgUnblockUserResponse {
    const message = { ...baseMsgUnblockUserResponse } as MsgUnblockUserResponse
    return message
  },

  toJSON(_: MsgUnblockUserResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgUnblockUserResponse>): MsgUnblockUserResponse {
    const message = { ...baseMsgUnblockUserResponse } as MsgUnblockUserResponse
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
