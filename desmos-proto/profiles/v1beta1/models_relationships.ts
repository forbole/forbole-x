/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * Relationship is the struct of a relationship.
 * It represent the concept of "follow" of traditional social networks.
 */
export interface Relationship {
  creator: string
  recipient: string
  subspace: string
}

/**
 * UserBlock represents the fact that the Blocker has blocked the given Blocked
 * user.
 */
export interface UserBlock {
  /** Blocker represents the address of the user blocking another one */
  blocker: string
  /** Blocked represents the address of the blocked user */
  blocked: string
  /** Reason represents the optional reason the user has been blocked for. */
  reason: string
  /**
   * Subspace contains the ID of the subspace inside which the user should be
   * blocked
   */
  subspace: string
}

const baseRelationship: object = { creator: '', recipient: '', subspace: '' }

export const Relationship = {
  encode(message: Relationship, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.recipient !== '') {
      writer.uint32(18).string(message.recipient)
    }
    if (message.subspace !== '') {
      writer.uint32(26).string(message.subspace)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Relationship {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseRelationship } as Relationship
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.recipient = reader.string()
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

  fromJSON(object: any): Relationship {
    const message = { ...baseRelationship } as Relationship
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient)
    } else {
      message.recipient = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    return message
  },

  toJSON(message: Relationship): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.recipient !== undefined && (obj.recipient = message.recipient)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    return obj
  },

  fromPartial(object: DeepPartial<Relationship>): Relationship {
    const message = { ...baseRelationship } as Relationship
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient
    } else {
      message.recipient = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    return message
  },
}

const baseUserBlock: object = {
  blocker: '',
  blocked: '',
  reason: '',
  subspace: '',
}

export const UserBlock = {
  encode(message: UserBlock, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): UserBlock {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUserBlock } as UserBlock
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

  fromJSON(object: any): UserBlock {
    const message = { ...baseUserBlock } as UserBlock
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

  toJSON(message: UserBlock): unknown {
    const obj: any = {}
    message.blocker !== undefined && (obj.blocker = message.blocker)
    message.blocked !== undefined && (obj.blocked = message.blocked)
    message.reason !== undefined && (obj.reason = message.reason)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    return obj
  },

  fromPartial(object: DeepPartial<UserBlock>): UserBlock {
    const message = { ...baseUserBlock } as UserBlock
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
