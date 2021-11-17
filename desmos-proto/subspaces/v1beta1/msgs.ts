/* eslint-disable */
import { util, configure, Reader, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  SubspaceType,
  subspaceTypeFromJSON,
  subspaceTypeToJSON,
} from '../../../desmos/subspaces/v1beta1/subspace'

export const protobufPackage = 'desmos.subspaces.v1beta1'

/** MsgCreateSubspace represents the message used to create a subspace */
export interface MsgCreateSubspace {
  id: string
  name: string
  subspaceType: SubspaceType
  creator: string
}

/** MsgCreateSubspaceResponse defines the Msg/CreateSubspace response type */
export interface MsgCreateSubspaceResponse {}

/** MsgEditSubspace represents the message used to edit a subspace fields */
export interface MsgEditSubspace {
  id: string
  owner: string
  name: string
  subspaceType: SubspaceType
  editor: string
}

/** MsgEditSubspaceResponse defines the Msg/EditSubspace response type */
export interface MsgEditSubspaceResponse {}

/**
 * MsgAddAdmin represents the message used to add an admin to a specific
 * subspace
 */
export interface MsgAddAdmin {
  subspaceId: string
  admin: string
  owner: string
}

/** MsgAddAdminResponse defines the Msg/AddAdmin response type */
export interface MsgAddAdminResponse {}

/**
 * MsgRemoveAdmin represents the message used to remove an admin from a specific
 * subspace
 */
export interface MsgRemoveAdmin {
  subspaceId: string
  admin: string
  owner: string
}

/** MsgRemoveAdminResponse defines the Msg/RemoveAdmin response type */
export interface MsgRemoveAdminResponse {}

/**
 * MsgRegisterUser represents the message used to register a user inside a
 * specific subspace
 */
export interface MsgRegisterUser {
  subspaceId: string
  user: string
  admin: string
}

/** MsgRegisterUserResponse defines the Msg/MsgRegisterUser response type */
export interface MsgRegisterUserResponse {}

/**
 * MsgUnregisterUser represent the message used to unregister a user inside a
 * specific subspace
 */
export interface MsgUnregisterUser {
  subspaceId: string
  user: string
  admin: string
}

/** MsgUnregisterUserResponse defines the Msg/MsgUnregisterUser response type */
export interface MsgUnregisterUserResponse {}

/**
 * MsgBanUser represents the message used to ban a user inside a specific
 * subspace
 */
export interface MsgBanUser {
  subspaceId: string
  user: string
  admin: string
}

/** MsgBanUserResponse defines the Msg/MsgBanUser response type */
export interface MsgBanUserResponse {}

/**
 * MsgUnbanUser represents the message used to unban a user inside a specific
 * subspace
 */
export interface MsgUnbanUser {
  subspaceId: string
  user: string
  admin: string
}

/** MsgUnbanUserResponse defines the Msg/MsgUnbanUser response type */
export interface MsgUnbanUserResponse {}

const baseMsgCreateSubspace: object = {
  id: '',
  name: '',
  subspaceType: 0,
  creator: '',
}

export const MsgCreateSubspace = {
  encode(message: MsgCreateSubspace, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.subspaceType !== 0) {
      writer.uint32(24).int32(message.subspaceType)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateSubspace {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateSubspace } as MsgCreateSubspace
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
          message.subspaceType = reader.int32() as any
          break
        case 4:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateSubspace {
    const message = { ...baseMsgCreateSubspace } as MsgCreateSubspace
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
    if (object.subspaceType !== undefined && object.subspaceType !== null) {
      message.subspaceType = subspaceTypeFromJSON(object.subspaceType)
    } else {
      message.subspaceType = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgCreateSubspace): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.subspaceType !== undefined &&
      (obj.subspaceType = subspaceTypeToJSON(message.subspaceType))
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateSubspace>): MsgCreateSubspace {
    const message = { ...baseMsgCreateSubspace } as MsgCreateSubspace
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
    if (object.subspaceType !== undefined && object.subspaceType !== null) {
      message.subspaceType = object.subspaceType
    } else {
      message.subspaceType = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  },
}

const baseMsgCreateSubspaceResponse: object = {}

export const MsgCreateSubspaceResponse = {
  encode(
    _: MsgCreateSubspaceResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateSubspaceResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgCreateSubspaceResponse,
    } as MsgCreateSubspaceResponse
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

  fromJSON(_: any): MsgCreateSubspaceResponse {
    const message = {
      ...baseMsgCreateSubspaceResponse,
    } as MsgCreateSubspaceResponse
    return message
  },

  toJSON(_: MsgCreateSubspaceResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgCreateSubspaceResponse>
  ): MsgCreateSubspaceResponse {
    const message = {
      ...baseMsgCreateSubspaceResponse,
    } as MsgCreateSubspaceResponse
    return message
  },
}

const baseMsgEditSubspace: object = {
  id: '',
  owner: '',
  name: '',
  subspaceType: 0,
  editor: '',
}

export const MsgEditSubspace = {
  encode(message: MsgEditSubspace, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    if (message.subspaceType !== 0) {
      writer.uint32(32).int32(message.subspaceType)
    }
    if (message.editor !== '') {
      writer.uint32(42).string(message.editor)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditSubspace {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgEditSubspace } as MsgEditSubspace
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        case 4:
          message.subspaceType = reader.int32() as any
          break
        case 5:
          message.editor = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgEditSubspace {
    const message = { ...baseMsgEditSubspace } as MsgEditSubspace
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.subspaceType !== undefined && object.subspaceType !== null) {
      message.subspaceType = subspaceTypeFromJSON(object.subspaceType)
    } else {
      message.subspaceType = 0
    }
    if (object.editor !== undefined && object.editor !== null) {
      message.editor = String(object.editor)
    } else {
      message.editor = ''
    }
    return message
  },

  toJSON(message: MsgEditSubspace): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.owner !== undefined && (obj.owner = message.owner)
    message.name !== undefined && (obj.name = message.name)
    message.subspaceType !== undefined &&
      (obj.subspaceType = subspaceTypeToJSON(message.subspaceType))
    message.editor !== undefined && (obj.editor = message.editor)
    return obj
  },

  fromPartial(object: DeepPartial<MsgEditSubspace>): MsgEditSubspace {
    const message = { ...baseMsgEditSubspace } as MsgEditSubspace
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.subspaceType !== undefined && object.subspaceType !== null) {
      message.subspaceType = object.subspaceType
    } else {
      message.subspaceType = 0
    }
    if (object.editor !== undefined && object.editor !== null) {
      message.editor = object.editor
    } else {
      message.editor = ''
    }
    return message
  },
}

const baseMsgEditSubspaceResponse: object = {}

export const MsgEditSubspaceResponse = {
  encode(_: MsgEditSubspaceResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditSubspaceResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgEditSubspaceResponse,
    } as MsgEditSubspaceResponse
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

  fromJSON(_: any): MsgEditSubspaceResponse {
    const message = {
      ...baseMsgEditSubspaceResponse,
    } as MsgEditSubspaceResponse
    return message
  },

  toJSON(_: MsgEditSubspaceResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgEditSubspaceResponse>
  ): MsgEditSubspaceResponse {
    const message = {
      ...baseMsgEditSubspaceResponse,
    } as MsgEditSubspaceResponse
    return message
  },
}

const baseMsgAddAdmin: object = { subspaceId: '', admin: '', owner: '' }

export const MsgAddAdmin = {
  encode(message: MsgAddAdmin, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.admin !== '') {
      writer.uint32(18).string(message.admin)
    }
    if (message.owner !== '') {
      writer.uint32(26).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddAdmin {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.admin = reader.string()
          break
        case 3:
          message.owner = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddAdmin {
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: MsgAddAdmin): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.admin !== undefined && (obj.admin = message.admin)
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddAdmin>): MsgAddAdmin {
    const message = { ...baseMsgAddAdmin } as MsgAddAdmin
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    return message
  },
}

const baseMsgAddAdminResponse: object = {}

export const MsgAddAdminResponse = {
  encode(_: MsgAddAdminResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddAdminResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse
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

  fromJSON(_: any): MsgAddAdminResponse {
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse
    return message
  },

  toJSON(_: MsgAddAdminResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgAddAdminResponse>): MsgAddAdminResponse {
    const message = { ...baseMsgAddAdminResponse } as MsgAddAdminResponse
    return message
  },
}

const baseMsgRemoveAdmin: object = { subspaceId: '', admin: '', owner: '' }

export const MsgRemoveAdmin = {
  encode(message: MsgRemoveAdmin, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.admin !== '') {
      writer.uint32(18).string(message.admin)
    }
    if (message.owner !== '') {
      writer.uint32(26).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveAdmin {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemoveAdmin } as MsgRemoveAdmin
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.admin = reader.string()
          break
        case 3:
          message.owner = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRemoveAdmin {
    const message = { ...baseMsgRemoveAdmin } as MsgRemoveAdmin
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: MsgRemoveAdmin): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.admin !== undefined && (obj.admin = message.admin)
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRemoveAdmin>): MsgRemoveAdmin {
    const message = { ...baseMsgRemoveAdmin } as MsgRemoveAdmin
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    return message
  },
}

const baseMsgRemoveAdminResponse: object = {}

export const MsgRemoveAdminResponse = {
  encode(_: MsgRemoveAdminResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveAdminResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemoveAdminResponse } as MsgRemoveAdminResponse
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

  fromJSON(_: any): MsgRemoveAdminResponse {
    const message = { ...baseMsgRemoveAdminResponse } as MsgRemoveAdminResponse
    return message
  },

  toJSON(_: MsgRemoveAdminResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgRemoveAdminResponse>): MsgRemoveAdminResponse {
    const message = { ...baseMsgRemoveAdminResponse } as MsgRemoveAdminResponse
    return message
  },
}

const baseMsgRegisterUser: object = { subspaceId: '', user: '', admin: '' }

export const MsgRegisterUser = {
  encode(message: MsgRegisterUser, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.user !== '') {
      writer.uint32(18).string(message.user)
    }
    if (message.admin !== '') {
      writer.uint32(26).string(message.admin)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRegisterUser {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRegisterUser } as MsgRegisterUser
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.user = reader.string()
          break
        case 3:
          message.admin = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRegisterUser {
    const message = { ...baseMsgRegisterUser } as MsgRegisterUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    return message
  },

  toJSON(message: MsgRegisterUser): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.user !== undefined && (obj.user = message.user)
    message.admin !== undefined && (obj.admin = message.admin)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRegisterUser>): MsgRegisterUser {
    const message = { ...baseMsgRegisterUser } as MsgRegisterUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    return message
  },
}

const baseMsgRegisterUserResponse: object = {}

export const MsgRegisterUserResponse = {
  encode(_: MsgRegisterUserResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRegisterUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgRegisterUserResponse,
    } as MsgRegisterUserResponse
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

  fromJSON(_: any): MsgRegisterUserResponse {
    const message = {
      ...baseMsgRegisterUserResponse,
    } as MsgRegisterUserResponse
    return message
  },

  toJSON(_: MsgRegisterUserResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgRegisterUserResponse>
  ): MsgRegisterUserResponse {
    const message = {
      ...baseMsgRegisterUserResponse,
    } as MsgRegisterUserResponse
    return message
  },
}

const baseMsgUnregisterUser: object = { subspaceId: '', user: '', admin: '' }

export const MsgUnregisterUser = {
  encode(message: MsgUnregisterUser, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.user !== '') {
      writer.uint32(18).string(message.user)
    }
    if (message.admin !== '') {
      writer.uint32(26).string(message.admin)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnregisterUser {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnregisterUser } as MsgUnregisterUser
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.user = reader.string()
          break
        case 3:
          message.admin = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUnregisterUser {
    const message = { ...baseMsgUnregisterUser } as MsgUnregisterUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    return message
  },

  toJSON(message: MsgUnregisterUser): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.user !== undefined && (obj.user = message.user)
    message.admin !== undefined && (obj.admin = message.admin)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUnregisterUser>): MsgUnregisterUser {
    const message = { ...baseMsgUnregisterUser } as MsgUnregisterUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    return message
  },
}

const baseMsgUnregisterUserResponse: object = {}

export const MsgUnregisterUserResponse = {
  encode(
    _: MsgUnregisterUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUnregisterUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgUnregisterUserResponse,
    } as MsgUnregisterUserResponse
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

  fromJSON(_: any): MsgUnregisterUserResponse {
    const message = {
      ...baseMsgUnregisterUserResponse,
    } as MsgUnregisterUserResponse
    return message
  },

  toJSON(_: MsgUnregisterUserResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgUnregisterUserResponse>
  ): MsgUnregisterUserResponse {
    const message = {
      ...baseMsgUnregisterUserResponse,
    } as MsgUnregisterUserResponse
    return message
  },
}

const baseMsgBanUser: object = { subspaceId: '', user: '', admin: '' }

export const MsgBanUser = {
  encode(message: MsgBanUser, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.user !== '') {
      writer.uint32(18).string(message.user)
    }
    if (message.admin !== '') {
      writer.uint32(26).string(message.admin)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBanUser {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBanUser } as MsgBanUser
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.user = reader.string()
          break
        case 3:
          message.admin = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBanUser {
    const message = { ...baseMsgBanUser } as MsgBanUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    return message
  },

  toJSON(message: MsgBanUser): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.user !== undefined && (obj.user = message.user)
    message.admin !== undefined && (obj.admin = message.admin)
    return obj
  },

  fromPartial(object: DeepPartial<MsgBanUser>): MsgBanUser {
    const message = { ...baseMsgBanUser } as MsgBanUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    return message
  },
}

const baseMsgBanUserResponse: object = {}

export const MsgBanUserResponse = {
  encode(_: MsgBanUserResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBanUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBanUserResponse } as MsgBanUserResponse
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

  fromJSON(_: any): MsgBanUserResponse {
    const message = { ...baseMsgBanUserResponse } as MsgBanUserResponse
    return message
  },

  toJSON(_: MsgBanUserResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgBanUserResponse>): MsgBanUserResponse {
    const message = { ...baseMsgBanUserResponse } as MsgBanUserResponse
    return message
  },
}

const baseMsgUnbanUser: object = { subspaceId: '', user: '', admin: '' }

export const MsgUnbanUser = {
  encode(message: MsgUnbanUser, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.user !== '') {
      writer.uint32(18).string(message.user)
    }
    if (message.admin !== '') {
      writer.uint32(26).string(message.admin)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnbanUser {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnbanUser } as MsgUnbanUser
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.user = reader.string()
          break
        case 3:
          message.admin = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUnbanUser {
    const message = { ...baseMsgUnbanUser } as MsgUnbanUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin)
    } else {
      message.admin = ''
    }
    return message
  },

  toJSON(message: MsgUnbanUser): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.user !== undefined && (obj.user = message.user)
    message.admin !== undefined && (obj.admin = message.admin)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUnbanUser>): MsgUnbanUser {
    const message = { ...baseMsgUnbanUser } as MsgUnbanUser
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin
    } else {
      message.admin = ''
    }
    return message
  },
}

const baseMsgUnbanUserResponse: object = {}

export const MsgUnbanUserResponse = {
  encode(_: MsgUnbanUserResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUnbanUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUnbanUserResponse } as MsgUnbanUserResponse
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

  fromJSON(_: any): MsgUnbanUserResponse {
    const message = { ...baseMsgUnbanUserResponse } as MsgUnbanUserResponse
    return message
  },

  toJSON(_: MsgUnbanUserResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgUnbanUserResponse>): MsgUnbanUserResponse {
    const message = { ...baseMsgUnbanUserResponse } as MsgUnbanUserResponse
    return message
  },
}

/** Msg defines subspaces Msg service. */
export interface Msg {
  /** CreateSubspace defines the method to create a subspace */
  CreateSubspace(request: MsgCreateSubspace): Promise<MsgCreateSubspaceResponse>
  /** EditSubspace defines the method to edit a subspace fields */
  EditSubspace(request: MsgEditSubspace): Promise<MsgEditSubspaceResponse>
  /** AddAdmin defines the method to add a new admin to the subspace */
  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>
  /** RemoveAdmin defines the method to remove an admin from a specific subspace */
  RemoveAdmin(request: MsgRemoveAdmin): Promise<MsgRemoveAdminResponse>
  /**
   * RegisterUser defines the method to let user posts inside a specific
   * subspace
   */
  RegisterUser(request: MsgRegisterUser): Promise<MsgRegisterUserResponse>
  /** UnregisterUser defines the method to unregister a user from a subspace */
  UnregisterUser(request: MsgUnregisterUser): Promise<MsgUnregisterUserResponse>
  /** BanUser defines the method to ban a user inside a specific subspace */
  BanUser(request: MsgBanUser): Promise<MsgBanUserResponse>
  /** UnbanUser defines the method to unban a user inside a specific subspace */
  UnbanUser(request: MsgUnbanUser): Promise<MsgUnbanUserResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.CreateSubspace = this.CreateSubspace.bind(this)
    this.EditSubspace = this.EditSubspace.bind(this)
    this.AddAdmin = this.AddAdmin.bind(this)
    this.RemoveAdmin = this.RemoveAdmin.bind(this)
    this.RegisterUser = this.RegisterUser.bind(this)
    this.UnregisterUser = this.UnregisterUser.bind(this)
    this.BanUser = this.BanUser.bind(this)
    this.UnbanUser = this.UnbanUser.bind(this)
  }
  CreateSubspace(
    request: MsgCreateSubspace
  ): Promise<MsgCreateSubspaceResponse> {
    const data = MsgCreateSubspace.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'CreateSubspace',
      data
    )
    return promise.then((data) =>
      MsgCreateSubspaceResponse.decode(new Reader(data))
    )
  }

  EditSubspace(request: MsgEditSubspace): Promise<MsgEditSubspaceResponse> {
    const data = MsgEditSubspace.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'EditSubspace',
      data
    )
    return promise.then((data) =>
      MsgEditSubspaceResponse.decode(new Reader(data))
    )
  }

  AddAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse> {
    const data = MsgAddAdmin.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'AddAdmin',
      data
    )
    return promise.then((data) => MsgAddAdminResponse.decode(new Reader(data)))
  }

  RemoveAdmin(request: MsgRemoveAdmin): Promise<MsgRemoveAdminResponse> {
    const data = MsgRemoveAdmin.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'RemoveAdmin',
      data
    )
    return promise.then((data) =>
      MsgRemoveAdminResponse.decode(new Reader(data))
    )
  }

  RegisterUser(request: MsgRegisterUser): Promise<MsgRegisterUserResponse> {
    const data = MsgRegisterUser.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'RegisterUser',
      data
    )
    return promise.then((data) =>
      MsgRegisterUserResponse.decode(new Reader(data))
    )
  }

  UnregisterUser(
    request: MsgUnregisterUser
  ): Promise<MsgUnregisterUserResponse> {
    const data = MsgUnregisterUser.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'UnregisterUser',
      data
    )
    return promise.then((data) =>
      MsgUnregisterUserResponse.decode(new Reader(data))
    )
  }

  BanUser(request: MsgBanUser): Promise<MsgBanUserResponse> {
    const data = MsgBanUser.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'BanUser',
      data
    )
    return promise.then((data) => MsgBanUserResponse.decode(new Reader(data)))
  }

  UnbanUser(request: MsgUnbanUser): Promise<MsgUnbanUserResponse> {
    const data = MsgUnbanUser.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.subspaces.v1beta1.Msg',
      'UnbanUser',
      data
    )
    return promise.then((data) => MsgUnbanUserResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>
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
