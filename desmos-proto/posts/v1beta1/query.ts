/* eslint-disable */
import { util, configure, Reader, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  PageRequest,
  PageResponse,
} from '../../../cosmos/base/query/v1beta1/pagination'
import { Post } from '../../../desmos/posts/v1beta1/posts'
import { Params } from '../../../desmos/posts/v1beta1/params'
import { UserAnswer } from '../../../desmos/posts/v1beta1/polls'
import {
  RegisteredReaction,
  PostReaction,
} from '../../../desmos/posts/v1beta1/reactions'
import { Report } from '../../../desmos/posts/v1beta1/report'

export const protobufPackage = 'desmos.posts.v1beta1'

/** QueryPostsRequest is the request type for the Query/Posts RPC method. */
export interface QueryPostsRequest {
  /**
   * SubspaceId represents the ID of the subspace to which to query the posts
   * for. Providing an empty or invalid subspace id will return an error.
   */
  subspaceId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/** QueryPostsResponse is the response type for the Query/Posts RPC method */
export interface QueryPostsResponse {
  posts: Post[]
  pagination?: PageResponse
}

/** QueryPostRequest is the request type for the Query/Post RPC method. */
export interface QueryPostRequest {
  postId: string
}

/** QueryPostResponse is the response type for the Query/Post RPC method */
export interface QueryPostResponse {
  post?: Post
}

/**
 * QueryUserAnswersRequest is the request type for the Query/UserAnswers RPC
 * method.
 */
export interface QueryUserAnswersRequest {
  postId: string
  user: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryUserAnswersResponse is the response type for the Query/UserAnswers RPC
 * method
 */
export interface QueryUserAnswersResponse {
  answers: UserAnswer[]
  pagination?: PageResponse
}

/**
 * QueryRegisteredReactionsRequest is the request type for the
 * Query/RegisteredReactions RPC method.
 */
export interface QueryRegisteredReactionsRequest {
  /** subspace to query the registered reactions for */
  subspaceId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryRegisteredReactionsResponse is the response type for the
 * Query/RegisteredReactions RPC method
 */
export interface QueryRegisteredReactionsResponse {
  reactions: RegisteredReaction[]
  pagination?: PageResponse
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method */
export interface QueryParamsResponse {
  params?: Params
}

/**
 * QueryReportsRequest is the request type for the Query/Reports RPC
 * method.
 */
export interface QueryReportsRequest {
  postId: string
}

/**
 * QueryReportsResponse is the response type for the Query/Reports RPC
 * method.
 */
export interface QueryReportsResponse {
  reports: Report[]
}

/**
 * QueryPostReactionsRequest is the request type for the Query/PostReactions RPC
 * method.
 */
export interface QueryPostReactionsRequest {
  postId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryPostReactionsResponse is the response type for the Query/PostReactions
 * RPC method
 */
export interface QueryPostReactionsResponse {
  reactions: PostReaction[]
  pagination?: PageResponse
}

/**
 * QueryPostCommentsRequest is the request type for the Query/PostComments RPC
 * method.
 */
export interface QueryPostCommentsRequest {
  postId: string
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest
}

/**
 * QueryPostCommentsResponse is the response type for the Query/PostComments RPC
 * method.
 */
export interface QueryPostCommentsResponse {
  comments: Post[]
  pagination?: PageResponse
}

const baseQueryPostsRequest: object = { subspaceId: '' }

export const QueryPostsRequest = {
  encode(message: QueryPostsRequest, writer: Writer = Writer.create()): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostsRequest {
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostsRequest): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostsRequest>): QueryPostsRequest {
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryPostsResponse: object = {}

export const QueryPostsResponse = {
  encode(
    message: QueryPostsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.posts = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.posts.push(Post.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostsResponse {
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.posts = []
    if (object.posts !== undefined && object.posts !== null) {
      for (const e of object.posts) {
        message.posts.push(Post.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostsResponse): unknown {
    const obj: any = {}
    if (message.posts) {
      obj.posts = message.posts.map((e) => (e ? Post.toJSON(e) : undefined))
    } else {
      obj.posts = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostsResponse>): QueryPostsResponse {
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.posts = []
    if (object.posts !== undefined && object.posts !== null) {
      for (const e of object.posts) {
        message.posts.push(Post.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryPostRequest: object = { postId: '' }

export const QueryPostRequest = {
  encode(message: QueryPostRequest, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostRequest } as QueryPostRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostRequest {
    const message = { ...baseQueryPostRequest } as QueryPostRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    return message
  },

  toJSON(message: QueryPostRequest): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostRequest>): QueryPostRequest {
    const message = { ...baseQueryPostRequest } as QueryPostRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    return message
  },
}

const baseQueryPostResponse: object = {}

export const QueryPostResponse = {
  encode(message: QueryPostResponse, writer: Writer = Writer.create()): Writer {
    if (message.post !== undefined) {
      Post.encode(message.post, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostResponse } as QueryPostResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.post = Post.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostResponse {
    const message = { ...baseQueryPostResponse } as QueryPostResponse
    if (object.post !== undefined && object.post !== null) {
      message.post = Post.fromJSON(object.post)
    } else {
      message.post = undefined
    }
    return message
  },

  toJSON(message: QueryPostResponse): unknown {
    const obj: any = {}
    message.post !== undefined &&
      (obj.post = message.post ? Post.toJSON(message.post) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostResponse>): QueryPostResponse {
    const message = { ...baseQueryPostResponse } as QueryPostResponse
    if (object.post !== undefined && object.post !== null) {
      message.post = Post.fromPartial(object.post)
    } else {
      message.post = undefined
    }
    return message
  },
}

const baseQueryUserAnswersRequest: object = { postId: '', user: '' }

export const QueryUserAnswersRequest = {
  encode(
    message: QueryUserAnswersRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.user !== '') {
      writer.uint32(18).string(message.user)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryUserAnswersRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryUserAnswersRequest,
    } as QueryUserAnswersRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.user = reader.string()
          break
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryUserAnswersRequest {
    const message = {
      ...baseQueryUserAnswersRequest,
    } as QueryUserAnswersRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user)
    } else {
      message.user = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryUserAnswersRequest): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.user !== undefined && (obj.user = message.user)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryUserAnswersRequest>
  ): QueryUserAnswersRequest {
    const message = {
      ...baseQueryUserAnswersRequest,
    } as QueryUserAnswersRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user
    } else {
      message.user = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryUserAnswersResponse: object = {}

export const QueryUserAnswersResponse = {
  encode(
    message: QueryUserAnswersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.answers) {
      UserAnswer.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUserAnswersResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryUserAnswersResponse,
    } as QueryUserAnswersResponse
    message.answers = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.answers.push(UserAnswer.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryUserAnswersResponse {
    const message = {
      ...baseQueryUserAnswersResponse,
    } as QueryUserAnswersResponse
    message.answers = []
    if (object.answers !== undefined && object.answers !== null) {
      for (const e of object.answers) {
        message.answers.push(UserAnswer.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryUserAnswersResponse): unknown {
    const obj: any = {}
    if (message.answers) {
      obj.answers = message.answers.map((e) =>
        e ? UserAnswer.toJSON(e) : undefined
      )
    } else {
      obj.answers = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryUserAnswersResponse>
  ): QueryUserAnswersResponse {
    const message = {
      ...baseQueryUserAnswersResponse,
    } as QueryUserAnswersResponse
    message.answers = []
    if (object.answers !== undefined && object.answers !== null) {
      for (const e of object.answers) {
        message.answers.push(UserAnswer.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryRegisteredReactionsRequest: object = { subspaceId: '' }

export const QueryRegisteredReactionsRequest = {
  encode(
    message: QueryRegisteredReactionsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subspaceId !== '') {
      writer.uint32(10).string(message.subspaceId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryRegisteredReactionsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryRegisteredReactionsRequest,
    } as QueryRegisteredReactionsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.subspaceId = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryRegisteredReactionsRequest {
    const message = {
      ...baseQueryRegisteredReactionsRequest,
    } as QueryRegisteredReactionsRequest
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = String(object.subspaceId)
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryRegisteredReactionsRequest): unknown {
    const obj: any = {}
    message.subspaceId !== undefined && (obj.subspaceId = message.subspaceId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryRegisteredReactionsRequest>
  ): QueryRegisteredReactionsRequest {
    const message = {
      ...baseQueryRegisteredReactionsRequest,
    } as QueryRegisteredReactionsRequest
    if (object.subspaceId !== undefined && object.subspaceId !== null) {
      message.subspaceId = object.subspaceId
    } else {
      message.subspaceId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryRegisteredReactionsResponse: object = {}

export const QueryRegisteredReactionsResponse = {
  encode(
    message: QueryRegisteredReactionsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.reactions) {
      RegisteredReaction.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryRegisteredReactionsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryRegisteredReactionsResponse,
    } as QueryRegisteredReactionsResponse
    message.reactions = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.reactions.push(
            RegisteredReaction.decode(reader, reader.uint32())
          )
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryRegisteredReactionsResponse {
    const message = {
      ...baseQueryRegisteredReactionsResponse,
    } as QueryRegisteredReactionsResponse
    message.reactions = []
    if (object.reactions !== undefined && object.reactions !== null) {
      for (const e of object.reactions) {
        message.reactions.push(RegisteredReaction.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryRegisteredReactionsResponse): unknown {
    const obj: any = {}
    if (message.reactions) {
      obj.reactions = message.reactions.map((e) =>
        e ? RegisteredReaction.toJSON(e) : undefined
      )
    } else {
      obj.reactions = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryRegisteredReactionsResponse>
  ): QueryRegisteredReactionsResponse {
    const message = {
      ...baseQueryRegisteredReactionsResponse,
    } as QueryRegisteredReactionsResponse
    message.reactions = []
    if (object.reactions !== undefined && object.reactions !== null) {
      for (const e of object.reactions) {
        message.reactions.push(RegisteredReaction.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryParamsRequest: object = {}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  },
}

const baseQueryParamsResponse: object = {}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    return message
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {}
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    return message
  },
}

const baseQueryReportsRequest: object = { postId: '' }

export const QueryReportsRequest = {
  encode(
    message: QueryReportsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryReportsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryReportsRequest } as QueryReportsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryReportsRequest {
    const message = { ...baseQueryReportsRequest } as QueryReportsRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    return message
  },

  toJSON(message: QueryReportsRequest): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryReportsRequest>): QueryReportsRequest {
    const message = { ...baseQueryReportsRequest } as QueryReportsRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    return message
  },
}

const baseQueryReportsResponse: object = {}

export const QueryReportsResponse = {
  encode(
    message: QueryReportsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.reports) {
      Report.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryReportsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryReportsResponse } as QueryReportsResponse
    message.reports = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.reports.push(Report.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryReportsResponse {
    const message = { ...baseQueryReportsResponse } as QueryReportsResponse
    message.reports = []
    if (object.reports !== undefined && object.reports !== null) {
      for (const e of object.reports) {
        message.reports.push(Report.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryReportsResponse): unknown {
    const obj: any = {}
    if (message.reports) {
      obj.reports = message.reports.map((e) =>
        e ? Report.toJSON(e) : undefined
      )
    } else {
      obj.reports = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryReportsResponse>): QueryReportsResponse {
    const message = { ...baseQueryReportsResponse } as QueryReportsResponse
    message.reports = []
    if (object.reports !== undefined && object.reports !== null) {
      for (const e of object.reports) {
        message.reports.push(Report.fromPartial(e))
      }
    }
    return message
  },
}

const baseQueryPostReactionsRequest: object = { postId: '' }

export const QueryPostReactionsRequest = {
  encode(
    message: QueryPostReactionsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryPostReactionsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryPostReactionsRequest,
    } as QueryPostReactionsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostReactionsRequest {
    const message = {
      ...baseQueryPostReactionsRequest,
    } as QueryPostReactionsRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostReactionsRequest): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryPostReactionsRequest>
  ): QueryPostReactionsRequest {
    const message = {
      ...baseQueryPostReactionsRequest,
    } as QueryPostReactionsRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryPostReactionsResponse: object = {}

export const QueryPostReactionsResponse = {
  encode(
    message: QueryPostReactionsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.reactions) {
      PostReaction.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryPostReactionsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryPostReactionsResponse,
    } as QueryPostReactionsResponse
    message.reactions = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.reactions.push(PostReaction.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostReactionsResponse {
    const message = {
      ...baseQueryPostReactionsResponse,
    } as QueryPostReactionsResponse
    message.reactions = []
    if (object.reactions !== undefined && object.reactions !== null) {
      for (const e of object.reactions) {
        message.reactions.push(PostReaction.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostReactionsResponse): unknown {
    const obj: any = {}
    if (message.reactions) {
      obj.reactions = message.reactions.map((e) =>
        e ? PostReaction.toJSON(e) : undefined
      )
    } else {
      obj.reactions = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryPostReactionsResponse>
  ): QueryPostReactionsResponse {
    const message = {
      ...baseQueryPostReactionsResponse,
    } as QueryPostReactionsResponse
    message.reactions = []
    if (object.reactions !== undefined && object.reactions !== null) {
      for (const e of object.reactions) {
        message.reactions.push(PostReaction.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryPostCommentsRequest: object = { postId: '' }

export const QueryPostCommentsRequest = {
  encode(
    message: QueryPostCommentsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryPostCommentsRequest {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryPostCommentsRequest,
    } as QueryPostCommentsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostCommentsRequest {
    const message = {
      ...baseQueryPostCommentsRequest,
    } as QueryPostCommentsRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostCommentsRequest): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryPostCommentsRequest>
  ): QueryPostCommentsRequest {
    const message = {
      ...baseQueryPostCommentsRequest,
    } as QueryPostCommentsRequest
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

const baseQueryPostCommentsResponse: object = {}

export const QueryPostCommentsResponse = {
  encode(
    message: QueryPostCommentsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.comments) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryPostCommentsResponse {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = {
      ...baseQueryPostCommentsResponse,
    } as QueryPostCommentsResponse
    message.comments = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.comments.push(Post.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostCommentsResponse {
    const message = {
      ...baseQueryPostCommentsResponse,
    } as QueryPostCommentsResponse
    message.comments = []
    if (object.comments !== undefined && object.comments !== null) {
      for (const e of object.comments) {
        message.comments.push(Post.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostCommentsResponse): unknown {
    const obj: any = {}
    if (message.comments) {
      obj.comments = message.comments.map((e) =>
        e ? Post.toJSON(e) : undefined
      )
    } else {
      obj.comments = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined)
    return obj
  },

  fromPartial(
    object: DeepPartial<QueryPostCommentsResponse>
  ): QueryPostCommentsResponse {
    const message = {
      ...baseQueryPostCommentsResponse,
    } as QueryPostCommentsResponse
    message.comments = []
    if (object.comments !== undefined && object.comments !== null) {
      for (const e of object.comments) {
        message.comments.push(Post.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Posts queries all the stored posts */
  Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>
  /** Post queries a specific post */
  Post(request: QueryPostRequest): Promise<QueryPostResponse>
  /** Reports queries the reports for the post having the given id */
  Reports(request: QueryReportsRequest): Promise<QueryReportsResponse>
  /** UserAnswers queries the user answers of the post having a specific id */
  UserAnswers(
    request: QueryUserAnswersRequest
  ): Promise<QueryUserAnswersResponse>
  /** RegisteredReactions queries all the registered reactions */
  RegisteredReactions(
    request: QueryRegisteredReactionsRequest
  ): Promise<QueryRegisteredReactionsResponse>
  /** Params queries the posts module params */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>
  /** PostComments queries the comments of the post having the given id */
  PostComments(
    request: QueryPostCommentsRequest
  ): Promise<QueryPostCommentsResponse>
  /** PostReactions queries all the reactions of the post having the given id */
  PostReactions(
    request: QueryPostReactionsRequest
  ): Promise<QueryPostReactionsResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.Posts = this.Posts.bind(this)
    this.Post = this.Post.bind(this)
    this.Reports = this.Reports.bind(this)
    this.UserAnswers = this.UserAnswers.bind(this)
    this.RegisteredReactions = this.RegisteredReactions.bind(this)
    this.Params = this.Params.bind(this)
    this.PostComments = this.PostComments.bind(this)
    this.PostReactions = this.PostReactions.bind(this)
  }
  Posts(request: QueryPostsRequest): Promise<QueryPostsResponse> {
    const data = QueryPostsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'Posts',
      data
    )
    return promise.then((data) => QueryPostsResponse.decode(new Reader(data)))
  }

  Post(request: QueryPostRequest): Promise<QueryPostResponse> {
    const data = QueryPostRequest.encode(request).finish()
    const promise = this.rpc.request('desmos.posts.v1beta1.Query', 'Post', data)
    return promise.then((data) => QueryPostResponse.decode(new Reader(data)))
  }

  Reports(request: QueryReportsRequest): Promise<QueryReportsResponse> {
    const data = QueryReportsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'Reports',
      data
    )
    return promise.then((data) => QueryReportsResponse.decode(new Reader(data)))
  }

  UserAnswers(
    request: QueryUserAnswersRequest
  ): Promise<QueryUserAnswersResponse> {
    const data = QueryUserAnswersRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'UserAnswers',
      data
    )
    return promise.then((data) =>
      QueryUserAnswersResponse.decode(new Reader(data))
    )
  }

  RegisteredReactions(
    request: QueryRegisteredReactionsRequest
  ): Promise<QueryRegisteredReactionsResponse> {
    const data = QueryRegisteredReactionsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'RegisteredReactions',
      data
    )
    return promise.then((data) =>
      QueryRegisteredReactionsResponse.decode(new Reader(data))
    )
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'Params',
      data
    )
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)))
  }

  PostComments(
    request: QueryPostCommentsRequest
  ): Promise<QueryPostCommentsResponse> {
    const data = QueryPostCommentsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'PostComments',
      data
    )
    return promise.then((data) =>
      QueryPostCommentsResponse.decode(new Reader(data))
    )
  }

  PostReactions(
    request: QueryPostReactionsRequest
  ): Promise<QueryPostReactionsResponse> {
    const data = QueryPostReactionsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.posts.v1beta1.Query',
      'PostReactions',
      data
    )
    return promise.then((data) =>
      QueryPostReactionsResponse.decode(new Reader(data))
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
