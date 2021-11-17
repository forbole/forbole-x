/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Timestamp } from '../../../google/protobuf/timestamp'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * ApplicationLinkState defines if an application link is in the following
 * states: STARTED, ERRORED, SUCCESSFUL, TIMED_OUT
 */
export enum ApplicationLinkState {
  /** APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED - A link has just been initialized */
  APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED = 0,
  /** APPLICATION_LINK_STATE_VERIFICATION_STARTED - A link has just started being verified */
  APPLICATION_LINK_STATE_VERIFICATION_STARTED = 1,
  /** APPLICATION_LINK_STATE_VERIFICATION_ERROR - A link has errored during the verification process */
  APPLICATION_LINK_STATE_VERIFICATION_ERROR = 2,
  /** APPLICATION_LINK_STATE_VERIFICATION_SUCCESS - A link has being verified successfully */
  APPLICATION_LINK_STATE_VERIFICATION_SUCCESS = 3,
  /** APPLICATION_LINK_STATE_TIMED_OUT - A link has timed out while waiting for the verification */
  APPLICATION_LINK_STATE_TIMED_OUT = 4,
  UNRECOGNIZED = -1,
}

export function applicationLinkStateFromJSON(
  object: any
): ApplicationLinkState {
  switch (object) {
    case 0:
    case 'APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED':
      return ApplicationLinkState.APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED
    case 1:
    case 'APPLICATION_LINK_STATE_VERIFICATION_STARTED':
      return ApplicationLinkState.APPLICATION_LINK_STATE_VERIFICATION_STARTED
    case 2:
    case 'APPLICATION_LINK_STATE_VERIFICATION_ERROR':
      return ApplicationLinkState.APPLICATION_LINK_STATE_VERIFICATION_ERROR
    case 3:
    case 'APPLICATION_LINK_STATE_VERIFICATION_SUCCESS':
      return ApplicationLinkState.APPLICATION_LINK_STATE_VERIFICATION_SUCCESS
    case 4:
    case 'APPLICATION_LINK_STATE_TIMED_OUT':
      return ApplicationLinkState.APPLICATION_LINK_STATE_TIMED_OUT
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ApplicationLinkState.UNRECOGNIZED
  }
}

export function applicationLinkStateToJSON(
  object: ApplicationLinkState
): string {
  switch (object) {
    case ApplicationLinkState.APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED:
      return 'APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED'
    case ApplicationLinkState.APPLICATION_LINK_STATE_VERIFICATION_STARTED:
      return 'APPLICATION_LINK_STATE_VERIFICATION_STARTED'
    case ApplicationLinkState.APPLICATION_LINK_STATE_VERIFICATION_ERROR:
      return 'APPLICATION_LINK_STATE_VERIFICATION_ERROR'
    case ApplicationLinkState.APPLICATION_LINK_STATE_VERIFICATION_SUCCESS:
      return 'APPLICATION_LINK_STATE_VERIFICATION_SUCCESS'
    case ApplicationLinkState.APPLICATION_LINK_STATE_TIMED_OUT:
      return 'APPLICATION_LINK_STATE_TIMED_OUT'
    default:
      return 'UNKNOWN'
  }
}

/** ApplicationLink contains the data of a link to a centralized application */
export interface ApplicationLink {
  /** User to which the link is associated */
  user: string
  /** Data contains the details of this specific link */
  data?: Data
  /** State of the link */
  state: ApplicationLinkState
  /** OracleRequest represents the request that has been made to the oracle */
  oracleRequest?: OracleRequest
  /**
   * Data coming from the result of the verification.
   * Only available when the state is STATE_SUCCESS
   */
  result?: Result
  /** CreationTime represents the time in which the link was created */
  creationTime?: Date
}

/**
 * Data contains the data associated to a specific user of a
 * generic centralized application
 */
export interface Data {
  /** The application name (eg. Twitter, GitHub, etc) */
  application: string
  /** Username on the application (eg. Twitter tag, GitHub profile, etc) */
  username: string
}

/**
 * OracleRequest represents a generic oracle request used to
 * verify the ownership of a centralized application account
 */
export interface OracleRequest {
  /** ID is the ID of the request */
  id: number
  /** OracleScriptID is ID of an oracle script */
  oracleScriptId: number
  /** CallData contains the data used to perform the oracle request */
  callData?: OracleRequest_CallData
  /** ClientID represents the ID of the client that has called the oracle script */
  clientId: string
}

/**
 * CallData contains the data sent to a single oracle request in order to
 * verify the ownership of a centralized application by a Desmos profile
 */
export interface OracleRequest_CallData {
  /** The application for which the ownership should be verified */
  application: string
  /**
   * The hex encoded call data that should be used to verify the application
   * account ownership
   */
  callData: string
}

/** Result represents a verification result */
export interface Result {
  /** Success represents a successful verification */
  success?: Result_Success | undefined
  /** Failed represents a failed verification */
  failed?: Result_Failed | undefined
}

/**
 * Success is the result of an application link that has been successfully
 * verified
 */
export interface Result_Success {
  /** Hex-encoded value that has be signed by the profile */
  value: string
  /** Hex-encoded signature that has been produced by signing the value */
  signature: string
}

/**
 * Failed is the result of an application link that has not been verified
 * successfully
 */
export interface Result_Failed {
  /** Error that is associated with the failure */
  error: string
}

const baseApplicationLink: object = { user: '', state: 0 }

export const ApplicationLink = {
  encode(message: ApplicationLink, writer: Writer = Writer.create()): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.data !== undefined) {
      Data.encode(message.data, writer.uint32(18).fork()).ldelim()
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state)
    }
    if (message.oracleRequest !== undefined) {
      OracleRequest.encode(
        message.oracleRequest,
        writer.uint32(34).fork()
      ).ldelim()
    }
    if (message.result !== undefined) {
      Result.encode(message.result, writer.uint32(42).fork()).ldelim()
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.creationTime),
        writer.uint32(50).fork()
      ).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ApplicationLink {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseApplicationLink } as ApplicationLink
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.data = Data.decode(reader, reader.uint32())
          break
        case 3:
          message.state = reader.int32() as any
          break
        case 4:
          message.oracleRequest = OracleRequest.decode(reader, reader.uint32())
          break
        case 5:
          message.result = Result.decode(reader, reader.uint32())
          break
        case 6:
          message.creationTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          )
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ApplicationLink {
    const message = { ...baseApplicationLink } as ApplicationLink
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Data.fromJSON(object.data)
    } else {
      message.data = undefined
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = applicationLinkStateFromJSON(object.state)
    } else {
      message.state = 0
    }
    if (object.oracleRequest !== undefined && object.oracleRequest !== null) {
      message.oracleRequest = OracleRequest.fromJSON(object.oracleRequest)
    } else {
      message.oracleRequest = undefined
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = Result.fromJSON(object.result)
    } else {
      message.result = undefined
    }
    if (object.creationTime !== undefined && object.creationTime !== null) {
      message.creationTime = fromJsonTimestamp(object.creationTime)
    } else {
      message.creationTime = undefined
    }
    return message
  },

  toJSON(message: ApplicationLink): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.data !== undefined &&
      (obj.data = message.data ? Data.toJSON(message.data) : undefined)
    message.state !== undefined &&
      (obj.state = applicationLinkStateToJSON(message.state))
    message.oracleRequest !== undefined &&
      (obj.oracleRequest = message.oracleRequest
        ? OracleRequest.toJSON(message.oracleRequest)
        : undefined)
    message.result !== undefined &&
      (obj.result = message.result ? Result.toJSON(message.result) : undefined)
    message.creationTime !== undefined &&
      (obj.creationTime = message.creationTime.toISOString())
    return obj
  },

  fromPartial(object: DeepPartial<ApplicationLink>): ApplicationLink {
    const message = { ...baseApplicationLink } as ApplicationLink
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Data.fromPartial(object.data)
    } else {
      message.data = undefined
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state
    } else {
      message.state = 0
    }
    if (object.oracleRequest !== undefined && object.oracleRequest !== null) {
      message.oracleRequest = OracleRequest.fromPartial(object.oracleRequest)
    } else {
      message.oracleRequest = undefined
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = Result.fromPartial(object.result)
    } else {
      message.result = undefined
    }
    if (object.creationTime !== undefined && object.creationTime !== null) {
      message.creationTime = object.creationTime
    } else {
      message.creationTime = undefined
    }
    return message
  },
}

const baseData: object = { application: '', username: '' }

export const Data = {
  encode(message: Data, writer: Writer = Writer.create()): Writer {
    if (message.application !== '') {
      writer.uint32(10).string(message.application)
    }
    if (message.username !== '') {
      writer.uint32(18).string(message.username)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Data {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseData } as Data
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.application = reader.string()
          break
        case 2:
          message.username = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Data {
    const message = { ...baseData } as Data
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

  toJSON(message: Data): unknown {
    const obj: any = {}
    message.application !== undefined && (obj.application = message.application)
    message.username !== undefined && (obj.username = message.username)
    return obj
  },

  fromPartial(object: DeepPartial<Data>): Data {
    const message = { ...baseData } as Data
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

const baseOracleRequest: object = { id: 0, oracleScriptId: 0, clientId: '' }

export const OracleRequest = {
  encode(message: OracleRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    if (message.oracleScriptId !== 0) {
      writer.uint32(16).uint64(message.oracleScriptId)
    }
    if (message.callData !== undefined) {
      OracleRequest_CallData.encode(
        message.callData,
        writer.uint32(26).fork()
      ).ldelim()
    }
    if (message.clientId !== '') {
      writer.uint32(34).string(message.clientId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): OracleRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOracleRequest } as OracleRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.oracleScriptId = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.callData = OracleRequest_CallData.decode(
            reader,
            reader.uint32()
          )
          break
        case 4:
          message.clientId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): OracleRequest {
    const message = { ...baseOracleRequest } as OracleRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
      message.oracleScriptId = Number(object.oracleScriptId)
    } else {
      message.oracleScriptId = 0
    }
    if (object.callData !== undefined && object.callData !== null) {
      message.callData = OracleRequest_CallData.fromJSON(object.callData)
    } else {
      message.callData = undefined
    }
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId)
    } else {
      message.clientId = ''
    }
    return message
  },

  toJSON(message: OracleRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.oracleScriptId !== undefined &&
      (obj.oracleScriptId = message.oracleScriptId)
    message.callData !== undefined &&
      (obj.callData = message.callData
        ? OracleRequest_CallData.toJSON(message.callData)
        : undefined)
    message.clientId !== undefined && (obj.clientId = message.clientId)
    return obj
  },

  fromPartial(object: DeepPartial<OracleRequest>): OracleRequest {
    const message = { ...baseOracleRequest } as OracleRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
      message.oracleScriptId = object.oracleScriptId
    } else {
      message.oracleScriptId = 0
    }
    if (object.callData !== undefined && object.callData !== null) {
      message.callData = OracleRequest_CallData.fromPartial(object.callData)
    } else {
      message.callData = undefined
    }
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId
    } else {
      message.clientId = ''
    }
    return message
  },
}

const baseOracleRequest_CallData: object = { application: '', callData: '' }

export const OracleRequest_CallData = {
  encode(
    message: OracleRequest_CallData,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.application !== '') {
      writer.uint32(10).string(message.application)
    }
    if (message.callData !== '') {
      writer.uint32(18).string(message.callData)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): OracleRequest_CallData {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOracleRequest_CallData } as OracleRequest_CallData
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.application = reader.string()
          break
        case 2:
          message.callData = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): OracleRequest_CallData {
    const message = { ...baseOracleRequest_CallData } as OracleRequest_CallData
    if (object.application !== undefined && object.application !== null) {
      message.application = String(object.application)
    } else {
      message.application = ''
    }
    if (object.callData !== undefined && object.callData !== null) {
      message.callData = String(object.callData)
    } else {
      message.callData = ''
    }
    return message
  },

  toJSON(message: OracleRequest_CallData): unknown {
    const obj: any = {}
    message.application !== undefined && (obj.application = message.application)
    message.callData !== undefined && (obj.callData = message.callData)
    return obj
  },

  fromPartial(
    object: DeepPartial<OracleRequest_CallData>
  ): OracleRequest_CallData {
    const message = { ...baseOracleRequest_CallData } as OracleRequest_CallData
    if (object.application !== undefined && object.application !== null) {
      message.application = object.application
    } else {
      message.application = ''
    }
    if (object.callData !== undefined && object.callData !== null) {
      message.callData = object.callData
    } else {
      message.callData = ''
    }
    return message
  },
}

const baseResult: object = {}

export const Result = {
  encode(message: Result, writer: Writer = Writer.create()): Writer {
    if (message.success !== undefined) {
      Result_Success.encode(message.success, writer.uint32(10).fork()).ldelim()
    }
    if (message.failed !== undefined) {
      Result_Failed.encode(message.failed, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Result {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseResult } as Result
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.success = Result_Success.decode(reader, reader.uint32())
          break
        case 2:
          message.failed = Result_Failed.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Result {
    const message = { ...baseResult } as Result
    if (object.success !== undefined && object.success !== null) {
      message.success = Result_Success.fromJSON(object.success)
    } else {
      message.success = undefined
    }
    if (object.failed !== undefined && object.failed !== null) {
      message.failed = Result_Failed.fromJSON(object.failed)
    } else {
      message.failed = undefined
    }
    return message
  },

  toJSON(message: Result): unknown {
    const obj: any = {}
    message.success !== undefined &&
      (obj.success = message.success
        ? Result_Success.toJSON(message.success)
        : undefined)
    message.failed !== undefined &&
      (obj.failed = message.failed
        ? Result_Failed.toJSON(message.failed)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<Result>): Result {
    const message = { ...baseResult } as Result
    if (object.success !== undefined && object.success !== null) {
      message.success = Result_Success.fromPartial(object.success)
    } else {
      message.success = undefined
    }
    if (object.failed !== undefined && object.failed !== null) {
      message.failed = Result_Failed.fromPartial(object.failed)
    } else {
      message.failed = undefined
    }
    return message
  },
}

const baseResult_Success: object = { value: '', signature: '' }

export const Result_Success = {
  encode(message: Result_Success, writer: Writer = Writer.create()): Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value)
    }
    if (message.signature !== '') {
      writer.uint32(18).string(message.signature)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Result_Success {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseResult_Success } as Result_Success
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string()
          break
        case 2:
          message.signature = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Result_Success {
    const message = { ...baseResult_Success } as Result_Success
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value)
    } else {
      message.value = ''
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature)
    } else {
      message.signature = ''
    }
    return message
  },

  toJSON(message: Result_Success): unknown {
    const obj: any = {}
    message.value !== undefined && (obj.value = message.value)
    message.signature !== undefined && (obj.signature = message.signature)
    return obj
  },

  fromPartial(object: DeepPartial<Result_Success>): Result_Success {
    const message = { ...baseResult_Success } as Result_Success
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = ''
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature
    } else {
      message.signature = ''
    }
    return message
  },
}

const baseResult_Failed: object = { error: '' }

export const Result_Failed = {
  encode(message: Result_Failed, writer: Writer = Writer.create()): Writer {
    if (message.error !== '') {
      writer.uint32(10).string(message.error)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Result_Failed {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseResult_Failed } as Result_Failed
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.error = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Result_Failed {
    const message = { ...baseResult_Failed } as Result_Failed
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error)
    } else {
      message.error = ''
    }
    return message
  },

  toJSON(message: Result_Failed): unknown {
    const obj: any = {}
    message.error !== undefined && (obj.error = message.error)
    return obj
  },

  fromPartial(object: DeepPartial<Result_Failed>): Result_Failed {
    const message = { ...baseResult_Failed } as Result_Failed
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error
    } else {
      message.error = ''
    }
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000
  const nanos = (date.getTime() % 1_000) * 1_000_000
  return { seconds, nanos }
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000
  millis += t.nanos / 1_000_000
  return new Date(millis)
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o
  } else if (typeof o === 'string') {
    return new Date(o)
  } else {
    return fromTimestamp(Timestamp.fromJSON(o))
  }
}

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
