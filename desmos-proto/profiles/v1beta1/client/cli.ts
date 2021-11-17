/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Any } from '../../../../google/protobuf/any'
import {
  Proof,
  ChainConfig,
} from '../../../../desmos/profiles/v1beta1/models_chain_links'

export const protobufPackage = 'desmos.profiles.v1beta1.client'

/**
 * ChainLinkJSON contains the data required to create a ChainLink using the CLI
 * command
 */
export interface ChainLinkJSON {
  /**
   * Address contains the data of the external chain address to be connected
   * with the Desmos profile
   */
  address?: Any
  /** Proof contains the ownership proof of the external chain address */
  proof?: Proof
  /** ChainConfig contains the configuration of the external chain */
  chainConfig?: ChainConfig
}

const baseChainLinkJSON: object = {}

export const ChainLinkJSON = {
  encode(message: ChainLinkJSON, writer: Writer = Writer.create()): Writer {
    if (message.address !== undefined) {
      Any.encode(message.address, writer.uint32(10).fork()).ldelim()
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim()
    }
    if (message.chainConfig !== undefined) {
      ChainConfig.encode(message.chainConfig, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ChainLinkJSON {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseChainLinkJSON } as ChainLinkJSON
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.address = Any.decode(reader, reader.uint32())
          break
        case 2:
          message.proof = Proof.decode(reader, reader.uint32())
          break
        case 3:
          message.chainConfig = ChainConfig.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ChainLinkJSON {
    const message = { ...baseChainLinkJSON } as ChainLinkJSON
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
    return message
  },

  toJSON(message: ChainLinkJSON): unknown {
    const obj: any = {}
    message.address !== undefined &&
      (obj.address = message.address ? Any.toJSON(message.address) : undefined)
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined)
    message.chainConfig !== undefined &&
      (obj.chainConfig = message.chainConfig
        ? ChainConfig.toJSON(message.chainConfig)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<ChainLinkJSON>): ChainLinkJSON {
    const message = { ...baseChainLinkJSON } as ChainLinkJSON
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
