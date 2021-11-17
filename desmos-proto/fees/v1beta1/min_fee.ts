/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Coin } from '../../../cosmos/base/v1beta1/coin'

export const protobufPackage = 'desmos.fees.v1beta1'

/**
 * MinFee contains the minimum amount of coins that should be paid as a fee for
 * each message of the specific type sent
 */
export interface MinFee {
  messageType: string
  amount: Coin[]
}

const baseMinFee: object = { messageType: '' }

export const MinFee = {
  encode(message: MinFee, writer: Writer = Writer.create()): Writer {
    if (message.messageType !== '') {
      writer.uint32(10).string(message.messageType)
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MinFee {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMinFee } as MinFee
    message.amount = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.messageType = reader.string()
          break
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MinFee {
    const message = { ...baseMinFee } as MinFee
    message.amount = []
    if (object.messageType !== undefined && object.messageType !== null) {
      message.messageType = String(object.messageType)
    } else {
      message.messageType = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: MinFee): unknown {
    const obj: any = {}
    message.messageType !== undefined && (obj.messageType = message.messageType)
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.amount = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<MinFee>): MinFee {
    const message = { ...baseMinFee } as MinFee
    message.amount = []
    if (object.messageType !== undefined && object.messageType !== null) {
      message.messageType = object.messageType
    } else {
      message.messageType = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromPartial(e))
      }
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
