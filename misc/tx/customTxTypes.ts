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
    toAmino: ({ chainAddress, proof, chainConfig, signer }) => {
      const chainAddressValue = Bech32Address.decode(chainAddress.value)
      const pubKey = PubKey.decode(proof.pubKey.value)
      return {
        chain_address: {
          type: 'desmos/Bech32Address',
          value: {
            prefix: chainAddressValue.prefix,
            value: chainAddressValue.value,
          },
        },
        chain_config: chainConfig,
        proof: {
          plain_text: proof.plainText,
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: toBase64(pubKey.key),
          },
          signature: proof.signature,
        },
        signer,
      }
    },
    fromAmino: ({ chain_address, proof, chain_config, signer }) => {
      return {
        chainAddress: {
          typeUrl: '/desmos.profiles.v1beta1.Bech32Address',
          value: Bech32Address.encode({
            prefix: chain_address.value.prefix,
            value: chain_address.value.value,
          }).finish(),
        },
        chainConfig: chain_config,
        proof: {
          plainText: proof.plain_text,
          pubKey: {
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            value: PubKey.encode({
              key: fromBase64(proof.pub_key.value),
            }).finish(),
          },
          signature: proof.signature,
        },
        signer,
      }
    },
  },
  '/desmos.profiles.v1beta1.MsgUnlinkChainAccount': {
    aminoType: 'desmos/MsgUnlinkChainAccount',
    toAmino: ({ chainName, owner, target }) => ({ chain_name: chainName, owner, target }),
    fromAmino: ({ chain_name, owner, target }) => ({ chainName: chain_name, owner, target }),
  },
}
