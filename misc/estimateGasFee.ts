import snakeCase from 'lodash/snakeCase'
import transform from 'lodash/transform'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import { Registry } from '@cosmjs/proto-signing'
import { defaultRegistryTypes } from '@cosmjs/stargate'
import cryptocurrencies from './cryptocurrencies'

const recursiveSnakeCase = (obj: any) =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : snakeCase(String(key))
    acc[camelKey] = isObject(value) ? recursiveSnakeCase(value) : value
  })

const estimateGasFee = async (tx: Transaction, account: Account) => {
  const crypto = cryptocurrencies[account.crypto]
  const registry = new Registry(defaultRegistryTypes)
  const txBodyEncodeObject = {
    typeUrl: '/cosmos.tx.v1beta1.TxBody',
    value: {
      messages: tx.msgs,
      memo: tx.memo,
    },
  }
  const txBodyBytes = registry.encode(txBodyEncodeObject)
  const result = await fetch(`${crypto.lcdApiUrl}/cosmos/tx/v1beta1/simulate`, {
    method: 'POST',
    body: JSON.stringify({
      // tx: {
      //   body: {
      //     messages: tx.msgs.map((msg) => registry.encode()),
      //     memo: tx.memo,
      //   },
      // },
      tx_bytes: txBodyBytes.toString(),
    }),
  }).then((r) => r.json())

  return result
}

export default estimateGasFee
