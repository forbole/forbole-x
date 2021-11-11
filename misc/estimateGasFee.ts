import snakeCase from 'lodash/snakeCase'
import transform from 'lodash/transform'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import { StargateClient } from '@cosmjs/stargate'
import cryptocurrencies from './cryptocurrencies'

const recursiveSnakeCase = (obj: any): any =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : snakeCase(String(key))
    acc[camelKey] = isObject(value) ? recursiveSnakeCase(value) : value
  })

const estimateGasFee = async (
  tx: Transaction,
  account: Account
): Promise<{
  amount: Array<{ amount: string; denom: string }>
  gas: string
}> => {
  const crypto = cryptocurrencies[account.crypto]
  const stargateClient = await StargateClient.connect(crypto.rpcApiUrl)
  const accountInfo = await stargateClient.getAccount(account.address)
  const result = await fetch(`${crypto.lcdApiUrl}/cosmos/tx/v1beta1/simulate`, {
    method: 'POST',
    body: JSON.stringify({
      tx: {
        body: {
          messages: tx.msgs.map((msg) => ({
            '@type': msg.typeUrl,
            ...recursiveSnakeCase(msg.value),
          })),
          memo: tx.memo,
        },
        auth_info: {
          signer_infos: [
            {
              public_key: {
                '@type': '/cosmos.crypto.secp256k1.PubKey',
                key: get(accountInfo, 'pubkey.value', ''),
              },
              mode_info: {
                single: {
                  mode: 'SIGN_MODE_UNSPECIFIED',
                },
              },
              sequence: String(get(accountInfo, 'sequence', '')),
            },
          ],
          fee: {
            amount: [
              {
                denom: crypto.gasFee.denom,
                amount: '0',
              },
            ],
            gas_limit: '0',
            payer: account.address,
          },
        },
        signatures: [''],
      },
    }),
  }).then((r) => r.json())
  const gas =
    Math.round(Number(get(result, 'gas_info.gas_used', '0')) * crypto.gasAdjustment) ||
    tx.msgs.map((msg) => crypto.defaultGas[msg.typeUrl]).reduce((a, b) => a + b, 0)
  return {
    amount: [
      { amount: String(Math.round(gas * crypto.gasFee.amount)), denom: crypto.gasFee.denom },
    ],
    gas: String(gas),
  }
}

export default estimateGasFee
