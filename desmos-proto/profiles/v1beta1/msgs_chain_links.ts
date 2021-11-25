/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { Proof, ChainConfig } from './models_chain_links'

export const protobufPackage = 'desmos.profiles.v1beta1'

/** MsgLinkChainAccount represents a message to link an account to a profile. */
export interface MsgLinkChainAccount {
  /**
   * ChainAddress contains the details of the external chain address to be
   * linked
   */
  chainAddress?: Any
  /** Proof contains the proof of ownership of the external chain address */
  proof?: Proof
  /** ChainConfig contains the configuration of the external chain */
  chainConfig?: ChainConfig
  /**
   * Signer represents the Desmos address associated with the
   * profile to which link the external account
   */
  signer: string
}

/** MsgLinkChainAccountResponse defines the Msg/LinkAccount response type. */
export interface MsgLinkChainAccountResponse {}

/**
 * MsgUnlinkChainAccount represents a message to unlink an account from a
 * profile.
 */
export interface MsgUnlinkChainAccount {
  /** Owner represents the Desmos profile from which to remove the link */
  owner: string
  /**
   * ChainName represents the name of the chain to which the link to remove is
   * associated
   */
  chainName: string
  /** Target represents the external address to be removed */
  target: string
}

/** MsgUnlinkChainAccountResponse defines the Msg/UnlinkAccount response type. */
export interface MsgUnlinkChainAccountResponse {}

const baseMsgLinkChainAccount: object = { signer: '' }

export const MsgLinkChainAccount = {
  encode(message: MsgLinkChainAccount, writer: Writer = Writer.create()): Writer {
    if (message.chainAddress !== undefined) {
      Any.encode(message.chainAddress, writer.uint32(10).fork()).ldelim()
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim()
    }
    if (message.chainConfig !== undefined) {
      ChainConfig.encode(message.chainConfig, writer.uint32(26).fork()).ldelim()
    }
    if (message.signer !== '') {
      writer.uint32(34).string(message.signer)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLinkChainAccount {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgLinkChainAccount } as MsgLinkChainAccount
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.chainAddress = Any.decode(reader, reader.uint32())
          break
        case 2:
          message.proof = Proof.decode(reader, reader.uint32())
          break
        case 3:
          message.chainConfig = ChainConfig.decode(reader, reader.uint32())
          break
        case 4:
          message.signer = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgLinkChainAccount {
    const message = { ...baseMsgLinkChainAccount } as MsgLinkChainAccount
    if (object.chainAddress !== undefined && object.chainAddress !== null) {
      message.chainAddress = Any.fromJSON(object.chainAddress)
    } else {
      message.chainAddress = undefined
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
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    return message
  },

  toJSON(message: MsgLinkChainAccount): unknown {
    const obj: any = {}
    message.chainAddress !== undefined &&
      (obj.chainAddress = message.chainAddress ? Any.toJSON(message.chainAddress) : undefined)
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined)
    message.chainConfig !== undefined &&
      (obj.chainConfig = message.chainConfig ? ChainConfig.toJSON(message.chainConfig) : undefined)
    message.signer !== undefined && (obj.signer = message.signer)
    return obj
  },

  fromPartial(object: DeepPartial<MsgLinkChainAccount>): MsgLinkChainAccount {
    const message = { ...baseMsgLinkChainAccount } as MsgLinkChainAccount
    if (object.chainAddress !== undefined && object.chainAddress !== null) {
      message.chainAddress = Any.fromPartial(object.chainAddress)
    } else {
      message.chainAddress = undefined
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
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    return message
  },
}

const baseMsgLinkChainAccountResponse: object = {}

export const MsgLinkChainAccountResponse = {
  encode(_: MsgLinkChainAccountResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLinkChainAccountResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgLinkChainAccountResponse,
    } as MsgLinkChainAccountResponse
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

  fromJSON(_: any): MsgLinkChainAccountResponse {
    const message = {
      ...baseMsgLinkChainAccountResponse,
    } as MsgLinkChainAccountResponse
    return message
  },

  toJSON(_: MsgLinkChainAccountResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgLinkChainAccountResponse>): MsgLinkChainAccountResponse {
    const message = {
      ...baseMsgLinkChainAccountResponse,
    } as MsgLinkChainAccountResponse
    return message
  },
}

const baseMsgUnlinkChainAccount: object = {
  owner: '',
  chainName: '',
  target: '',
}

export const MsgUnlinkChainAccount = {
  encode(message: MsgUnlinkChainAccount, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.chainName !== '') {
      writer.uint32(18).string(message.chainName)
    }
    if (message.target !== '') {
      writer.uint32(26).string(message.target)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnlinkChainAccount {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnlinkChainAccount } as MsgUnlinkChainAccount
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.chainName = reader.string()
          break
        case 3:
          message.target = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUnlinkChainAccount {
    const message = { ...baseMsgUnlinkChainAccount } as MsgUnlinkChainAccount
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.chainName !== undefined && object.chainName !== null) {
      message.chainName = String(object.chainName)
    } else {
      message.chainName = ''
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target)
    } else {
      message.target = ''
    }
    return message
  },

  toJSON(message: MsgUnlinkChainAccount): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.chainName !== undefined && (obj.chainName = message.chainName)
    message.target !== undefined && (obj.target = message.target)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUnlinkChainAccount>): MsgUnlinkChainAccount {
    const message = { ...baseMsgUnlinkChainAccount } as MsgUnlinkChainAccount
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.chainName !== undefined && object.chainName !== null) {
      message.chainName = object.chainName
    } else {
      message.chainName = ''
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target
    } else {
      message.target = ''
    }
    return message
  },
}

const baseMsgUnlinkChainAccountResponse: object = {}

export const MsgUnlinkChainAccountResponse = {
  encode(_: MsgUnlinkChainAccountResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnlinkChainAccountResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgUnlinkChainAccountResponse,
    } as MsgUnlinkChainAccountResponse
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

  fromJSON(_: any): MsgUnlinkChainAccountResponse {
    const message = {
      ...baseMsgUnlinkChainAccountResponse,
    } as MsgUnlinkChainAccountResponse
    return message
  },

  toJSON(_: MsgUnlinkChainAccountResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgUnlinkChainAccountResponse>): MsgUnlinkChainAccountResponse {
    const message = {
      ...baseMsgUnlinkChainAccountResponse,
    } as MsgUnlinkChainAccountResponse
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
