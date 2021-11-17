/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Any } from '../../../google/protobuf/any'
import {
  Proof,
  ChainConfig,
} from '../../../desmos/profiles/v1beta1/models_chain_links'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * LinkChainAccountPacketData defines the object that should be sent inside a
 * MsgSendPacket when wanting to link an external chain to a Desmos profile
 * using IBC
 */
export interface LinkChainAccountPacketData {
  /** SourceAddress contains the details of the external chain address */
  sourceAddress?: Any
  /** SourceProof represents the proof of ownership of the source address */
  sourceProof?: Proof
  /** SourceChainConfig contains the details of the source chain */
  sourceChainConfig?: ChainConfig
  /**
   * DestinationAddress represents the Desmos address of the profile that should
   * be linked with the external account
   */
  destinationAddress: string
  /** DestinationProof contains the proof of ownership of the DestinationAddress */
  destinationProof?: Proof
}

/** LinkChainAccountPacketAck defines a struct for the packet acknowledgment */
export interface LinkChainAccountPacketAck {
  /**
   * SourceAddress contains the external address that has been linked properly
   * with the profile
   */
  sourceAddress: string
}

const baseLinkChainAccountPacketData: object = { destinationAddress: '' }

export const LinkChainAccountPacketData = {
  encode(
    message: LinkChainAccountPacketData,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sourceAddress !== undefined) {
      Any.encode(message.sourceAddress, writer.uint32(10).fork()).ldelim()
    }
    if (message.sourceProof !== undefined) {
      Proof.encode(message.sourceProof, writer.uint32(18).fork()).ldelim()
    }
    if (message.sourceChainConfig !== undefined) {
      ChainConfig.encode(
        message.sourceChainConfig,
        writer.uint32(26).fork()
      ).ldelim()
    }
    if (message.destinationAddress !== '') {
      writer.uint32(34).string(message.destinationAddress)
    }
    if (message.destinationProof !== undefined) {
      Proof.encode(message.destinationProof, writer.uint32(42).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): LinkChainAccountPacketData {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseLinkChainAccountPacketData,
    } as LinkChainAccountPacketData
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sourceAddress = Any.decode(reader, reader.uint32())
          break
        case 2:
          message.sourceProof = Proof.decode(reader, reader.uint32())
          break
        case 3:
          message.sourceChainConfig = ChainConfig.decode(
            reader,
            reader.uint32()
          )
          break
        case 4:
          message.destinationAddress = reader.string()
          break
        case 5:
          message.destinationProof = Proof.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LinkChainAccountPacketData {
    const message = {
      ...baseLinkChainAccountPacketData,
    } as LinkChainAccountPacketData
    if (object.sourceAddress !== undefined && object.sourceAddress !== null) {
      message.sourceAddress = Any.fromJSON(object.sourceAddress)
    } else {
      message.sourceAddress = undefined
    }
    if (object.sourceProof !== undefined && object.sourceProof !== null) {
      message.sourceProof = Proof.fromJSON(object.sourceProof)
    } else {
      message.sourceProof = undefined
    }
    if (
      object.sourceChainConfig !== undefined &&
      object.sourceChainConfig !== null
    ) {
      message.sourceChainConfig = ChainConfig.fromJSON(object.sourceChainConfig)
    } else {
      message.sourceChainConfig = undefined
    }
    if (
      object.destinationAddress !== undefined &&
      object.destinationAddress !== null
    ) {
      message.destinationAddress = String(object.destinationAddress)
    } else {
      message.destinationAddress = ''
    }
    if (
      object.destinationProof !== undefined &&
      object.destinationProof !== null
    ) {
      message.destinationProof = Proof.fromJSON(object.destinationProof)
    } else {
      message.destinationProof = undefined
    }
    return message
  },

  toJSON(message: LinkChainAccountPacketData): unknown {
    const obj: any = {}
    message.sourceAddress !== undefined &&
      (obj.sourceAddress = message.sourceAddress
        ? Any.toJSON(message.sourceAddress)
        : undefined)
    message.sourceProof !== undefined &&
      (obj.sourceProof = message.sourceProof
        ? Proof.toJSON(message.sourceProof)
        : undefined)
    message.sourceChainConfig !== undefined &&
      (obj.sourceChainConfig = message.sourceChainConfig
        ? ChainConfig.toJSON(message.sourceChainConfig)
        : undefined)
    message.destinationAddress !== undefined &&
      (obj.destinationAddress = message.destinationAddress)
    message.destinationProof !== undefined &&
      (obj.destinationProof = message.destinationProof
        ? Proof.toJSON(message.destinationProof)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<LinkChainAccountPacketData>
  ): LinkChainAccountPacketData {
    const message = {
      ...baseLinkChainAccountPacketData,
    } as LinkChainAccountPacketData
    if (object.sourceAddress !== undefined && object.sourceAddress !== null) {
      message.sourceAddress = Any.fromPartial(object.sourceAddress)
    } else {
      message.sourceAddress = undefined
    }
    if (object.sourceProof !== undefined && object.sourceProof !== null) {
      message.sourceProof = Proof.fromPartial(object.sourceProof)
    } else {
      message.sourceProof = undefined
    }
    if (
      object.sourceChainConfig !== undefined &&
      object.sourceChainConfig !== null
    ) {
      message.sourceChainConfig = ChainConfig.fromPartial(
        object.sourceChainConfig
      )
    } else {
      message.sourceChainConfig = undefined
    }
    if (
      object.destinationAddress !== undefined &&
      object.destinationAddress !== null
    ) {
      message.destinationAddress = object.destinationAddress
    } else {
      message.destinationAddress = ''
    }
    if (
      object.destinationProof !== undefined &&
      object.destinationProof !== null
    ) {
      message.destinationProof = Proof.fromPartial(object.destinationProof)
    } else {
      message.destinationProof = undefined
    }
    return message
  },
}

const baseLinkChainAccountPacketAck: object = { sourceAddress: '' }

export const LinkChainAccountPacketAck = {
  encode(
    message: LinkChainAccountPacketAck,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sourceAddress !== '') {
      writer.uint32(10).string(message.sourceAddress)
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): LinkChainAccountPacketAck {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseLinkChainAccountPacketAck,
    } as LinkChainAccountPacketAck
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sourceAddress = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LinkChainAccountPacketAck {
    const message = {
      ...baseLinkChainAccountPacketAck,
    } as LinkChainAccountPacketAck
    if (object.sourceAddress !== undefined && object.sourceAddress !== null) {
      message.sourceAddress = String(object.sourceAddress)
    } else {
      message.sourceAddress = ''
    }
    return message
  },

  toJSON(message: LinkChainAccountPacketAck): unknown {
    const obj: any = {}
    message.sourceAddress !== undefined &&
      (obj.sourceAddress = message.sourceAddress)
    return obj
  },

  fromPartial(
    object: DeepPartial<LinkChainAccountPacketAck>
  ): LinkChainAccountPacketAck {
    const message = {
      ...baseLinkChainAccountPacketAck,
    } as LinkChainAccountPacketAck
    if (object.sourceAddress !== undefined && object.sourceAddress !== null) {
      message.sourceAddress = object.sourceAddress
    } else {
      message.sourceAddress = ''
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
