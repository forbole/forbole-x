/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'desmos.posts.v1beta1'

/**
 * RegisteredReaction represents a registered reaction that can be referenced
 * by its shortCode inside post reactions
 */
export interface RegisteredReaction {
  shortCode: string
  value: string
  subspace: string
  creator: string
}

/** PostReaction is a struct of a user reaction to a post */
export interface PostReaction {
  postId: string
  shortCode: string
  value: string
  owner: string
}

const baseRegisteredReaction: object = {
  shortCode: '',
  value: '',
  subspace: '',
  creator: '',
}

export const RegisteredReaction = {
  encode(
    message: RegisteredReaction,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.shortCode !== '') {
      writer.uint32(10).string(message.shortCode)
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value)
    }
    if (message.subspace !== '') {
      writer.uint32(26).string(message.subspace)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): RegisteredReaction {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseRegisteredReaction } as RegisteredReaction
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.shortCode = reader.string()
          break
        case 2:
          message.value = reader.string()
          break
        case 3:
          message.subspace = reader.string()
          break
        case 4:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RegisteredReaction {
    const message = { ...baseRegisteredReaction } as RegisteredReaction
    if (object.shortCode !== undefined && object.shortCode !== null) {
      message.shortCode = String(object.shortCode)
    } else {
      message.shortCode = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value)
    } else {
      message.value = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: RegisteredReaction): unknown {
    const obj: any = {}
    message.shortCode !== undefined && (obj.shortCode = message.shortCode)
    message.value !== undefined && (obj.value = message.value)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<RegisteredReaction>): RegisteredReaction {
    const message = { ...baseRegisteredReaction } as RegisteredReaction
    if (object.shortCode !== undefined && object.shortCode !== null) {
      message.shortCode = object.shortCode
    } else {
      message.shortCode = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  },
}

const basePostReaction: object = {
  postId: '',
  shortCode: '',
  value: '',
  owner: '',
}

export const PostReaction = {
  encode(message: PostReaction, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.shortCode !== '') {
      writer.uint32(18).string(message.shortCode)
    }
    if (message.value !== '') {
      writer.uint32(26).string(message.value)
    }
    if (message.owner !== '') {
      writer.uint32(34).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): PostReaction {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePostReaction } as PostReaction
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.shortCode = reader.string()
          break
        case 3:
          message.value = reader.string()
          break
        case 4:
          message.owner = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PostReaction {
    const message = { ...basePostReaction } as PostReaction
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.shortCode !== undefined && object.shortCode !== null) {
      message.shortCode = String(object.shortCode)
    } else {
      message.shortCode = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value)
    } else {
      message.value = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: PostReaction): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.shortCode !== undefined && (obj.shortCode = message.shortCode)
    message.value !== undefined && (obj.value = message.value)
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<PostReaction>): PostReaction {
    const message = { ...basePostReaction } as PostReaction
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.shortCode !== undefined && object.shortCode !== null) {
      message.shortCode = object.shortCode
    } else {
      message.shortCode = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
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
