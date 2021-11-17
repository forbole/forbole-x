/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Subspace } from '../../../desmos/subspaces/v1beta1/subspace'

export const protobufPackage = 'desmos.subspaces.v1beta1'

/** GenesisState contains the data of the genesis state for the subspaces module */
export interface GenesisState {
  subspaces: Subspace[]
  admins: UsersEntry[]
  registeredUsers: UsersEntry[]
  bannedUsers: UsersEntry[]
}

/**
 * UsersEntry contains the data of a slice of users associated to a subspace
 * with a specific id
 */
export interface UsersEntry {
  subspaceId: string
  users: string[]
}

const baseGenesisState: object = {}

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.subspaces) {
      Subspace.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.admins) {
      UsersEntry.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.registeredUsers) {
      UsersEntry.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    for (const v of message.bannedUsers) {
      UsersEntry.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.subspaces = []
    message.admins = []
    message.registeredUsers = []
    message.bannedUsers = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaces.push(Subspace.decode(reader, reader.uint32()))
          break
        case 2:
          message.admins.push(UsersEntry.decode(reader, reader.uint32()))
          break
        case 3:
          message.registeredUsers.push(
            UsersEntry.decode(reader, reader.uint32())
          )
          break
        case 4:
          message.bannedUsers.push(UsersEntry.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.subspaces = []
    message.admins = []
    message.registeredUsers = []
    message.bannedUsers = []
    if (object.subspaces !== undefined && object.subspaces !== null) {
      for (const e of object.subspaces) {
        message.subspaces.push(Subspace.fromJSON(e))
      }
    }
    if (object.admins !== undefined && object.admins !== null) {
      for (const e of object.admins) {
        message.admins.push(UsersEntry.fromJSON(e))
      }
    }
    if (
      object.registeredUsers !== undefined &&
      object.registeredUsers !== null
    ) {
      for (const e of object.registeredUsers) {
        message.registeredUsers.push(UsersEntry.fromJSON(e))
      }
    }
    if (object.bannedUsers !== undefined && object.bannedUsers !== null) {
      for (const e of object.bannedUsers) {
        message.bannedUsers.push(UsersEntry.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    if (message.subspaces) {
      obj.subspaces = message.subspaces.map((e) =>
        e ? Subspace.toJSON(e) : undefined
      )
    } else {
      obj.subspaces = []
    }
    if (message.admins) {
      obj.admins = message.admins.map((e) =>
        e ? UsersEntry.toJSON(e) : undefined
      )
    } else {
      obj.admins = []
    }
    if (message.registeredUsers) {
      obj.registeredUsers = message.registeredUsers.map((e) =>
        e ? UsersEntry.toJSON(e) : undefined
      )
    } else {
      obj.registeredUsers = []
    }
    if (message.bannedUsers) {
      obj.bannedUsers = message.bannedUsers.map((e) =>
        e ? UsersEntry.toJSON(e) : undefined
      )
    } else {
      obj.bannedUsers = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.subspaces = []
    message.admins = []
    message.registeredUsers = []
    message.bannedUsers = []
    if (object.subspaces !== undefined && object.subspaces !== null) {
      for (const e of object.subspaces) {
        message.subspaces.push(Subspace.fromPartial(e))
      }
    }
    if (object.admins !== undefined && object.admins !== null) {
      for (const e of object.admins) {
        message.admins.push(UsersEntry.fromPartial(e))
      }
    }
    if (
      object.registeredUsers !== undefined &&
      object.registeredUsers !== null
    ) {
      for (const e of object.registeredUsers) {
        message.registeredUsers.push(UsersEntry.fromPartial(e))
      }
    }
    if (object.bannedUsers !== undefined && object.bannedUsers !== null) {
      for (const e of object.bannedUsers) {
        message.bannedUsers.push(UsersEntry.fromPartial(e))
      }
    }
    return message
  },
}

const baseUsersEntry: object = { subspaceId: '', users: '' }

export const UsersEntry = {
  encode(message: UsersEntry, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    for (const v of message.users) {
      writer.uint32(18).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UsersEntry {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUsersEntry } as UsersEntry
    message.users = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.users.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UsersEntry {
    const message = { ...baseUsersEntry } as UsersEntry
    message.users = []
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(String(e))
      }
    }
    return message
  },

  toJSON(message: UsersEntry): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    if (message.users) {
      obj.users = message.users.map((e) => e)
    } else {
      obj.users = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<UsersEntry>): UsersEntry {
    const message = { ...baseUsersEntry } as UsersEntry
    message.users = []
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(e)
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
