import numeral from 'numeral'
import { AssetInfo } from '../../models'

export const formatData = (data: AssetInfo, crypto: string) => {
  return {
    address: data.address,
    total: data.total,
    delegate: data.delegate,
    crypto,
    delegationDetail: data.delegationDetail.map((delegation) => {
      return {
        validatorAddress: delegation.validatorAddress,
        validatorMoniker: delegation.validatorMoniker,
        amount: delegation.amount,
      }
    }),
  }
}

interface Summery {
  totalAmount: number
  delegation: {
    validatorMoniker: string
    amount: number
    value?: string
  }[]
  coinDetail: {
    crypto: string
    amount: number
    value?: string
  }[]
}

interface FormatData {
  address: string
  total: number
  delegate: number
  crypto: string
  delegationDetail: {
    validatorAddress: string
    validatorMoniker: string
    amount: number
  }[]
}

export const summarizedData = (dataList: FormatData[]) => {
  const summery: Summery = {
    totalAmount: 0,
    delegation: [],
    coinDetail: [],
  }

  if (dataList.length !== 0) {
    dataList.forEach((data) => {
      summery.totalAmount += data.delegate
      data.delegationDetail.forEach((validator) => {
        const index = summery.delegation.findIndex(
          (x) => x.validatorMoniker === validator.validatorMoniker
        )
        if (index !== -1) {
          summery.delegation[index].amount += validator.amount
        } else {
          summery.delegation.push({
            validatorMoniker: validator.validatorMoniker,
            amount: validator.amount,
          })
        }
      })

      const indexCoin = summery.coinDetail.findIndex((i) => data.crypto === i.crypto)
      console.log('indexCoin', indexCoin)
      if (indexCoin !== -1) {
        summery.coinDetail[indexCoin].amount += data.total
      } else {
        summery.coinDetail.push({
          crypto: data.crypto,
          amount: data.total,
        })
      }

    })
    summery.delegation.forEach((x) => {
      // eslint-disable-next-line no-param-reassign
      x.value = numeral(x.amount / summery.totalAmount).format('0.00%')
    })

    summery.coinDetail.forEach((x) => {
      // eslint-disable-next-line no-param-reassign
      x.value = numeral(x.amount / summery.totalAmount).format('0.00%')
    })

    return summery
  }
  return {
    totalAmount: 0,
    delegation: [
      {
        validatorMoniker: '',
        amount: 0,
        value: '0.00%',
      },
    ],
    coinDetail: [
      {
        crypto: '',
        amount: 0,
        value: '0.00%',
      },
    ],
  }
}
