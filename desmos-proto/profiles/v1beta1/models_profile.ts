/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Any } from '../../../google/protobuf/any'
import { Timestamp } from '../../../google/protobuf/timestamp'

export const protobufPackage = 'desmos.profiles.v1beta1'

/**
 * Profile represents a generic first on Desmos, containing the information of a
 * single user
 */
export interface Profile {
  /** Account represents the base Cosmos account associated with this profile */
  account?: Any
  /** DTag represents the unique tag of this profile */
  dtag: string
  /** Nickname contains the custom human readable name of the profile */
  nickname: string
  /** Bio contains the biography of the profile */
  bio: string
  /** Pictures contains the data about the pictures associated with he profile */
  pictures?: Pictures
  /** CreationTime represents the time in which the profile has been created */
  creationDate?: Date
}

/** Pictures contains the data of a user profile's related pictures */
export interface Pictures {
  /** Profile contains the URL to the profile picture */
  profile: string
  /** Cover contains the URL to the cover picture */
  cover: string
}

const baseProfile: object = { dtag: '', nickname: '', bio: '' }

export const Profile = {
  encode(message: Profile, writer: Writer = Writer.create()): Writer {
    if (message.account !== undefined) {
      Any.encode(message.account, writer.uint32(10).fork()).ldelim()
    }
    if (message.dtag !== '') {
      writer.uint32(18).string(message.dtag)
    }
    if (message.nickname !== '') {
      writer.uint32(26).string(message.nickname)
    }
    if (message.bio !== '') {
      writer.uint32(34).string(message.bio)
    }
    if (message.pictures !== undefined) {
      Pictures.encode(message.pictures, writer.uint32(42).fork()).ldelim()
    }
    if (message.creationDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.creationDate),
        writer.uint32(50).fork()
      ).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Profile {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseProfile } as Profile
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.account = Any.decode(reader, reader.uint32())
          break
        case 2:
          message.dtag = reader.string()
          break
        case 3:
          message.nickname = reader.string()
          break
        case 4:
          message.bio = reader.string()
          break
        case 5:
          message.pictures = Pictures.decode(reader, reader.uint32())
          break
        case 6:
          message.creationDate = fromTimestamp(
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

  fromJSON(object: any): Profile {
    const message = { ...baseProfile } as Profile
    if (object.account !== undefined && object.account !== null) {
      message.account = Any.fromJSON(object.account)
    } else {
      message.account = undefined
    }
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
    if (object.pictures !== undefined && object.pictures !== null) {
      message.pictures = Pictures.fromJSON(object.pictures)
    } else {
      message.pictures = undefined
    }
    if (object.creationDate !== undefined && object.creationDate !== null) {
      message.creationDate = fromJsonTimestamp(object.creationDate)
    } else {
      message.creationDate = undefined
    }
    return message
  },

  toJSON(message: Profile): unknown {
    const obj: any = {}
    message.account !== undefined &&
      (obj.account = message.account ? Any.toJSON(message.account) : undefined)
    message.dtag !== undefined && (obj.dtag = message.dtag)
    message.nickname !== undefined && (obj.nickname = message.nickname)
    message.bio !== undefined && (obj.bio = message.bio)
    message.pictures !== undefined &&
      (obj.pictures = message.pictures
        ? Pictures.toJSON(message.pictures)
        : undefined)
    message.creationDate !== undefined &&
      (obj.creationDate = message.creationDate.toISOString())
    return obj
  },

  fromPartial(object: DeepPartial<Profile>): Profile {
    const message = { ...baseProfile } as Profile
    if (object.account !== undefined && object.account !== null) {
      message.account = Any.fromPartial(object.account)
    } else {
      message.account = undefined
    }
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
    if (object.pictures !== undefined && object.pictures !== null) {
      message.pictures = Pictures.fromPartial(object.pictures)
    } else {
      message.pictures = undefined
    }
    if (object.creationDate !== undefined && object.creationDate !== null) {
      message.creationDate = object.creationDate
    } else {
      message.creationDate = undefined
    }
    return message
  },
}

const basePictures: object = { profile: '', cover: '' }

export const Pictures = {
  encode(message: Pictures, writer: Writer = Writer.create()): Writer {
    if (message.profile !== '') {
      writer.uint32(10).string(message.profile)
    }
    if (message.cover !== '') {
      writer.uint32(18).string(message.cover)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Pictures {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePictures } as Pictures
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.profile = reader.string()
          break
        case 2:
          message.cover = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Pictures {
    const message = { ...basePictures } as Pictures
    if (object.profile !== undefined && object.profile !== null) {
      message.profile = String(object.profile)
    } else {
      message.profile = ''
    }
    if (object.cover !== undefined && object.cover !== null) {
      message.cover = String(object.cover)
    } else {
      message.cover = ''
    }
    return message
  },

  toJSON(message: Pictures): unknown {
    const obj: any = {}
    message.profile !== undefined && (obj.profile = message.profile)
    message.cover !== undefined && (obj.cover = message.cover)
    return obj
  },

  fromPartial(object: DeepPartial<Pictures>): Pictures {
    const message = { ...basePictures } as Pictures
    if (object.profile !== undefined && object.profile !== null) {
      message.profile = object.profile
    } else {
      message.profile = ''
    }
    if (object.cover !== undefined && object.cover !== null) {
      message.cover = object.cover
    } else {
      message.cover = ''
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
