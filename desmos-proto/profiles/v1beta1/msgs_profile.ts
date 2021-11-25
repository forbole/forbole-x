/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'desmos.profiles.v1beta1'

/** MsgSaveProfile represents a message to save a profile. */
export interface MsgSaveProfile {
  dtag: string
  nickname: string
  bio: string
  profilePicture: string
  coverPicture: string
  creator: string
}

/** MsgSaveProfileResponse defines the Msg/SaveProfile response type. */
export interface MsgSaveProfileResponse {}

/** MsgDeleteProfile represents the message used to delete an existing profile. */
export interface MsgDeleteProfile {
  creator: string
}

/** MsgDeleteProfileResponse defines the Msg/DeleteProfile response type. */
export interface MsgDeleteProfileResponse {}

const baseMsgSaveProfile: object = {
  dtag: '',
  nickname: '',
  bio: '',
  profilePicture: '',
  coverPicture: '',
  creator: '',
}

export const MsgSaveProfile = {
  encode(message: MsgSaveProfile, writer: Writer = Writer.create()): Writer {
    if (message.dtag !== '') {
      writer.uint32(10).string(message.dtag)
    }
    if (message.nickname !== '') {
      writer.uint32(18).string(message.nickname)
    }
    if (message.bio !== '') {
      writer.uint32(26).string(message.bio)
    }
    if (message.profilePicture !== '') {
      writer.uint32(34).string(message.profilePicture)
    }
    if (message.coverPicture !== '') {
      writer.uint32(42).string(message.coverPicture)
    }
    if (message.creator !== '') {
      writer.uint32(50).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSaveProfile {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSaveProfile } as MsgSaveProfile
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.dtag = reader.string()
          break
        case 2:
          message.nickname = reader.string()
          break
        case 3:
          message.bio = reader.string()
          break
        case 4:
          message.profilePicture = reader.string()
          break
        case 5:
          message.coverPicture = reader.string()
          break
        case 6:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSaveProfile {
    const message = { ...baseMsgSaveProfile } as MsgSaveProfile
    if (object.dtag !== undefined && object.dtag !== null) {
      message.dtag = String(object.dtag)
    } else {
      message.dtag = ''
    }
    if (object.nickname !== undefined && object.nickname !== null) {
      message.nickname = String(object.nickname)
    } else {
      message.nickname = ''
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = String(object.bio)
    } else {
      message.bio = ''
    }
    if (object.profilePicture !== undefined && object.profilePicture !== null) {
      message.profilePicture = String(object.profilePicture)
    } else {
      message.profilePicture = ''
    }
    if (object.coverPicture !== undefined && object.coverPicture !== null) {
      message.coverPicture = String(object.coverPicture)
    } else {
      message.coverPicture = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgSaveProfile): unknown {
    const obj: any = {}
    message.dtag !== undefined && (obj.dtag = message.dtag)
    message.nickname !== undefined && (obj.nickname = message.nickname)
    message.bio !== undefined && (obj.bio = message.bio)
    message.profilePicture !== undefined && (obj.profilePicture = message.profilePicture)
    message.coverPicture !== undefined && (obj.coverPicture = message.coverPicture)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSaveProfile>): MsgSaveProfile {
    const message = { ...baseMsgSaveProfile } as MsgSaveProfile
    if (object.dtag !== undefined && object.dtag !== null) {
      message.dtag = object.dtag
    } else {
      message.dtag = ''
    }
    if (object.nickname !== undefined && object.nickname !== null) {
      message.nickname = object.nickname
    } else {
      message.nickname = ''
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = object.bio
    } else {
      message.bio = ''
    }
    if (object.profilePicture !== undefined && object.profilePicture !== null) {
      message.profilePicture = object.profilePicture
    } else {
      message.profilePicture = ''
    }
    if (object.coverPicture !== undefined && object.coverPicture !== null) {
      message.coverPicture = object.coverPicture
    } else {
      message.coverPicture = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  },
}

const baseMsgSaveProfileResponse: object = {}

export const MsgSaveProfileResponse = {
  encode(_: MsgSaveProfileResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSaveProfileResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSaveProfileResponse } as MsgSaveProfileResponse
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

  fromJSON(_: any): MsgSaveProfileResponse {
    const message = { ...baseMsgSaveProfileResponse } as MsgSaveProfileResponse
    return message
  },

  toJSON(_: MsgSaveProfileResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgSaveProfileResponse>): MsgSaveProfileResponse {
    const message = { ...baseMsgSaveProfileResponse } as MsgSaveProfileResponse
    return message
  },
}

const baseMsgDeleteProfile: object = { creator: '' }

export const MsgDeleteProfile = {
  encode(message: MsgDeleteProfile, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteProfile {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteProfile } as MsgDeleteProfile
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgDeleteProfile {
    const message = { ...baseMsgDeleteProfile } as MsgDeleteProfile
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgDeleteProfile): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgDeleteProfile>): MsgDeleteProfile {
    const message = { ...baseMsgDeleteProfile } as MsgDeleteProfile
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  },
}

const baseMsgDeleteProfileResponse: object = {}

export const MsgDeleteProfileResponse = {
  encode(_: MsgDeleteProfileResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteProfileResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgDeleteProfileResponse,
    } as MsgDeleteProfileResponse
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

  fromJSON(_: any): MsgDeleteProfileResponse {
    const message = {
      ...baseMsgDeleteProfileResponse,
    } as MsgDeleteProfileResponse
    return message
  },

  toJSON(_: MsgDeleteProfileResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgDeleteProfileResponse>): MsgDeleteProfileResponse {
    const message = {
      ...baseMsgDeleteProfileResponse,
    } as MsgDeleteProfileResponse
    return message
  },
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
