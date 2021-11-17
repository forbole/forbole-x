/* eslint-disable */
import { util, configure, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  QueryProfileResponse,
  QueryProfileRequest,
} from '../../../desmos/profiles/v1beta1/query_profile'
import {
  QueryIncomingDTagTransferRequestsResponse,
  QueryIncomingDTagTransferRequestsRequest,
} from '../../../desmos/profiles/v1beta1/query_dtag_requests'
import {
  QueryParamsResponse,
  QueryParamsRequest,
} from '../../../desmos/profiles/v1beta1/query_params'
import {
  QueryRelationshipsResponse,
  QueryBlocksResponse,
  QueryRelationshipsRequest,
  QueryBlocksRequest,
} from '../../../desmos/profiles/v1beta1/query_relationships'
import {
  QueryChainLinksResponse,
  QueryUserChainLinkResponse,
  QueryChainLinksRequest,
  QueryUserChainLinkRequest,
} from '../../../desmos/profiles/v1beta1/query_chain_links'
import {
  QueryApplicationLinksResponse,
  QueryUserApplicationLinkResponse,
  QueryApplicationLinkByClientIDResponse,
  QueryApplicationLinksRequest,
  QueryUserApplicationLinkRequest,
  QueryApplicationLinkByClientIDRequest,
} from '../../../desmos/profiles/v1beta1/query_app_links'

export const protobufPackage = 'desmos.profiles.v1beta1'

/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * Profile queries the profile of a specific user given their DTag or address.
   * If the queried user does not have a profile, the returned response will
   * contain a null profile.
   */
  Profile(request: QueryProfileRequest): Promise<QueryProfileResponse>
  /**
   * IncomingDTagTransferRequests queries all the DTag transfers requests that
   * have been made towards the user with the given address
   */
  IncomingDTagTransferRequests(
    request: QueryIncomingDTagTransferRequestsRequest
  ): Promise<QueryIncomingDTagTransferRequestsResponse>
  /** Params queries the profiles module params */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>
  /**
   * Relationships queries all relationships for the given user, if provided.
   * Otherwise, it queries all the relationships stored.
   */
  Relationships(
    request: QueryRelationshipsRequest
  ): Promise<QueryRelationshipsResponse>
  /**
   * Blocks queries the blocks for the given user, if provided.
   * Otherwise, it queries all the stored blocks.
   */
  Blocks(request: QueryBlocksRequest): Promise<QueryBlocksResponse>
  /**
   * ChainLinks queries the chain links associated to the given user, if
   * provided. Otherwise it queries all the chain links stored.
   */
  ChainLinks(request: QueryChainLinksRequest): Promise<QueryChainLinksResponse>
  /**
   * UserChainLink queries the chain link for the given user, chain name and
   * target address
   */
  UserChainLink(
    request: QueryUserChainLinkRequest
  ): Promise<QueryUserChainLinkResponse>
  /**
   * ApplicationLinks queries the applications links associated to the given
   * user, if provided. Otherwise, it queries all the application links stored.
   */
  ApplicationLinks(
    request: QueryApplicationLinksRequest
  ): Promise<QueryApplicationLinksResponse>
  /**
   * UserApplicationLinks queries a single application link for a given user,
   * searching via the application name and username
   */
  UserApplicationLink(
    request: QueryUserApplicationLinkRequest
  ): Promise<QueryUserApplicationLinkResponse>
  /**
   * ApplicationLinkByClientID queries a single application link for a given
   * client id.
   */
  ApplicationLinkByClientID(
    request: QueryApplicationLinkByClientIDRequest
  ): Promise<QueryApplicationLinkByClientIDResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.Profile = this.Profile.bind(this)
    this.IncomingDTagTransferRequests =
      this.IncomingDTagTransferRequests.bind(this)
    this.Params = this.Params.bind(this)
    this.Relationships = this.Relationships.bind(this)
    this.Blocks = this.Blocks.bind(this)
    this.ChainLinks = this.ChainLinks.bind(this)
    this.UserChainLink = this.UserChainLink.bind(this)
    this.ApplicationLinks = this.ApplicationLinks.bind(this)
    this.UserApplicationLink = this.UserApplicationLink.bind(this)
    this.ApplicationLinkByClientID = this.ApplicationLinkByClientID.bind(this)
  }
  Profile(request: QueryProfileRequest): Promise<QueryProfileResponse> {
    const data = QueryProfileRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'Profile',
      data
    )
    return promise.then((data) => QueryProfileResponse.decode(new Reader(data)))
  }

  IncomingDTagTransferRequests(
    request: QueryIncomingDTagTransferRequestsRequest
  ): Promise<QueryIncomingDTagTransferRequestsResponse> {
    const data =
      QueryIncomingDTagTransferRequestsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'IncomingDTagTransferRequests',
      data
    )
    return promise.then((data) =>
      QueryIncomingDTagTransferRequestsResponse.decode(new Reader(data))
    )
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'Params',
      data
    )
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)))
  }

  Relationships(
    request: QueryRelationshipsRequest
  ): Promise<QueryRelationshipsResponse> {
    const data = QueryRelationshipsRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'Relationships',
      data
    )
    return promise.then((data) =>
      QueryRelationshipsResponse.decode(new Reader(data))
    )
  }

  Blocks(request: QueryBlocksRequest): Promise<QueryBlocksResponse> {
    const data = QueryBlocksRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'Blocks',
      data
    )
    return promise.then((data) => QueryBlocksResponse.decode(new Reader(data)))
  }

  ChainLinks(
    request: QueryChainLinksRequest
  ): Promise<QueryChainLinksResponse> {
    const data = QueryChainLinksRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'ChainLinks',
      data
    )
    return promise.then((data) =>
      QueryChainLinksResponse.decode(new Reader(data))
    )
  }

  UserChainLink(
    request: QueryUserChainLinkRequest
  ): Promise<QueryUserChainLinkResponse> {
    const data = QueryUserChainLinkRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'UserChainLink',
      data
    )
    return promise.then((data) =>
      QueryUserChainLinkResponse.decode(new Reader(data))
    )
  }

  ApplicationLinks(
    request: QueryApplicationLinksRequest
  ): Promise<QueryApplicationLinksResponse> {
    const data = QueryApplicationLinksRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'ApplicationLinks',
      data
    )
    return promise.then((data) =>
      QueryApplicationLinksResponse.decode(new Reader(data))
    )
  }

  UserApplicationLink(
    request: QueryUserApplicationLinkRequest
  ): Promise<QueryUserApplicationLinkResponse> {
    const data = QueryUserApplicationLinkRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'UserApplicationLink',
      data
    )
    return promise.then((data) =>
      QueryUserApplicationLinkResponse.decode(new Reader(data))
    )
  }

  ApplicationLinkByClientID(
    request: QueryApplicationLinkByClientIDRequest
  ): Promise<QueryApplicationLinkByClientIDResponse> {
    const data = QueryApplicationLinkByClientIDRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Query',
      'ApplicationLinkByClientID',
      data
    )
    return promise.then((data) =>
      QueryApplicationLinkByClientIDResponse.decode(new Reader(data))
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
