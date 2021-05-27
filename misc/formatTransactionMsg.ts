import camelCase from 'lodash/camelCase'
import cryptocurrencies from './cryptocurrencies'

const typeUrlMap = {
  'cosmos-sdk/MsgDelegate': '/cosmos.staking.v1beta1.MsgDelegate',
  'cosmos-sdk/MsgUndelegate': '/cosmos.staking.v1beta1.MsgUndelegate',
  'cosmos-sdk/MsgBeginRedelegate': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  'cosmos-sdk/MsgWithdrawDelegationReward':
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  'cosmos-sdk/MsgSend': '/cosmos.bank.v1beta1.MsgSend',
}

const formatCosmosTransactionMsg = ({ type, ...params }: TransactionMsg) => {
  if (type === 'delegate') {
    const { delegator, validator, amount, denom } = params as TransactionMsgDelegate
    return {
      type: 'cosmos-sdk/MsgDelegate',
      value: {
        delegator_address: delegator,
        validator_address: validator,
        amount: { amount: amount.toString(), denom },
      },
    }
  }
  if (type === 'undelegate') {
    const { delegator, validator, amount, denom } = params as TransactionMsgDelegate
    return {
      type: 'cosmos-sdk/MsgUndelegate',
      value: {
        delegator_address: delegator,
        validator_address: validator,
        amount: { amount: amount.toString(), denom },
      },
    }
  }
  if (type === 'redelegate') {
    const {
      delegator,
      fromValidator,
      toValidator,
      amount,
      denom,
    } = params as TransactionMsgRedelegate
    return {
      type: 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        delegator_address: delegator,
        validator_src_address: fromValidator,
        validator_dst_address: toValidator,
        amount: { amount: amount.toString(), denom },
      },
    }
  }
  if (type === 'withdraw reward') {
    const { delegator, validator } = params as TransactionMsgWithdrawReward
    return {
      type: 'cosmos-sdk/MsgWithdrawDelegationReward',
      value: {
        delegator_address: delegator,
        validator_address: validator,
      },
    }
  }
  if (type === 'send') {
    const { from, to, amount, denom } = params as TransactionMsgSend
    return {
      type: 'cosmos-sdk/MsgSend',
      value: {
        from_address: from,
        to_address: to,
        amount: [{ amount: amount.toString(), denom }],
      },
    }
  }
  return null
}

export const formatTransactionMsg = (crypto: string, msg: TransactionMsg) => {
  const { ecosystem } = cryptocurrencies[crypto] || {}
  if (ecosystem === 'cosmos') {
    return formatCosmosTransactionMsg(msg)
  }
  return null
}

export const formatRawTransactionData = (crypto: string, transactionMsg: any) => {
  const { ecosystem } = cryptocurrencies[crypto] || {}
  if (ecosystem === 'cosmos') {
    return {
      fee: transactionMsg.gasFee,
      msgs: transactionMsg.transactions,
      memo: transactionMsg.memo,
    }
  }
  return null
}

export const formatTypeUrlTransactionMsg = (msg: any) => {
  const transformedMsg: any = {}
  transformedMsg.typeUrl = typeUrlMap[msg.type]
  transformedMsg.value = {}
  Object.keys(msg.value).forEach((k) => {
    transformedMsg.value[camelCase(k)] = msg.value[k]
  })
  return transformedMsg
}
