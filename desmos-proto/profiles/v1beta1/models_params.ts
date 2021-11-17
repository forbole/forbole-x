/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Coin } from '../../../cosmos/base/v1beta1/coin'

export const protobufPackage = 'desmos.profiles.v1beta1'

/** Params contains the parameters for the profiles module */
export interface Params {
  nickname?: NicknameParams
  dtag?: DTagParams
  bio?: BioParams
  oracle?: OracleParams
}

/** NicknameParams defines the parameters related to the profiles nicknames */
export interface NicknameParams {
  minLength: Uint8Array
  maxLength: Uint8Array
}

/** DTagParams defines the parameters related to profile DTags */
export interface DTagParams {
  regEx: string
  minLength: Uint8Array
  maxLength: Uint8Array
}

/** BioParams defines the parameters related to profile biography */
export interface BioParams {
  maxLength: Uint8Array
}

/**
 * OracleParams defines the parameters related to the oracle
 * that will be used to verify the ownership of a centralized
 * application account by a Desmos profile
 */
export interface OracleParams {
  /**
   * ScriptID represents the ID of the oracle script to be called to verify the
   * data
   */
  scriptId: number
  /** AskCount represents the number of oracles to which ask to verify the data */
  askCount: number
  /**
   * MinCount represents the minimum count of oracles that should complete the
   * verification successfully
   */
  minCount: number
  /**
   * PrepareGas represents the amount of gas to be used during the preparation
   * stage of the oracle script
   */
  prepareGas: number
  /**
   * ExecuteGas represents the amount of gas to be used during the execution of
   * the oracle script
   */
  executeGas: number
  /**
   * FeeAmount represents the amount of fees to be payed in order to execute the
   * oracle script
   */
  feeAmount: Coin[]
}

const baseParams: object = {}

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.nickname !== undefined) {
      NicknameParams.encode(message.nickname, writer.uint32(10).fork()).ldelim()
    }
    if (message.dtag !== undefined) {
      DTagParams.encode(message.dtag, writer.uint32(18).fork()).ldelim()
    }
    if (message.bio !== undefined) {
      BioParams.encode(message.bio, writer.uint32(26).fork()).ldelim()
    }
    if (message.oracle !== undefined) {
      OracleParams.encode(message.oracle, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseParams } as Params
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.nickname = NicknameParams.decode(reader, reader.uint32())
          break
        case 2:
          message.dtag = DTagParams.decode(reader, reader.uint32())
          break
        case 3:
          message.bio = BioParams.decode(reader, reader.uint32())
          break
        case 4:
          message.oracle = OracleParams.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params
    if (object.nickname !== undefined && object.nickname !== null) {
      message.nickname = NicknameParams.fromJSON(object.nickname)
    } else {
      message.nickname = undefined
    }
    if (object.dtag !== undefined && object.dtag !== null) {
      message.dtag = DTagParams.fromJSON(object.dtag)
    } else {
      message.dtag = undefined
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = BioParams.fromJSON(object.bio)
    } else {
      message.bio = undefined
    }
    if (object.oracle !== undefined && object.oracle !== null) {
      message.oracle = OracleParams.fromJSON(object.oracle)
    } else {
      message.oracle = undefined
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    message.nickname !== undefined &&
      (obj.nickname = message.nickname
        ? NicknameParams.toJSON(message.nickname)
        : undefined)
    message.dtag !== undefined &&
      (obj.dtag = message.dtag ? DTagParams.toJSON(message.dtag) : undefined)
    message.bio !== undefined &&
      (obj.bio = message.bio ? BioParams.toJSON(message.bio) : undefined)
    message.oracle !== undefined &&
      (obj.oracle = message.oracle
        ? OracleParams.toJSON(message.oracle)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    if (object.nickname !== undefined && object.nickname !== null) {
      message.nickname = NicknameParams.fromPartial(object.nickname)
    } else {
      message.nickname = undefined
    }
    if (object.dtag !== undefined && object.dtag !== null) {
      message.dtag = DTagParams.fromPartial(object.dtag)
    } else {
      message.dtag = undefined
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = BioParams.fromPartial(object.bio)
    } else {
      message.bio = undefined
    }
    if (object.oracle !== undefined && object.oracle !== null) {
      message.oracle = OracleParams.fromPartial(object.oracle)
    } else {
      message.oracle = undefined
    }
    return message
  },
}

const baseNicknameParams: object = {}

export const NicknameParams = {
  encode(message: NicknameParams, writer: Writer = Writer.create()): Writer {
    if (message.minLength.length !== 0) {
      writer.uint32(10).bytes(message.minLength)
    }
    if (message.maxLength.length !== 0) {
      writer.uint32(18).bytes(message.maxLength)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): NicknameParams {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseNicknameParams } as NicknameParams
    message.minLength = new Uint8Array()
    message.maxLength = new Uint8Array()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.minLength = reader.bytes()
          break
        case 2:
          message.maxLength = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): NicknameParams {
    const message = { ...baseNicknameParams } as NicknameParams
    message.minLength = new Uint8Array()
    message.maxLength = new Uint8Array()
    if (object.minLength !== undefined && object.minLength !== null) {
      message.minLength = bytesFromBase64(object.minLength)
    }
    if (object.maxLength !== undefined && object.maxLength !== null) {
      message.maxLength = bytesFromBase64(object.maxLength)
    }
    return message
  },

  toJSON(message: NicknameParams): unknown {
    const obj: any = {}
    message.minLength !== undefined &&
      (obj.minLength = base64FromBytes(
        message.minLength !== undefined ? message.minLength : new Uint8Array()
      ))
    message.maxLength !== undefined &&
      (obj.maxLength = base64FromBytes(
        message.maxLength !== undefined ? message.maxLength : new Uint8Array()
      ))
    return obj
  },

  fromPartial(object: DeepPartial<NicknameParams>): NicknameParams {
    const message = { ...baseNicknameParams } as NicknameParams
    if (object.minLength !== undefined && object.minLength !== null) {
      message.minLength = object.minLength
    } else {
      message.minLength = new Uint8Array()
    }
    if (object.maxLength !== undefined && object.maxLength !== null) {
      message.maxLength = object.maxLength
    } else {
      message.maxLength = new Uint8Array()
    }
    return message
  },
}

const baseDTagParams: object = { regEx: '' }

export const DTagParams = {
  encode(message: DTagParams, writer: Writer = Writer.create()): Writer {
    if (message.regEx !== '') {
      writer.uint32(10).string(message.regEx)
    }
    if (message.minLength.length !== 0) {
      writer.uint32(18).bytes(message.minLength)
    }
    if (message.maxLength.length !== 0) {
      writer.uint32(26).bytes(message.maxLength)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DTagParams {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDTagParams } as DTagParams
    message.minLength = new Uint8Array()
    message.maxLength = new Uint8Array()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.regEx = reader.string()
          break
        case 2:
          message.minLength = reader.bytes()
          break
        case 3:
          message.maxLength = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DTagParams {
    const message = { ...baseDTagParams } as DTagParams
    message.minLength = new Uint8Array()
    message.maxLength = new Uint8Array()
    if (object.regEx !== undefined && object.regEx !== null) {
      message.regEx = String(object.regEx)
    } else {
      message.regEx = ''
    }
    if (object.minLength !== undefined && object.minLength !== null) {
      message.minLength = bytesFromBase64(object.minLength)
    }
    if (object.maxLength !== undefined && object.maxLength !== null) {
      message.maxLength = bytesFromBase64(object.maxLength)
    }
    return message
  },

  toJSON(message: DTagParams): unknown {
    const obj: any = {}
    message.regEx !== undefined && (obj.regEx = message.regEx)
    message.minLength !== undefined &&
      (obj.minLength = base64FromBytes(
        message.minLength !== undefined ? message.minLength : new Uint8Array()
      ))
    message.maxLength !== undefined &&
      (obj.maxLength = base64FromBytes(
        message.maxLength !== undefined ? message.maxLength : new Uint8Array()
      ))
    return obj
  },

  fromPartial(object: DeepPartial<DTagParams>): DTagParams {
    const message = { ...baseDTagParams } as DTagParams
    if (object.regEx !== undefined && object.regEx !== null) {
      message.regEx = object.regEx
    } else {
      message.regEx = ''
    }
    if (object.minLength !== undefined && object.minLength !== null) {
      message.minLength = object.minLength
    } else {
      message.minLength = new Uint8Array()
    }
    if (object.maxLength !== undefined && object.maxLength !== null) {
      message.maxLength = object.maxLength
    } else {
      message.maxLength = new Uint8Array()
    }
    return message
  },
}

const baseBioParams: object = {}

export const BioParams = {
  encode(message: BioParams, writer: Writer = Writer.create()): Writer {
    if (message.maxLength.length !== 0) {
      writer.uint32(26).bytes(message.maxLength)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): BioParams {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseBioParams } as BioParams
    message.maxLength = new Uint8Array()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 3:
          message.maxLength = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BioParams {
    const message = { ...baseBioParams } as BioParams
    message.maxLength = new Uint8Array()
    if (object.maxLength !== undefined && object.maxLength !== null) {
      message.maxLength = bytesFromBase64(object.maxLength)
    }
    return message
  },

  toJSON(message: BioParams): unknown {
    const obj: any = {}
    message.maxLength !== undefined &&
      (obj.maxLength = base64FromBytes(
        message.maxLength !== undefined ? message.maxLength : new Uint8Array()
      ))
    return obj
  },

  fromPartial(object: DeepPartial<BioParams>): BioParams {
    const message = { ...baseBioParams } as BioParams
    if (object.maxLength !== undefined && object.maxLength !== null) {
      message.maxLength = object.maxLength
    } else {
      message.maxLength = new Uint8Array()
    }
    return message
  },
}

const baseOracleParams: object = {
  scriptId: 0,
  askCount: 0,
  minCount: 0,
  prepareGas: 0,
  executeGas: 0,
}

export const OracleParams = {
  encode(message: OracleParams, writer: Writer = Writer.create()): Writer {
    if (message.scriptId !== 0) {
      writer.uint32(8).uint64(message.scriptId)
    }
    if (message.askCount !== 0) {
      writer.uint32(16).uint64(message.askCount)
    }
    if (message.minCount !== 0) {
      writer.uint32(24).uint64(message.minCount)
    }
    if (message.prepareGas !== 0) {
      writer.uint32(32).uint64(message.prepareGas)
    }
    if (message.executeGas !== 0) {
      writer.uint32(40).uint64(message.executeGas)
    }
    for (const v of message.feeAmount) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): OracleParams {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOracleParams } as OracleParams
    message.feeAmount = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.scriptId = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.askCount = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.minCount = longToNumber(reader.uint64() as Long)
          break
        case 4:
          message.prepareGas = longToNumber(reader.uint64() as Long)
          break
        case 5:
          message.executeGas = longToNumber(reader.uint64() as Long)
          break
        case 6:
          message.feeAmount.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): OracleParams {
    const message = { ...baseOracleParams } as OracleParams
    message.feeAmount = []
    if (object.scriptId !== undefined && object.scriptId !== null) {
      message.scriptId = Number(object.scriptId)
    } else {
      message.scriptId = 0
    }
    if (object.askCount !== undefined && object.askCount !== null) {
      message.askCount = Number(object.askCount)
    } else {
      message.askCount = 0
    }
    if (object.minCount !== undefined && object.minCount !== null) {
      message.minCount = Number(object.minCount)
    } else {
      message.minCount = 0
    }
    if (object.prepareGas !== undefined && object.prepareGas !== null) {
      message.prepareGas = Number(object.prepareGas)
    } else {
      message.prepareGas = 0
    }
    if (object.executeGas !== undefined && object.executeGas !== null) {
      message.executeGas = Number(object.executeGas)
    } else {
      message.executeGas = 0
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      for (const e of object.feeAmount) {
        message.feeAmount.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: OracleParams): unknown {
    const obj: any = {}
    message.scriptId !== undefined && (obj.scriptId = message.scriptId)
    message.askCount !== undefined && (obj.askCount = message.askCount)
    message.minCount !== undefined && (obj.minCount = message.minCount)
    message.prepareGas !== undefined && (obj.prepareGas = message.prepareGas)
    message.executeGas !== undefined && (obj.executeGas = message.executeGas)
    if (message.feeAmount) {
      obj.feeAmount = message.feeAmount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      )
    } else {
      obj.feeAmount = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<OracleParams>): OracleParams {
    const message = { ...baseOracleParams } as OracleParams
    message.feeAmount = []
    if (object.scriptId !== undefined && object.scriptId !== null) {
      message.scriptId = object.scriptId
    } else {
      message.scriptId = 0
    }
    if (object.askCount !== undefined && object.askCount !== null) {
      message.askCount = object.askCount
    } else {
      message.askCount = 0
    }
    if (object.minCount !== undefined && object.minCount !== null) {
      message.minCount = object.minCount
    } else {
      message.minCount = 0
    }
    if (object.prepareGas !== undefined && object.prepareGas !== null) {
      message.prepareGas = object.prepareGas
    } else {
      message.prepareGas = 0
    }
    if (object.executeGas !== undefined && object.executeGas !== null) {
      message.executeGas = object.executeGas
    } else {
      message.executeGas = 0
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      for (const e of object.feeAmount) {
        message.feeAmount.push(Coin.fromPartial(e))
      }
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

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'))
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i)
  }
  return arr
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'))
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = []
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte))
  }
  return btoa(bin.join(''))
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
