import numeral from 'numeral'
import { DelegationInfo } from '../../models'

export const formatData = (data: DelegationInfo) => {
  return {
    address: data.address,
    delegationTotal: data.delegationTotal,
    delegation: data.delegation.map((delegation) => {
      return {
        validatorAddress: delegation?.validatorAddress,
        validatorMoniker: delegation?.validatorMoniker,
        amount: delegation?.amount,
        value: numeral(delegation?.amount / data.delegationTotal).format('0.00%'),
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
}

interface FormatData {
  address: string
  delegationTotal: number
  delegation: {
    validatorAddress: string
    validatorMoniker: string
    amount: number
    value: string
  }[]
}

export const summarizedData = (dataList: FormatData[]) => {
  const summery: Summery = {
    totalAmount: 0,
    delegation: [],
  }

  if (dataList.length !== 0) {
    dataList.forEach((data) => {
      summery.totalAmount += data.delegationTotal
      data.delegation.forEach((validator) => {
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
    })
    summery.delegation.forEach((x) => {
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
        value: '0%',
      },
    ],
  }
}
