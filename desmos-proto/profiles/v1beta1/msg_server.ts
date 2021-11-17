/* eslint-disable */
import { util, configure, Reader } from 'protobufjs/minimal'
import * as Long from 'long'
import {
  MsgSaveProfileResponse,
  MsgDeleteProfileResponse,
  MsgSaveProfile,
  MsgDeleteProfile,
} from '../../../desmos/profiles/v1beta1/msgs_profile'
import {
  MsgRequestDTagTransferResponse,
  MsgCancelDTagTransferRequestResponse,
  MsgAcceptDTagTransferRequestResponse,
  MsgRefuseDTagTransferRequestResponse,
  MsgRequestDTagTransfer,
  MsgCancelDTagTransferRequest,
  MsgAcceptDTagTransferRequest,
  MsgRefuseDTagTransferRequest,
} from '../../../desmos/profiles/v1beta1/msgs_dtag_requests'
import {
  MsgCreateRelationshipResponse,
  MsgDeleteRelationshipResponse,
  MsgBlockUserResponse,
  MsgUnblockUserResponse,
  MsgCreateRelationship,
  MsgDeleteRelationship,
  MsgBlockUser,
  MsgUnblockUser,
} from '../../../desmos/profiles/v1beta1/msgs_relationships'
import {
  MsgLinkChainAccountResponse,
  MsgUnlinkChainAccountResponse,
  MsgLinkChainAccount,
  MsgUnlinkChainAccount,
} from '../../../desmos/profiles/v1beta1/msgs_chain_links'
import {
  MsgLinkApplicationResponse,
  MsgUnlinkApplicationResponse,
  MsgLinkApplication,
  MsgUnlinkApplication,
} from '../../../desmos/profiles/v1beta1/msgs_app_links'

export const protobufPackage = 'desmos.profiles.v1beta1'

/** Msg defines the relationships Msg service. */
export interface Msg {
  /** SaveProfile defines the method to save a profile */
  SaveProfile(request: MsgSaveProfile): Promise<MsgSaveProfileResponse>
  /** DeleteProfile defines the method to delete an existing profile */
  DeleteProfile(request: MsgDeleteProfile): Promise<MsgDeleteProfileResponse>
  /**
   * RequestDTagTransfer defines the method to request another user to transfer
   * their DTag to you
   */
  RequestDTagTransfer(
    request: MsgRequestDTagTransfer
  ): Promise<MsgRequestDTagTransferResponse>
  /**
   * CancelDTagTransferRequest defines the method to cancel an outgoing DTag
   * transfer request
   */
  CancelDTagTransferRequest(
    request: MsgCancelDTagTransferRequest
  ): Promise<MsgCancelDTagTransferRequestResponse>
  /**
   * AcceptDTagTransferRequest defines the method to accept an incoming DTag
   * transfer request
   */
  AcceptDTagTransferRequest(
    request: MsgAcceptDTagTransferRequest
  ): Promise<MsgAcceptDTagTransferRequestResponse>
  /**
   * RefuseDTagTransferRequest defines the method to refuse an incoming DTag
   * transfer request
   */
  RefuseDTagTransferRequest(
    request: MsgRefuseDTagTransferRequest
  ): Promise<MsgRefuseDTagTransferRequestResponse>
  /** CreateRelationship defines a method for creating a new relationship */
  CreateRelationship(
    request: MsgCreateRelationship
  ): Promise<MsgCreateRelationshipResponse>
  /** DeleteRelationship defines a method for deleting a relationship */
  DeleteRelationship(
    request: MsgDeleteRelationship
  ): Promise<MsgDeleteRelationshipResponse>
  /** BlockUser defines a method for blocking a user */
  BlockUser(request: MsgBlockUser): Promise<MsgBlockUserResponse>
  /** UnblockUser defines a method for unblocking a user */
  UnblockUser(request: MsgUnblockUser): Promise<MsgUnblockUserResponse>
  /**
   * LinkChainAccount defines a method to link an external chain account to a
   * profile
   */
  LinkChainAccount(
    request: MsgLinkChainAccount
  ): Promise<MsgLinkChainAccountResponse>
  /**
   * UnlinkChainAccount defines a method to unlink an external chain account
   * from a profile
   */
  UnlinkChainAccount(
    request: MsgUnlinkChainAccount
  ): Promise<MsgUnlinkChainAccountResponse>
  /**
   * LinkApplication defines a method to create a centralized application
   * link
   */
  LinkApplication(
    request: MsgLinkApplication
  ): Promise<MsgLinkApplicationResponse>
  /** UnlinkApplication defines a method to remove a centralized application */
  UnlinkApplication(
    request: MsgUnlinkApplication
  ): Promise<MsgUnlinkApplicationResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.SaveProfile = this.SaveProfile.bind(this)
    this.DeleteProfile = this.DeleteProfile.bind(this)
    this.RequestDTagTransfer = this.RequestDTagTransfer.bind(this)
    this.CancelDTagTransferRequest = this.CancelDTagTransferRequest.bind(this)
    this.AcceptDTagTransferRequest = this.AcceptDTagTransferRequest.bind(this)
    this.RefuseDTagTransferRequest = this.RefuseDTagTransferRequest.bind(this)
    this.CreateRelationship = this.CreateRelationship.bind(this)
    this.DeleteRelationship = this.DeleteRelationship.bind(this)
    this.BlockUser = this.BlockUser.bind(this)
    this.UnblockUser = this.UnblockUser.bind(this)
    this.LinkChainAccount = this.LinkChainAccount.bind(this)
    this.UnlinkChainAccount = this.UnlinkChainAccount.bind(this)
    this.LinkApplication = this.LinkApplication.bind(this)
    this.UnlinkApplication = this.UnlinkApplication.bind(this)
  }
  SaveProfile(request: MsgSaveProfile): Promise<MsgSaveProfileResponse> {
    const data = MsgSaveProfile.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'SaveProfile',
      data
    )
    return promise.then((data) =>
      MsgSaveProfileResponse.decode(new Reader(data))
    )
  }

  DeleteProfile(request: MsgDeleteProfile): Promise<MsgDeleteProfileResponse> {
    const data = MsgDeleteProfile.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'DeleteProfile',
      data
    )
    return promise.then((data) =>
      MsgDeleteProfileResponse.decode(new Reader(data))
    )
  }

  RequestDTagTransfer(
    request: MsgRequestDTagTransfer
  ): Promise<MsgRequestDTagTransferResponse> {
    const data = MsgRequestDTagTransfer.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'RequestDTagTransfer',
      data
    )
    return promise.then((data) =>
      MsgRequestDTagTransferResponse.decode(new Reader(data))
    )
  }

  CancelDTagTransferRequest(
    request: MsgCancelDTagTransferRequest
  ): Promise<MsgCancelDTagTransferRequestResponse> {
    const data = MsgCancelDTagTransferRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'CancelDTagTransferRequest',
      data
    )
    return promise.then((data) =>
      MsgCancelDTagTransferRequestResponse.decode(new Reader(data))
    )
  }

  AcceptDTagTransferRequest(
    request: MsgAcceptDTagTransferRequest
  ): Promise<MsgAcceptDTagTransferRequestResponse> {
    const data = MsgAcceptDTagTransferRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'AcceptDTagTransferRequest',
      data
    )
    return promise.then((data) =>
      MsgAcceptDTagTransferRequestResponse.decode(new Reader(data))
    )
  }

  RefuseDTagTransferRequest(
    request: MsgRefuseDTagTransferRequest
  ): Promise<MsgRefuseDTagTransferRequestResponse> {
    const data = MsgRefuseDTagTransferRequest.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'RefuseDTagTransferRequest',
      data
    )
    return promise.then((data) =>
      MsgRefuseDTagTransferRequestResponse.decode(new Reader(data))
    )
  }

  CreateRelationship(
    request: MsgCreateRelationship
  ): Promise<MsgCreateRelationshipResponse> {
    const data = MsgCreateRelationship.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'CreateRelationship',
      data
    )
    return promise.then((data) =>
      MsgCreateRelationshipResponse.decode(new Reader(data))
    )
  }

  DeleteRelationship(
    request: MsgDeleteRelationship
  ): Promise<MsgDeleteRelationshipResponse> {
    const data = MsgDeleteRelationship.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'DeleteRelationship',
      data
    )
    return promise.then((data) =>
      MsgDeleteRelationshipResponse.decode(new Reader(data))
    )
  }

  BlockUser(request: MsgBlockUser): Promise<MsgBlockUserResponse> {
    const data = MsgBlockUser.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'BlockUser',
      data
    )
    return promise.then((data) => MsgBlockUserResponse.decode(new Reader(data)))
  }

  UnblockUser(request: MsgUnblockUser): Promise<MsgUnblockUserResponse> {
    const data = MsgUnblockUser.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'UnblockUser',
      data
    )
    return promise.then((data) =>
      MsgUnblockUserResponse.decode(new Reader(data))
    )
  }

  LinkChainAccount(
    request: MsgLinkChainAccount
  ): Promise<MsgLinkChainAccountResponse> {
    const data = MsgLinkChainAccount.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'LinkChainAccount',
      data
    )
    return promise.then((data) =>
      MsgLinkChainAccountResponse.decode(new Reader(data))
    )
  }

  UnlinkChainAccount(
    request: MsgUnlinkChainAccount
  ): Promise<MsgUnlinkChainAccountResponse> {
    const data = MsgUnlinkChainAccount.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'UnlinkChainAccount',
      data
    )
    return promise.then((data) =>
      MsgUnlinkChainAccountResponse.decode(new Reader(data))
    )
  }

  LinkApplication(
    request: MsgLinkApplication
  ): Promise<MsgLinkApplicationResponse> {
    const data = MsgLinkApplication.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'LinkApplication',
      data
    )
    return promise.then((data) =>
      MsgLinkApplicationResponse.decode(new Reader(data))
    )
  }

  UnlinkApplication(
    request: MsgUnlinkApplication
  ): Promise<MsgUnlinkApplicationResponse> {
    const data = MsgUnlinkApplication.encode(request).finish()
    const promise = this.rpc.request(
      'desmos.profiles.v1beta1.Msg',
      'UnlinkApplication',
      data
    )
    return promise.then((data) =>
      MsgUnlinkApplicationResponse.decode(new Reader(data))
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
