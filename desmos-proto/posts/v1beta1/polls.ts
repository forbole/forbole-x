/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import { Timestamp } from '../../../google/protobuf/timestamp'

export const protobufPackage = 'desmos.posts.v1beta1'

/**
 * ProvidedAnswer contains the data of a single poll answer inserted by the
 * creator
 */
export interface ProvidedAnswer {
  id: string
  text: string
}

/** Poll contains all the data of a desmos post's poll */
export interface Poll {
  question: string
  providedAnswers: ProvidedAnswer[]
  endDate?: Date
  allowsMultipleAnswers: boolean
  allowsAnswerEdits: boolean
}

/** UserAnswer contains the data of a user's answer to a poll */
export interface UserAnswer {
  postId: string
  user: string
  answers: string[]
}

const baseProvidedAnswer: object = { id: '', text: '' }

export const ProvidedAnswer = {
  encode(message: ProvidedAnswer, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.text !== '') {
      writer.uint32(18).string(message.text)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ProvidedAnswer {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseProvidedAnswer } as ProvidedAnswer
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.text = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ProvidedAnswer {
    const message = { ...baseProvidedAnswer } as ProvidedAnswer
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text)
    } else {
      message.text = ''
    }
    return message
  },

  toJSON(message: ProvidedAnswer): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.text !== undefined && (obj.text = message.text)
    return obj
  },

  fromPartial(object: DeepPartial<ProvidedAnswer>): ProvidedAnswer {
    const message = { ...baseProvidedAnswer } as ProvidedAnswer
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.text !== undefined && object.text !== null) {
      message.text = object.text
    } else {
      message.text = ''
    }
    return message
  },
}

const basePoll: object = {
  question: '',
  allowsMultipleAnswers: false,
  allowsAnswerEdits: false,
}

export const Poll = {
  encode(message: Poll, writer: Writer = Writer.create()): Writer {
    if (message.question !== '') {
      writer.uint32(10).string(message.question)
    }
    for (const v of message.providedAnswers) {
      ProvidedAnswer.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endDate),
        writer.uint32(26).fork()
      ).ldelim()
    }
    if (message.allowsMultipleAnswers === true) {
      writer.uint32(32).bool(message.allowsMultipleAnswers)
    }
    if (message.allowsAnswerEdits === true) {
      writer.uint32(40).bool(message.allowsAnswerEdits)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Poll {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePoll } as Poll
    message.providedAnswers = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.question = reader.string()
          break
        case 2:
          message.providedAnswers.push(
            ProvidedAnswer.decode(reader, reader.uint32())
          )
          break
        case 3:
          message.endDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          )
          break
        case 4:
          message.allowsMultipleAnswers = reader.bool()
          break
        case 5:
          message.allowsAnswerEdits = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Poll {
    const message = { ...basePoll } as Poll
    message.providedAnswers = []
    if (object.question !== undefined && object.question !== null) {
      message.question = String(object.question)
    } else {
      message.question = ''
    }
    if (
      object.providedAnswers !== undefined &&
      object.providedAnswers !== null
    ) {
      for (const e of object.providedAnswers) {
        message.providedAnswers.push(ProvidedAnswer.fromJSON(e))
      }
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = fromJsonTimestamp(object.endDate)
    } else {
      message.endDate = undefined
    }
    if (
      object.allowsMultipleAnswers !== undefined &&
      object.allowsMultipleAnswers !== null
    ) {
      message.allowsMultipleAnswers = Boolean(object.allowsMultipleAnswers)
    } else {
      message.allowsMultipleAnswers = false
    }
    if (
      object.allowsAnswerEdits !== undefined &&
      object.allowsAnswerEdits !== null
    ) {
      message.allowsAnswerEdits = Boolean(object.allowsAnswerEdits)
    } else {
      message.allowsAnswerEdits = false
    }
    return message
  },

  toJSON(message: Poll): unknown {
    const obj: any = {}
    message.question !== undefined && (obj.question = message.question)
    if (message.providedAnswers) {
      obj.providedAnswers = message.providedAnswers.map((e) =>
        e ? ProvidedAnswer.toJSON(e) : undefined
      )
    } else {
      obj.providedAnswers = []
    }
    message.endDate !== undefined &&
      (obj.endDate = message.endDate.toISOString())
    message.allowsMultipleAnswers !== undefined &&
      (obj.allowsMultipleAnswers = message.allowsMultipleAnswers)
    message.allowsAnswerEdits !== undefined &&
      (obj.allowsAnswerEdits = message.allowsAnswerEdits)
    return obj
  },

  fromPartial(object: DeepPartial<Poll>): Poll {
    const message = { ...basePoll } as Poll
    message.providedAnswers = []
    if (object.question !== undefined && object.question !== null) {
      message.question = object.question
    } else {
      message.question = ''
    }
    if (
      object.providedAnswers !== undefined &&
      object.providedAnswers !== null
    ) {
      for (const e of object.providedAnswers) {
        message.providedAnswers.push(ProvidedAnswer.fromPartial(e))
      }
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate
    } else {
      message.endDate = undefined
    }
    if (
      object.allowsMultipleAnswers !== undefined &&
      object.allowsMultipleAnswers !== null
    ) {
      message.allowsMultipleAnswers = object.allowsMultipleAnswers
    } else {
      message.allowsMultipleAnswers = false
    }
    if (
      object.allowsAnswerEdits !== undefined &&
      object.allowsAnswerEdits !== null
    ) {
      message.allowsAnswerEdits = object.allowsAnswerEdits
    } else {
      message.allowsAnswerEdits = false
    }
    return message
  },
}

const baseUserAnswer: object = { postId: '', user: '', answers: '' }

export const UserAnswer = {
  encode(message: UserAnswer, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.user !== '') {
      writer.uint32(18).string(message.user)
    }
    for (const v of message.answers) {
      writer.uint32(26).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UserAnswer {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUserAnswer } as UserAnswer
    message.answers = []
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
          message.answers.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UserAnswer {
    const message = { ...baseUserAnswer } as UserAnswer
    message.answers = []
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
    if (object.answers !== undefined && object.answers !== null) {
      for (const e of object.answers) {
        message.answers.push(String(e))
      }
    }
    return message
  },

  toJSON(message: UserAnswer): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.user !== undefined && (obj.user = message.user)
    if (message.answers) {
      obj.answers = message.answers.map((e) => e)
    } else {
      obj.answers = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<UserAnswer>): UserAnswer {
    const message = { ...baseUserAnswer } as UserAnswer
    message.answers = []
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
    if (object.answers !== undefined && object.answers !== null) {
      for (const e of object.answers) {
        message.answers.push(e)
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
