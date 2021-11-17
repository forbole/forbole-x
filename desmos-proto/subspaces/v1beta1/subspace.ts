/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Timestamp } from '../../../google/protobuf/timestamp'

export const protobufPackage = 'desmos.subspaces.v1beta1'

/** SubspaceType contains all the possible subspace types */
export enum SubspaceType {
  /**
   * SUBSPACE_TYPE_UNSPECIFIED - SubspaceTypeUnspecified identifies an unspecified type of subspace (used in
   * errors)
   */
  SUBSPACE_TYPE_UNSPECIFIED = 0,
  /**
   * SUBSPACE_TYPE_OPEN - SubspaceTypeOpen identifies that users can interact inside the subspace
   * without the need to being registered in it
   */
  SUBSPACE_TYPE_OPEN = 1,
  /**
   * SUBSPACE_TYPE_CLOSED - SubspaceTypeClosed identifies that users can't interact inside the subspace
   * without being registered in it
   */
  SUBSPACE_TYPE_CLOSED = 2,
  UNRECOGNIZED = -1,
}

export function subspaceTypeFromJSON(object: any): SubspaceType {
  switch (object) {
    case 0:
    case 'SUBSPACE_TYPE_UNSPECIFIED':
      return SubspaceType.SUBSPACE_TYPE_UNSPECIFIED
    case 1:
    case 'SUBSPACE_TYPE_OPEN':
      return SubspaceType.SUBSPACE_TYPE_OPEN
    case 2:
    case 'SUBSPACE_TYPE_CLOSED':
      return SubspaceType.SUBSPACE_TYPE_CLOSED
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SubspaceType.UNRECOGNIZED
  }
}

export function subspaceTypeToJSON(object: SubspaceType): string {
  switch (object) {
    case SubspaceType.SUBSPACE_TYPE_UNSPECIFIED:
      return 'SUBSPACE_TYPE_UNSPECIFIED'
    case SubspaceType.SUBSPACE_TYPE_OPEN:
      return 'SUBSPACE_TYPE_OPEN'
    case SubspaceType.SUBSPACE_TYPE_CLOSED:
      return 'SUBSPACE_TYPE_CLOSED'
    default:
      return 'UNKNOWN'
  }
}

/** Subspace contains all the data of a Desmos subspace */
export interface Subspace {
  /** unique SHA-256 string that identifies the subspace */
  id: string
  /** human readable name of the subspace */
  name: string
  /** the address of the user that owns the subspace */
  owner: string
  /** the address of the subspace creator */
  creator: string
  /** the creation time of the subspace */
  creationTime?: Date
  /** the type of the subspace that indicates if it need registration or not */
  type: SubspaceType
}

const baseSubspace: object = {
  id: '',
  name: '',
  owner: '',
  creator: '',
  type: 0,
}

export const Subspace = {
  encode(message: Subspace, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.owner !== '') {
      writer.uint32(26).string(message.owner)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.creationTime),
        writer.uint32(42).fork()
      ).ldelim()
    }
    if (message.type !== 0) {
      writer.uint32(48).int32(message.type)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Subspace {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseSubspace } as Subspace
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.owner = reader.string()
          break
        case 4:
          message.creator = reader.string()
          break
        case 5:
          message.creationTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          )
          break
        case 6:
          message.type = reader.int32() as any
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Subspace {
    const message = { ...baseSubspace } as Subspace
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.creationTime !== undefined && object.creationTime !== null) {
      message.creationTime = fromJsonTimestamp(object.creationTime)
    } else {
      message.creationTime = undefined
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = subspaceTypeFromJSON(object.type)
    } else {
      message.type = 0
    }
    return message
  },

  toJSON(message: Subspace): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.owner !== undefined && (obj.owner = message.owner)
    message.creator !== undefined && (obj.creator = message.creator)
    message.creationTime !== undefined &&
      (obj.creationTime = message.creationTime.toISOString())
    message.type !== undefined && (obj.type = subspaceTypeToJSON(message.type))
    return obj
  },

  fromPartial(object: DeepPartial<Subspace>): Subspace {
    const message = { ...baseSubspace } as Subspace
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.creationTime !== undefined && object.creationTime !== null) {
      message.creationTime = object.creationTime
    } else {
      message.creationTime = undefined
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type
    } else {
      message.type = 0
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
