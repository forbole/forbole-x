/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Registry } from '@cosmjs/proto-signing'
import { defaultRegistryTypes } from '@cosmjs/stargate'
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { MsgSaveProfile } from '../../desmos-proto/profiles/v1beta1/msgs_profile'
import {
  MsgLinkChainAccount,
  MsgUnlinkChainAccount,
} from '../../desmos-proto/profiles/v1beta1/msgs_chain_links'
import { Bech32Address } from '../../desmos-proto/profiles/v1beta1/models_chain_links'

export const registry = new Registry([
  ...defaultRegistryTypes,
  ['/desmos.profiles.v1beta1.MsgSaveProfile', MsgSaveProfile],
  ['/desmos.profiles.v1beta1.MsgLinkChainAccount', MsgLinkChainAccount],
  ['/desmos.profiles.v1beta1.MsgUnlinkChainAccount', MsgUnlinkChainAccount],
] as any)

export const aminoAdditions = {
  '/desmos.profiles.v1beta1.MsgSaveProfile': {
    aminoType: 'desmos/MsgSaveProfile',
    toAmino: ({ dtag, nickname, bio, profilePicture, coverPicture, creator }) => ({
      dtag,
      nickname,
      bio,
      profile_picture: profilePicture,
      cover_picture: coverPicture,
      creator,
    }),
    fromAmino: ({ dtag, nickname, bio, profile_picture, cover_picture, creator }) => ({
      dtag,
      nickname,
      bio,
      profilePicture: profile_picture,
      coverPicture: cover_picture,
      creator,
    }),
  },
  '/desmos.profiles.v1beta1.MsgLinkChainAccount': {
    aminoType: 'desmos/MsgLinkChainAccount',
    toAmino: ({ chainAddress, proof, chainConfig, signer }) => ({
      chain_address: {
        type: 'desmos/Bech32Address',
        value: {
          ...Bech32Address.decode(chainAddress.value),
        },
      },
      chain_config: chainConfig,
      proof: {
        plain_text: proof.plainText,
        pub_key: {
          type: 'cosmos/PubKey',
          value: toBase64(PubKey.decode(proof.pubKey.value).key),
        },
        signeture: proof.signature,
      },
      signer,
    }),
    fromAmino: (v) => ({}),
  },
  '/desmos.profiles.v1beta1.MsgUnlinkChainAccount': {
    aminoType: 'desmos/MsgUnlinkChainAccount',
    toAmino: ({ chainName, owner, target }) => ({ chain_name: chainName, owner, target }),
    fromAmino: ({ chain_name, owner, target }) => ({ chainName: chain_name, owner, target }),
  },
}
