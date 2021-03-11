import * as R from 'ramda'
import { DelegationInfo } from '../../../models'

export const delegationInfoParser = (data: any): DelegationInfo | null => {
  const check = R.pathOr(null, ['account', 0], data)
  console.log('data', data)
  if (check) {
    return DelegationInfo.fromJson(data)
  }
  // return null
  return {
    address: '',
    delegationTotal: 0,
    delegation: [
      {
        validatorAddress: '',
        validatorMoniker: '',
        amount: 0,
      },
    ],
  }
}
