import snakeCase from 'lodash/snakeCase';
import transform from 'lodash/transform';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import get from 'lodash/get';
import { StargateClient } from '@cosmjs/stargate';
import cryptocurrencies from '../cryptocurrencies';

const transformMsg = (obj: any): any =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : snakeCase(String(key));
    const childKeys = Object.keys(value);
    if (childKeys.length === 2 && childKeys.includes('typeUrl') && childKeys.includes('value')) {
      acc[camelKey] = {
        '@type': value.typeUrl,
        ...transformMsg(isObject(value.value) ? value.value : { key: value.value }),
      };
    } else {
      acc[camelKey] = isObject(value) ? transformMsg(value) : value;
    }
  });

export const transformFee = (crypto: Cryptocurrency, gas: number) => {
  const fee: any = {
    amount: [{ amount: String(Math.ceil(gas * crypto.gasFee.amount)), denom: crypto.gasFee.denom }],
    gas: String(gas),
  };
  return fee;
};

const estimateGasFee = async (
  tx: Transaction,
  account: Account,
): Promise<{
  amount: Array<{ amount: string; denom: string }>;
  gas: string;
}> => {
  const crypto = cryptocurrencies[account.crypto];
  try {
    const stargateClient = await StargateClient.connect(crypto.rpcApiUrl);
    const accountInfo = await stargateClient.getAccount(account.address);
    const body: any = {
      tx: {
        body: {
          messages: tx.msgs.map(msg => ({
            '@type': msg.typeUrl,
            ...transformMsg(msg.value),
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
          },
        },
        signatures: [''],
      },
    };

    const result = await fetch(`${crypto.lcdApiUrl}/cosmos/tx/v1beta1/simulate`, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(r => r.json());
    const gas =
      Math.round(Number(get(result, 'gas_info.gas_used', '0')) * crypto.gasAdjustment) ||
      tx.msgs.map(msg => crypto.defaultGas[msg.typeUrl]).reduce((a, b) => a + b, 0);
    const fee = transformFee(crypto, gas);
    return fee;
  } catch (err) {
    const gas = tx.msgs.map(msg => crypto.defaultGas[msg.typeUrl]).reduce((a, b) => a + b, 0);
    const fee = transformFee(crypto, gas);
    return fee;
  }
};

export default estimateGasFee;
