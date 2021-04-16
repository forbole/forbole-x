import cryptocurrencies from './cryptocurrencies'

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

const formatTransactionMsg = (crypto: string, msg: TransactionMsg) => {
  const { ecosystem } = cryptocurrencies[crypto] || {}
  if (ecosystem === 'cosmos') {
    return formatCosmosTransactionMsg(msg)
  }
  return null
}

export default formatTransactionMsg
