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
    const device = await ledgerApp.getVersion()
    const signature = await ledgerApp.sign([44, 118, 0, 0, accountIndex], {
      account_number: transactionData.accountNumber.toString(),
      chain_id: transactionData.chainId,
      fee: transactionData.gasFee,
      memo: transactionData.memo,
      msgs: transactionData.transactions,
      sequence: transactionData.sequence.toString(),
    })
    const result = await sendMsgToChromeExt({
      event: 'broadcastTransactions',
      data: {
        password: transactionData.password,
        address: transactionData.address,
        signed: signature.signature,
      },
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
