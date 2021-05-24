import { Cosmos } from 'ledger-app-cosmos'
import { formatTypeUrlTransactionMsg } from './formatTransactionMsg'
import sendMsgToChromeExt from './sendMsgToChromeExt'

const sendTransaction = async (
  transactionData: {
    address: string
    securityPassword: string
    password: string
    transactions: any[]
    gasFee: any
    memo?: string
    sequence?: number
    accountNumber?: number
    chainId?: string
  },
  ledgerApp?: Cosmos,
  accountIndex?: number
): Promise<any> => {
  if (ledgerApp) {
    const result = await ledgerApp.sign([44, 118, 0, 0, accountIndex], {
      account_number: transactionData.accountNumber,
      chain_id: transactionData.chainId,
      sequence: transactionData.sequence,
      fee: transactionData.gasFee,
      memo: transactionData.memo,
      msgs: transactionData.transactions,
    })
    return result
  }
  const result = await sendMsgToChromeExt({
    event: 'signAndBroadcastTransactions',
    data: {
      ...transactionData,
      transactions: transactionData.transactions.map((msg) => formatTypeUrlTransactionMsg(msg)),
    },
  })
  return result
}

export default sendTransaction
