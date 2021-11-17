/* eslint-disable */
import { util, configure, Reader, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  CommentsState,
  Attribute,
  Attachment,
  commentsStateFromJSON,
  commentsStateToJSON,
} from '../../../desmos/posts/v1beta1/posts'
import { Poll } from '../../../desmos/posts/v1beta1/polls'

export const protobufPackage = 'desmos.posts.v1beta1'

/** MsgCreatePost represents the message to be used to create a post. */
export interface MsgCreatePost {
  parentId: string
  message: string
  commentsState: CommentsState
  subspace: string
  additionalAttributes: Attribute[]
  creator: string
  attachments: Attachment[]
  poll?: Poll
}

/** MsgCreatePostResponse defines the Msg/CreatePost response type. */
export interface MsgCreatePostResponse {}

/** MsgEditPost represents the message used to edit a post. */
export interface MsgEditPost {
  postId: string
  message: string
  commentsState: CommentsState
  attachments: Attachment[]
  poll?: Poll
  editor: string
}

/** MsgEditPostResponse defines the Msg/EditPost response type. */
export interface MsgEditPostResponse {}

/**
 * MsgAddPostReaction represents the message to be used to add a reaction to a
 * post
 */
export interface MsgAddPostReaction {
  postId: string
  reaction: string
  user: string
}

/** MsgAddPostReactionResponse defines the Msg/AddReaction response type. */
export interface MsgAddPostReactionResponse {}

/**
 * MsgRemovePostReaction represents the message to be used when wanting to
 * remove an existing reaction from a specific user having a specific value
 */
export interface MsgRemovePostReaction {
  postId: string
  reaction: string
  user: string
}

/**
 * MsgRemovePostReactionResponse defines the Msg/RemovePostReaction response
 * type.
 */
export interface MsgRemovePostReactionResponse {}

/** MsgAnswerPoll represents the message to be used when wanting to answer a poll */
export interface MsgAnswerPoll {
  postId: string
  answers: string[]
  answerer: string
}

/** MsgAnswerPollResponse defines the Msg/AnswerPoll response type. */
export interface MsgAnswerPollResponse {}

/**
 * MsgRegisterReaction represents the message that must be used when wanting
 * to register a new reaction shortCode and the associated value
 */
export interface MsgRegisterReaction {
  shortCode: string
  value: string
  subspace: string
  creator: string
}

/** MsgRegisterReactionResponse defines the Msg/RegisterReaction response type. */
export interface MsgRegisterReactionResponse {}

/** MsgReportPost represents a message to create a port report. */
export interface MsgReportPost {
  postId: string
  reportType: string
  message: string
  user: string
}

/** MsgReportPostResponse defines the Msg/ReportPost response type. */
export interface MsgReportPostResponse {}

const baseMsgCreatePost: object = {
  parentId: '',
  message: '',
  commentsState: 0,
  subspace: '',
  creator: '',
}

export const MsgCreatePost = {
  encode(message: MsgCreatePost, writer: Writer = Writer.create()): Writer {
    if (message.parentId !== '') {
      writer.uint32(10).string(message.parentId)
    }
    if (message.message !== '') {
      writer.uint32(18).string(message.message)
    }
    if (message.commentsState !== 0) {
      writer.uint32(24).int32(message.commentsState)
    }
    if (message.subspace !== '') {
      writer.uint32(34).string(message.subspace)
    }
    for (const v of message.additionalAttributes) {
      Attribute.encode(v!, writer.uint32(42).fork()).ldelim()
    }
    if (message.creator !== '') {
      writer.uint32(50).string(message.creator)
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(58).fork()).ldelim()
    }
    if (message.poll !== undefined) {
      Poll.encode(message.poll, writer.uint32(66).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePost {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreatePost } as MsgCreatePost
    message.additionalAttributes = []
    message.attachments = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.parentId = reader.string()
          break
        case 2:
          message.message = reader.string()
          break
        case 3:
          message.commentsState = reader.int32() as any
          break
        case 4:
          message.subspace = reader.string()
          break
        case 5:
          message.additionalAttributes.push(
            Attribute.decode(reader, reader.uint32())
          )
          break
        case 6:
          message.creator = reader.string()
          break
        case 7:
          message.attachments.push(Attachment.decode(reader, reader.uint32()))
          break
        case 8:
          message.poll = Poll.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreatePost {
    const message = { ...baseMsgCreatePost } as MsgCreatePost
    message.additionalAttributes = []
    message.attachments = []
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = String(object.parentId)
    } else {
      message.parentId = ''
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message)
    } else {
      message.message = ''
    }
    if (object.commentsState !== undefined && object.commentsState !== null) {
      message.commentsState = commentsStateFromJSON(object.commentsState)
    } else {
      message.commentsState = 0
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    if (
      object.additionalAttributes !== undefined &&
      object.additionalAttributes !== null
    ) {
      for (const e of object.additionalAttributes) {
        message.additionalAttributes.push(Attribute.fromJSON(e))
      }
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(Attachment.fromJSON(e))
      }
    }
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = Poll.fromJSON(object.poll)
    } else {
      message.poll = undefined
    }
    return message
  },

  toJSON(message: MsgCreatePost): unknown {
    const obj: any = {}
    message.parentId !== undefined && (obj.parentId = message.parentId)
    message.message !== undefined && (obj.message = message.message)
    message.commentsState !== undefined &&
      (obj.commentsState = commentsStateToJSON(message.commentsState))
    message.subspace !== undefined && (obj.subspace = message.subspace)
    if (message.additionalAttributes) {
      obj.additionalAttributes = message.additionalAttributes.map((e) =>
        e ? Attribute.toJSON(e) : undefined
      )
    } else {
      obj.additionalAttributes = []
    }
    message.creator !== undefined && (obj.creator = message.creator)
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) =>
        e ? Attachment.toJSON(e) : undefined
      )
    } else {
      obj.attachments = []
    }
    message.poll !== undefined &&
      (obj.poll = message.poll ? Poll.toJSON(message.poll) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreatePost>): MsgCreatePost {
    const message = { ...baseMsgCreatePost } as MsgCreatePost
    message.additionalAttributes = []
    message.attachments = []
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = object.parentId
    } else {
      message.parentId = ''
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message
    } else {
      message.message = ''
    }
    if (object.commentsState !== undefined && object.commentsState !== null) {
      message.commentsState = object.commentsState
    } else {
      message.commentsState = 0
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    if (
      object.additionalAttributes !== undefined &&
      object.additionalAttributes !== null
    ) {
      for (const e of object.additionalAttributes) {
        message.additionalAttributes.push(Attribute.fromPartial(e))
      }
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(Attachment.fromPartial(e))
      }
    }
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = Poll.fromPartial(object.poll)
    } else {
      message.poll = undefined
    }
    return message
  },
}

const baseMsgCreatePostResponse: object = {}

export const MsgCreatePostResponse = {
  encode(_: MsgCreatePostResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePostResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreatePostResponse } as MsgCreatePostResponse
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

  fromJSON(_: any): MsgCreatePostResponse {
    const message = { ...baseMsgCreatePostResponse } as MsgCreatePostResponse
    return message
  },

  toJSON(_: MsgCreatePostResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgCreatePostResponse>): MsgCreatePostResponse {
    const message = { ...baseMsgCreatePostResponse } as MsgCreatePostResponse
    return message
  },
}

const baseMsgEditPost: object = {
  postId: '',
  message: '',
  commentsState: 0,
  editor: '',
}

export const MsgEditPost = {
  encode(message: MsgEditPost, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.message !== '') {
      writer.uint32(18).string(message.message)
    }
    if (message.commentsState !== 0) {
      writer.uint32(24).int32(message.commentsState)
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    if (message.poll !== undefined) {
      Poll.encode(message.poll, writer.uint32(42).fork()).ldelim()
    }
    if (message.editor !== '') {
      writer.uint32(50).string(message.editor)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditPost {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgEditPost } as MsgEditPost
    message.attachments = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.message = reader.string()
          break
        case 3:
          message.commentsState = reader.int32() as any
          break
        case 4:
          message.attachments.push(Attachment.decode(reader, reader.uint32()))
          break
        case 5:
          message.poll = Poll.decode(reader, reader.uint32())
          break
        case 6:
          message.editor = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgEditPost {
    const message = { ...baseMsgEditPost } as MsgEditPost
    message.attachments = []
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message)
    } else {
      message.message = ''
    }
    if (object.commentsState !== undefined && object.commentsState !== null) {
      message.commentsState = commentsStateFromJSON(object.commentsState)
    } else {
      message.commentsState = 0
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(Attachment.fromJSON(e))
      }
    }
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = Poll.fromJSON(object.poll)
    } else {
      message.poll = undefined
    }
    if (object.editor !== undefined && object.editor !== null) {
      message.editor = String(object.editor)
    } else {
      message.editor = ''
    }
    return message
  },

  toJSON(message: MsgEditPost): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.message !== undefined && (obj.message = message.message)
    message.commentsState !== undefined &&
      (obj.commentsState = commentsStateToJSON(message.commentsState))
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) =>
        e ? Attachment.toJSON(e) : undefined
      )
    } else {
      obj.attachments = []
    }
    message.poll !== undefined &&
      (obj.poll = message.poll ? Poll.toJSON(message.poll) : undefined)
    message.editor !== undefined && (obj.editor = message.editor)
    return obj
  },

  fromPartial(object: DeepPartial<MsgEditPost>): MsgEditPost {
    const message = { ...baseMsgEditPost } as MsgEditPost
    message.attachments = []
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message
    } else {
      message.message = ''
    }
    if (object.commentsState !== undefined && object.commentsState !== null) {
      message.commentsState = object.commentsState
    } else {
      message.commentsState = 0
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(Attachment.fromPartial(e))
      }
    }
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = Poll.fromPartial(object.poll)
    } else {
      message.poll = undefined
    }
    if (object.editor !== undefined && object.editor !== null) {
      message.editor = object.editor
    } else {
      message.editor = ''
    }
    return message
  },
}

const baseMsgEditPostResponse: object = {}

export const MsgEditPostResponse = {
  encode(_: MsgEditPostResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditPostResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgEditPostResponse } as MsgEditPostResponse
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

  fromJSON(_: any): MsgEditPostResponse {
    const message = { ...baseMsgEditPostResponse } as MsgEditPostResponse
    return message
  },

  toJSON(_: MsgEditPostResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgEditPostResponse>): MsgEditPostResponse {
    const message = { ...baseMsgEditPostResponse } as MsgEditPostResponse
    return message
  },
}

const baseMsgAddPostReaction: object = { postId: '', reaction: '', user: '' }

export const MsgAddPostReaction = {
  encode(
    message: MsgAddPostReaction,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.reaction !== '') {
      writer.uint32(18).string(message.reaction)
    }
    if (message.user !== '') {
      writer.uint32(26).string(message.user)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddPostReaction {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddPostReaction } as MsgAddPostReaction
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.reaction = reader.string()
          break
        case 3:
          message.user = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddPostReaction {
    const message = { ...baseMsgAddPostReaction } as MsgAddPostReaction
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.reaction !== undefined && object.reaction !== null) {
      message.reaction = String(object.reaction)
    } else {
      message.reaction = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    return message
  },

  toJSON(message: MsgAddPostReaction): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.reaction !== undefined && (obj.reaction = message.reaction)
    message.user !== undefined && (obj.user = message.user)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddPostReaction>): MsgAddPostReaction {
    const message = { ...baseMsgAddPostReaction } as MsgAddPostReaction
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.reaction !== undefined && object.reaction !== null) {
      message.reaction = object.reaction
    } else {
      message.reaction = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    return message
  },
}

const baseMsgAddPostReactionResponse: object = {}

export const MsgAddPostReactionResponse = {
  encode(
    _: MsgAddPostReactionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddPostReactionResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgAddPostReactionResponse,
    } as MsgAddPostReactionResponse
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

  fromJSON(_: any): MsgAddPostReactionResponse {
    const message = {
      ...baseMsgAddPostReactionResponse,
    } as MsgAddPostReactionResponse
    return message
  },

  toJSON(_: MsgAddPostReactionResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgAddPostReactionResponse>
  ): MsgAddPostReactionResponse {
    const message = {
      ...baseMsgAddPostReactionResponse,
    } as MsgAddPostReactionResponse
    return message
  },
}

const baseMsgRemovePostReaction: object = { postId: '', reaction: '', user: '' }

export const MsgRemovePostReaction = {
  encode(
    message: MsgRemovePostReaction,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.reaction !== '') {
      writer.uint32(18).string(message.reaction)
    }
    if (message.user !== '') {
      writer.uint32(26).string(message.user)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemovePostReaction {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemovePostReaction } as MsgRemovePostReaction
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.reaction = reader.string()
          break
        case 3:
          message.user = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRemovePostReaction {
    const message = { ...baseMsgRemovePostReaction } as MsgRemovePostReaction
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.reaction !== undefined && object.reaction !== null) {
      message.reaction = String(object.reaction)
    } else {
      message.reaction = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    return message
  },

  toJSON(message: MsgRemovePostReaction): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.reaction !== undefined && (obj.reaction = message.reaction)
    message.user !== undefined && (obj.user = message.user)
    return obj
  },

  fromPartial(
    object: DeepPartial<MsgRemovePostReaction>
  ): MsgRemovePostReaction {
    const message = { ...baseMsgRemovePostReaction } as MsgRemovePostReaction
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.reaction !== undefined && object.reaction !== null) {
      message.reaction = object.reaction
    } else {
      message.reaction = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    return message
  },
}

const baseMsgRemovePostReactionResponse: object = {}

export const MsgRemovePostReactionResponse = {
  encode(
    _: MsgRemovePostReactionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePostReactionResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgRemovePostReactionResponse,
    } as MsgRemovePostReactionResponse
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

  fromJSON(_: any): MsgRemovePostReactionResponse {
    const message = {
      ...baseMsgRemovePostReactionResponse,
    } as MsgRemovePostReactionResponse
    return message
  },

  toJSON(_: MsgRemovePostReactionResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgRemovePostReactionResponse>
  ): MsgRemovePostReactionResponse {
    const message = {
      ...baseMsgRemovePostReactionResponse,
    } as MsgRemovePostReactionResponse
    return message
  },
}

const baseMsgAnswerPoll: object = { postId: '', answers: '', answerer: '' }

export const MsgAnswerPoll = {
  encode(message: MsgAnswerPoll, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    for (const v of message.answers) {
      writer.uint32(18).string(v!)
    }
    if (message.answerer !== '') {
      writer.uint32(26).string(message.answerer)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAnswerPoll {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAnswerPoll } as MsgAnswerPoll
    message.answers = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.answers.push(reader.string())
          break
        case 3:
          message.answerer = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAnswerPoll {
    const message = { ...baseMsgAnswerPoll } as MsgAnswerPoll
    message.answers = []
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.answers !== undefined && object.answers !== null) {
      for (const e of object.answers) {
        message.answers.push(String(e))
      }
    }
    if (object.answerer !== undefined && object.answerer !== null) {
      message.answerer = String(object.answerer)
    } else {
      message.answerer = ''
    }
    return message
  },

  toJSON(message: MsgAnswerPoll): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    if (message.answers) {
      obj.answers = message.answers.map((e) => e)
    } else {
      obj.answers = []
    }
    message.answerer !== undefined && (obj.answerer = message.answerer)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAnswerPoll>): MsgAnswerPoll {
    const message = { ...baseMsgAnswerPoll } as MsgAnswerPoll
    message.answers = []
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.answers !== undefined && object.answers !== null) {
      for (const e of object.answers) {
        message.answers.push(e)
      }
    }
    if (object.answerer !== undefined && object.answerer !== null) {
      message.answerer = object.answerer
    } else {
      message.answerer = ''
    }
    return message
  },
}

const baseMsgAnswerPollResponse: object = {}

export const MsgAnswerPollResponse = {
  encode(_: MsgAnswerPollResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAnswerPollResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAnswerPollResponse } as MsgAnswerPollResponse
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

  fromJSON(_: any): MsgAnswerPollResponse {
    const message = { ...baseMsgAnswerPollResponse } as MsgAnswerPollResponse
    return message
  },

  toJSON(_: MsgAnswerPollResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgAnswerPollResponse>): MsgAnswerPollResponse {
    const message = { ...baseMsgAnswerPollResponse } as MsgAnswerPollResponse
    return message
  },
}

const baseMsgRegisterReaction: object = {
  shortCode: '',
  value: '',
  subspace: '',
  creator: '',
}

export const MsgRegisterReaction = {
  encode(
    message: MsgRegisterReaction,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.shortCode !== '') {
      writer.uint32(10).string(message.shortCode)
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value)
    }
    if (message.subspace !== '') {
      writer.uint32(26).string(message.subspace)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRegisterReaction {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRegisterReaction } as MsgRegisterReaction
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.shortCode = reader.string()
          break
        case 2:
          message.value = reader.string()
          break
        case 3:
          message.subspace = reader.string()
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

  fromJSON(object: any): MsgRegisterReaction {
    const message = { ...baseMsgRegisterReaction } as MsgRegisterReaction
    if (object.shortCode !== undefined && object.shortCode !== null) {
      message.shortCode = String(object.shortCode)
    } else {
      message.shortCode = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value)
    } else {
      message.value = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = String(object.subspace)
    } else {
      message.subspace = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgRegisterReaction): unknown {
    const obj: any = {}
    message.shortCode !== undefined && (obj.shortCode = message.shortCode)
    message.value !== undefined && (obj.value = message.value)
    message.subspace !== undefined && (obj.subspace = message.subspace)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRegisterReaction>): MsgRegisterReaction {
    const message = { ...baseMsgRegisterReaction } as MsgRegisterReaction
    if (object.shortCode !== undefined && object.shortCode !== null) {
      message.shortCode = object.shortCode
    } else {
      message.shortCode = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = ''
    }
    if (object.subspace !== undefined && object.subspace !== null) {
      message.subspace = object.subspace
    } else {
      message.subspace = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  },
}

const baseMsgRegisterReactionResponse: object = {}

export const MsgRegisterReactionResponse = {
  encode(
    _: MsgRegisterReactionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRegisterReactionResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseMsgRegisterReactionResponse,
    } as MsgRegisterReactionResponse
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

  fromJSON(_: any): MsgRegisterReactionResponse {
    const message = {
      ...baseMsgRegisterReactionResponse,
    } as MsgRegisterReactionResponse
    return message
  },

  toJSON(_: MsgRegisterReactionResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(
    _: DeepPartial<MsgRegisterReactionResponse>
  ): MsgRegisterReactionResponse {
    const message = {
      ...baseMsgRegisterReactionResponse,
    } as MsgRegisterReactionResponse
    return message
  },
}

const baseMsgReportPost: object = {
  postId: '',
  reportType: '',
  message: '',
  user: '',
}

export const MsgReportPost = {
  encode(message: MsgReportPost, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.reportType !== '') {
      writer.uint32(18).string(message.reportType)
    }
    if (message.message !== '') {
      writer.uint32(26).string(message.message)
    }
    if (message.user !== '') {
      writer.uint32(34).string(message.user)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgReportPost {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgReportPost } as MsgReportPost
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.reportType = reader.string()
          break
        case 3:
          message.message = reader.string()
          break
        case 4:
          message.user = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgReportPost {
    const message = { ...baseMsgReportPost } as MsgReportPost
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.reportType !== undefined && object.reportType !== null) {
      message.reportType = String(object.reportType)
    } else {
      message.reportType = ''
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message)
    } else {
      message.message = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    return message
  },

  toJSON(message: MsgReportPost): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.reportType !== undefined && (obj.reportType = message.reportType)
    message.message !== undefined && (obj.message = message.message)
    message.user !== undefined && (obj.user = message.user)
    return obj
  },

  fromPartial(object: DeepPartial<MsgReportPost>): MsgReportPost {
    const message = { ...baseMsgReportPost } as MsgReportPost
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.reportType !== undefined && object.reportType !== null) {
      message.reportType = object.reportType
    } else {
      message.reportType = ''
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message
    } else {
      message.message = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    return message
  },
}

const baseMsgReportPostResponse: object = {}

export const MsgReportPostResponse = {
  encode(_: MsgReportPostResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgReportPostResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgReportPostResponse } as MsgReportPostResponse
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

  fromJSON(_: any): MsgReportPostResponse {
    const message = { ...baseMsgReportPostResponse } as MsgReportPostResponse
    return message
  },

  toJSON(_: MsgReportPostResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgReportPostResponse>): MsgReportPostResponse {
    const message = { ...baseMsgReportPostResponse } as MsgReportPostResponse
    return message
  },
}

/** Msg defines the relationships Msg service. */
export interface Msg {
  /** CreatePost defines the method to create a post */
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse>
  /** EditPost defines the method to edit an existing post */
  EditPost(request: MsgEditPost): Promise<MsgEditPostResponse>
  /** ReportPost defines a method for creating a new post report */
  ReportPost(request: MsgReportPost): Promise<MsgReportPostResponse>
  /** AddReaction defines the method to add a reaction to a post */
  AddPostReaction(
    request: MsgAddPostReaction
  ): Promise<MsgAddPostReactionResponse>
  /** RemoveReaction defines the method to remove a reaction from a post */
  RemovePostReaction(
    request: MsgRemovePostReaction
  ): Promise<MsgRemovePostReactionResponse>
  /** RegisterReaction defines the method to register a new reaction */
  RegisterReaction(
    request: MsgRegisterReaction
  ): Promise<MsgRegisterReactionResponse>
  /** AnswerPoll defines the method to answer a poll */
  AnswerPoll(request: MsgAnswerPoll): Promise<MsgAnswerPollResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.CreatePost = this.CreatePost.bind(this)
    this.EditPost = this.EditPost.bind(this)
    this.ReportPost = this.ReportPost.bind(this)
    this.AddPostReaction = this.AddPostReaction.bind(this)
    this.RemovePostReaction = this.RemovePostReaction.bind(this)
    this.RegisterReaction = this.RegisterReaction.bind(this)
    this.AnswerPoll = this.AnswerPoll.bind(this)
  }
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse> {
    const data = MsgCreatePost.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'CreatePost',
      data
    )
    return promise.then((data) =>
      MsgCreatePostResponse.decode(new Reader(data))
    )
  }

  EditPost(request: MsgEditPost): Promise<MsgEditPostResponse> {
    const data = MsgEditPost.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'EditPost',
      data
    )
    return promise.then((data) => MsgEditPostResponse.decode(new Reader(data)))
  }

  ReportPost(request: MsgReportPost): Promise<MsgReportPostResponse> {
    const data = MsgReportPost.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'ReportPost',
      data
    )
    return promise.then((data) =>
      MsgReportPostResponse.decode(new Reader(data))
    )
  }

  AddPostReaction(
    request: MsgAddPostReaction
  ): Promise<MsgAddPostReactionResponse> {
    const data = MsgAddPostReaction.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'AddPostReaction',
      data
    )
    return promise.then((data) =>
      MsgAddPostReactionResponse.decode(new Reader(data))
    )
  }

  RemovePostReaction(
    request: MsgRemovePostReaction
  ): Promise<MsgRemovePostReactionResponse> {
    const data = MsgRemovePostReaction.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'RemovePostReaction',
      data
    )
    return promise.then((data) =>
      MsgRemovePostReactionResponse.decode(new Reader(data))
    )
  }

  RegisterReaction(
    request: MsgRegisterReaction
  ): Promise<MsgRegisterReactionResponse> {
    const data = MsgRegisterReaction.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'RegisterReaction',
      data
    )
    return promise.then((data) =>
      MsgRegisterReactionResponse.decode(new Reader(data))
    )
  }

  AnswerPoll(request: MsgAnswerPoll): Promise<MsgAnswerPollResponse> {
    const data = MsgAnswerPoll.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Msg',
      'AnswerPoll',
      data
    )
    return promise.then((data) =>
      MsgAnswerPollResponse.decode(new Reader(data))
    )
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
