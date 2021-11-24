/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { Timestamp } from 'cosmjs-types/google/protobuf/timestamp'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * ChainLink contains the data representing either an inter- or cross- chain
 * link
 */
export interface ChainLink {
  /** User defines the destination profile address to link */
  user: string
  /**
   * Address contains the data of the external chain address to be connected
   * with the Desmos profile
   */
  address?: Any
  /** Proof contains the ownership proof of the external chain address */
  proof?: Proof
  /** ChainConfig contains the configuration of the external chain */
  chainConfig?: ChainConfig
  /** CreationTime represents the time in which the link has been created */
  creationTime?: Date
}

/** ChainConfig contains the data of the chain with which the link is made. */
export interface ChainConfig {
  name: string
}

/**
 * Proof contains all the data used to verify a signature when linking an
 * account to a profile
 */
export interface Proof {
  /**
   * PubKey represents the public key associated with the address for which to
   * prove the ownership
   */
  pubKey?: Any
  /** Signature represents the hex-encoded signature of the PlainText value */
  signature: string
  /** PlainText represents the hex-encoded value signed in order to produce the Signature */
  plainText: string
}

/** Bech32Address represents a Bech32-encoded address */
export interface Bech32Address {
  /** Value represents the Bech-32 encoded address value */
  value: string
  /** Prefix represents the HRP of the Bech32 address */
  prefix: string
}

/** Base58Address represents a Base58-encoded address */
export interface Base58Address {
  /** Value contains the Base58-encoded address */
  value: string
}

const baseChainLink: object = { user: '' }

export const ChainLink = {
  encode(message: ChainLink, writer: Writer = Writer.create()): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user)
    }
    if (message.address !== undefined) {
      Any.encode(message.address, writer.uint32(18).fork()).ldelim()
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(26).fork()).ldelim()
    }
    if (message.chainConfig !== undefined) {
      ChainConfig.encode(message.chainConfig, writer.uint32(34).fork()).ldelim()
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.creationTime), writer.uint32(42).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ChainLink {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseChainLink } as ChainLink
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string()
          break
        case 2:
          message.address = Any.decode(reader, reader.uint32())
          break
        case 3:
          message.proof = Proof.decode(reader, reader.uint32())
          break
        case 4:
          message.chainConfig = ChainConfig.decode(reader, reader.uint32())
          break
        case 5:
          message.creationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ChainLink {
    const message = { ...baseChainLink } as ChainLink
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = Any.fromJSON(object.address)
    } else {
      message.address = undefined
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = Proof.fromJSON(object.proof)
    } else {
      message.proof = undefined
    }
    if (object.chainConfig !== undefined && object.chainConfig !== null) {
      message.chainConfig = ChainConfig.fromJSON(object.chainConfig)
    } else {
      message.chainConfig = undefined
    }
    if (object.creationTime !== undefined && object.creationTime !== null) {
      message.creationTime = fromJsonTimestamp(object.creationTime)
    } else {
      message.creationTime = undefined
    }
    return message
  },

  toJSON(message: ChainLink): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user)
    message.address !== undefined &&
      (obj.address = message.address ? Any.toJSON(message.address) : undefined)
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined)
    message.chainConfig !== undefined &&
      (obj.chainConfig = message.chainConfig ? ChainConfig.toJSON(message.chainConfig) : undefined)
    message.creationTime !== undefined && (obj.creationTime = message.creationTime.toISOString())
    return obj
  },

  fromPartial(object: DeepPartial<ChainLink>): ChainLink {
    const message = { ...baseChainLink } as ChainLink
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = Any.fromPartial(object.address)
    } else {
      message.address = undefined
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = Proof.fromPartial(object.proof)
    } else {
      message.proof = undefined
    }
    if (object.chainConfig !== undefined && object.chainConfig !== null) {
      message.chainConfig = ChainConfig.fromPartial(object.chainConfig)
    } else {
      message.chainConfig = undefined
    }
    if (object.creationTime !== undefined && object.creationTime !== null) {
      message.creationTime = object.creationTime
    } else {
      message.creationTime = undefined
    }
    return message
  },
}

const baseChainConfig: object = { name: '' }

export const ChainConfig = {
  encode(message: ChainConfig, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ChainConfig {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseChainConfig } as ChainConfig
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ChainConfig {
    const message = { ...baseChainConfig } as ChainConfig
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    return message
  },

  toJSON(message: ChainConfig): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    return obj
  },

  fromPartial(object: DeepPartial<ChainConfig>): ChainConfig {
    const message = { ...baseChainConfig } as ChainConfig
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    return message
  },
}

const baseProof: object = { signature: '', plainText: '' }

export const Proof = {
  encode(message: Proof, writer: Writer = Writer.create()): Writer {
    if (message.pubKey !== undefined) {
      Any.encode(message.pubKey, writer.uint32(10).fork()).ldelim()
    }
    if (message.signature !== '') {
      writer.uint32(18).string(message.signature)
    }
    if (message.plainText !== '') {
      writer.uint32(26).string(message.plainText)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Proof {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseProof } as Proof
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pubKey = Any.decode(reader, reader.uint32())
          break
        case 2:
          message.signature = reader.string()
          break
        case 3:
          message.plainText = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Proof {
    const message = { ...baseProof } as Proof
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = Any.fromJSON(object.pubKey)
    } else {
      message.pubKey = undefined
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature)
    } else {
      message.signature = ''
    }
    if (object.plainText !== undefined && object.plainText !== null) {
      message.plainText = String(object.plainText)
    } else {
      message.plainText = ''
    }
    return message
  },

  toJSON(message: Proof): unknown {
    const obj: any = {}
    message.pubKey !== undefined &&
      (obj.pubKey = message.pubKey ? Any.toJSON(message.pubKey) : undefined)
    message.signature !== undefined && (obj.signature = message.signature)
    message.plainText !== undefined && (obj.plainText = message.plainText)
    return obj
  },

  fromPartial(object: DeepPartial<Proof>): Proof {
    const message = { ...baseProof } as Proof
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = Any.fromPartial(object.pubKey)
    } else {
      message.pubKey = undefined
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature
    } else {
      message.signature = ''
    }
    if (object.plainText !== undefined && object.plainText !== null) {
      message.plainText = object.plainText
    } else {
      message.plainText = ''
    }
    return message
  },
}

const baseBech32Address: object = { value: '', prefix: '' }

export const Bech32Address = {
  encode(message: Bech32Address, writer: Writer = Writer.create()): Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value)
    }
    if (message.prefix !== '') {
      writer.uint32(18).string(message.prefix)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Bech32Address {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseBech32Address } as Bech32Address
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string()
          break
        case 2:
          message.prefix = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Bech32Address {
    const message = { ...baseBech32Address } as Bech32Address
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value)
    } else {
      message.value = ''
    }
    if (object.prefix !== undefined && object.prefix !== null) {
      message.prefix = String(object.prefix)
    } else {
      message.prefix = ''
    }
    return message
  },

  toJSON(message: Bech32Address): unknown {
    const obj: any = {}
    message.value !== undefined && (obj.value = message.value)
    message.prefix !== undefined && (obj.prefix = message.prefix)
    return obj
  },

  fromPartial(object: DeepPartial<Bech32Address>): Bech32Address {
    const message = { ...baseBech32Address } as Bech32Address
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = ''
    }
    if (object.prefix !== undefined && object.prefix !== null) {
      message.prefix = object.prefix
    } else {
      message.prefix = ''
    }
    return message
  },
}

const baseBase58Address: object = { value: '' }

export const Base58Address = {
  encode(message: Base58Address, writer: Writer = Writer.create()): Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Base58Address {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseBase58Address } as Base58Address
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Base58Address {
    const message = { ...baseBase58Address } as Base58Address
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value)
    } else {
      message.value = ''
    }
    return message
  },

  toJSON(message: Base58Address): unknown {
    const obj: any = {}
    message.value !== undefined && (obj.value = message.value)
    return obj
  },

  fromPartial(object: DeepPartial<Base58Address>): Base58Address {
    const message = { ...baseBase58Address } as Base58Address
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = ''
    }
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

function toTimestamp(date: Date): Timestamp {
  const seconds = (date.getTime() / 1_000) as any
  const nanos = (date.getTime() % 1_000) * 1_000_000
  return { seconds, nanos }
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds as any) * 1_000
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
