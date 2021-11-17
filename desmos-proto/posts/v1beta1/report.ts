/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'desmos.posts.v1beta1'

/** Report is the struct of a post's reports */
export interface Report {
  /** ID of the post for which the report has been created */
  postId: string
  /** Identifies the type of the reports */
  type: string
  /** User message */
  message: string
  /** Identifies the reporting user */
  user: string
}

/** Reports wraps a list of Report objects */
export interface Reports {
  reports: Report[]
}

const baseReport: object = { postId: '', type: '', message: '', user: '' }

export const Report = {
  encode(message: Report, writer: Writer = Writer.create()): Writer {
    if (message.postId !== '') {
      writer.uint32(10).string(message.postId)
    }
    if (message.type !== '') {
      writer.uint32(18).string(message.type)
    }
    if (message.message !== '') {
      writer.uint32(26).string(message.message)
    }
    if (message.user !== '') {
      writer.uint32(34).string(message.user)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Report {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseReport } as Report
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.postId = reader.string()
          break
        case 2:
          message.type = reader.string()
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

  fromJSON(object: any): Report {
    const message = { ...baseReport } as Report
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = String(object.postId)
    } else {
      message.postId = ''
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type)
    } else {
      message.type = ''
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

  toJSON(message: Report): unknown {
    const obj: any = {}
    message.postId !== undefined && (obj.postId = message.postId)
    message.type !== undefined && (obj.type = message.type)
    message.message !== undefined && (obj.message = message.message)
    message.user !== undefined && (obj.user = message.user)
    return obj
  },

  fromPartial(object: DeepPartial<Report>): Report {
    const message = { ...baseReport } as Report
    if (object.postId !== undefined && object.postId !== null) {
      message.postId = object.postId
    } else {
      message.postId = ''
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type
    } else {
      message.type = ''
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

const baseReports: object = {}

export const Reports = {
  encode(message: Reports, writer: Writer = Writer.create()): Writer {
    for (const v of message.reports) {
      Report.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Reports {
    const reader = input instanceof Reader ? input : new Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseReports } as Reports
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

  fromJSON(object: any): Reports {
    const message = { ...baseReports } as Reports
    message.reports = []
    if (object.reports !== undefined && object.reports !== null) {
      for (const e of object.reports) {
        message.reports.push(Report.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Reports): unknown {
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

  fromPartial(object: DeepPartial<Reports>): Reports {
    const message = { ...baseReports } as Reports
    message.reports = []
    if (object.reports !== undefined && object.reports !== null) {
      for (const e of object.reports) {
        message.reports.push(Report.fromPartial(e))
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
