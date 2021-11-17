/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Data } from '../../../desmos/profiles/v1beta1/models_app_links'
import { Height } from '../../../ibc/core/client/v1/client'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * MsgLinkApplication defines a msg to connect a profile with a
 * centralized application account (eg. Twitter, GitHub, etc).
 */
export interface MsgLinkApplication {
  /** The sender of the connection request */
  sender: string
  /** LinkData contains the data related to the application to which connect */
  linkData?: Data
  /**
   * Hex encoded call data that will be sent to the data source in order to
   * verify the link
   */
  callData: string
  /** The port on which the packet will be sent */
  sourcePort: string
  /** The channel by which the packet will be sent */
  sourceChannel: string
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeoutHeight?: Height
  /**
   * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
   * The timeout is disabled when set to 0.
   */
  timeoutTimestamp: number
}

/**
 * MsgLinkApplicationResponse defines the Msg/LinkApplication
 * response type.
 */
export interface MsgLinkApplicationResponse {}

/**
 * MsgUnlinkApplication defines a msg to delete an application link from a user
 * profile
 */
export interface MsgUnlinkApplication {
  /** Application represents the name of the application to unlink */
  application: string
  /** Username represents the username inside the application to unlink */
  username: string
  /**
   * Signer represents the Desmos account to which the application should be
   * unlinked
   */
  signer: string
}

/**
 * MsgUnlinkApplicationResponse defines the Msg/UnlinkApplication response
 * type.
 */
export interface MsgUnlinkApplicationResponse {}

const baseMsgLinkApplication: object = {
  sender: '',
  callData: '',
  sourcePort: '',
  sourceChannel: '',
  timeoutTimestamp: 0,
}

export const MsgLinkApplication = {
  encode(
    message: MsgLinkApplication,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender)
    }
    if (message.linkData !== undefined) {
      Data.encode(message.linkData, writer.uint32(18).fork()).ldelim()
    }
    if (message.callData !== '') {
      writer.uint32(26).string(message.callData)
    }
    if (message.sourcePort !== '') {
      writer.uint32(34).string(message.sourcePort)
    }
    if (message.sourceChannel !== '') {
      writer.uint32(42).string(message.sourceChannel)
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(50).fork()).ldelim()
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(56).uint64(message.timeoutTimestamp)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLinkApplication {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgLinkApplication } as MsgLinkApplication
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string()
          break
        case 2:
          message.linkData = Data.decode(reader, reader.uint32())
          break
        case 3:
          message.callData = reader.string()
          break
        case 4:
          message.sourcePort = reader.string()
          break
        case 5:
          message.sourceChannel = reader.string()
          break
        case 6:
          message.timeoutHeight = Height.decode(reader, reader.uint32())
          break
        case 7:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgLinkApplication {
    const message = { ...baseMsgLinkApplication } as MsgLinkApplication
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.linkData !== undefined && object.linkData !== null) {
      message.linkData = Data.fromJSON(object.linkData)
    } else {
      message.linkData = undefined
    }
    if (object.callData !== undefined && object.callData !== null) {
      message.callData = String(object.callData)
    } else {
      message.callData = ''
    }
    if (object.sourcePort !== undefined && object.sourcePort !== null) {
      message.sourcePort = String(object.sourcePort)
    } else {
      message.sourcePort = ''
    }
    if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
      message.sourceChannel = String(object.sourceChannel)
    } else {
      message.sourceChannel = ''
    }
    if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
      message.timeoutHeight = Height.fromJSON(object.timeoutHeight)
    } else {
      message.timeoutHeight = undefined
    }
    if (
      object.timeoutTimestamp !== undefined &&
      object.timeoutTimestamp !== null
    ) {
      message.timeoutTimestamp = Number(object.timeoutTimestamp)
    } else {
      message.timeoutTimestamp = 0
    }
    return message
  },

  toJSON(message: MsgLinkApplication): unknown {
    const obj: any = {}
    message.sender !== undefined && (obj.sender = message.sender)
    message.linkData !== undefined &&
      (obj.linkData = message.linkData
        ? Data.toJSON(message.linkData)
        : undefined)
    message.callData !== undefined && (obj.callData = message.callData)
    message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort)
    message.sourceChannel !== undefined &&
      (obj.sourceChannel = message.sourceChannel)
    message.timeoutHeight !== undefined &&
      (obj.timeoutHeight = message.timeoutHeight
        ? Height.toJSON(message.timeoutHeight)
        : undefined)
    message.timeoutTimestamp !== undefined &&
      (obj.timeoutTimestamp = message.timeoutTimestamp)
    return obj
  },

  fromPartial(object: DeepPartial<MsgLinkApplication>): MsgLinkApplication {
    const message = { ...baseMsgLinkApplication } as MsgLinkApplication
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.linkData !== undefined && object.linkData !== null) {
      message.linkData = Data.fromPartial(object.linkData)
    } else {
      message.linkData = undefined
    }
    if (object.callData !== undefined && object.callData !== null) {
      message.callData = object.callData
    } else {
      message.callData = ''
    }
    if (object.sourcePort !== undefined && object.sourcePort !== null) {
      message.sourcePort = object.sourcePort
    } else {
      message.sourcePort = ''
    }
    if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
      message.sourceChannel = object.sourceChannel
    } else {
      message.sourceChannel = ''
    }
    if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
      message.timeoutHeight = Height.fromPartial(object.timeoutHeight)
    } else {
      message.timeoutHeight = undefined
    }
    if (
      object.timeoutTimestamp !== undefined &&
      object.timeoutTimestamp !== null
    ) {
      message.timeoutTimestamp = object.timeoutTimestamp
    } else {
      message.timeoutTimestamp = 0
    }
    return message
  },
}

const baseMsgLinkApplicationResponse: object = {}

export const MsgLinkApplicationResponse = {
  encode(
    _: MsgLinkApplicationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgLinkApplicationResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgLinkApplicationResponse,
    } as MsgLinkApplicationResponse
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

  fromJSON(_: any): MsgLinkApplicationResponse {
    const message = {
      ...baseMsgLinkApplicationResponse,
    } as MsgLinkApplicationResponse
    return message
  },

  toJSON(_: MsgLinkApplicationResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgLinkApplicationResponse>
  ): MsgLinkApplicationResponse {
    const message = {
      ...baseMsgLinkApplicationResponse,
    } as MsgLinkApplicationResponse
    return message
  },
}

const baseMsgUnlinkApplication: object = {
  application: '',
  username: '',
  signer: '',
}

export const MsgUnlinkApplication = {
  encode(
    message: MsgUnlinkApplication,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.application !== '') {
      writer.uint32(10).string(message.application)
    }
    if (message.username !== '') {
      writer.uint32(18).string(message.username)
    }
    if (message.signer !== '') {
      writer.uint32(26).string(message.signer)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnlinkApplication {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnlinkApplication } as MsgUnlinkApplication
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.application = reader.string()
          break
        case 2:
          message.username = reader.string()
          break
        case 3:
          message.signer = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUnlinkApplication {
    const message = { ...baseMsgUnlinkApplication } as MsgUnlinkApplication
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
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    return message
  },

  toJSON(message: MsgUnlinkApplication): unknown {
    const obj: any = {}
    message.application !== undefined && (obj.application = message.application)
    message.username !== undefined && (obj.username = message.username)
    message.signer !== undefined && (obj.signer = message.signer)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUnlinkApplication>): MsgUnlinkApplication {
    const message = { ...baseMsgUnlinkApplication } as MsgUnlinkApplication
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
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    return message
  },
}

const baseMsgUnlinkApplicationResponse: object = {}

export const MsgUnlinkApplicationResponse = {
  encode(
    _: MsgUnlinkApplicationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUnlinkApplicationResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgUnlinkApplicationResponse,
    } as MsgUnlinkApplicationResponse
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

  fromJSON(_: any): MsgUnlinkApplicationResponse {
    const message = {
      ...baseMsgUnlinkApplicationResponse,
    } as MsgUnlinkApplicationResponse
    return message
  },

  toJSON(_: MsgUnlinkApplicationResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgUnlinkApplicationResponse>
  ): MsgUnlinkApplicationResponse {
    const message = {
      ...baseMsgUnlinkApplicationResponse,
    } as MsgUnlinkApplicationResponse
    return message
  },
}

declare var self: any | undefined
declare var window: any | undefined
declare var global: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
