import * as R from 'ramda'
import { AssetInfo } from '../../../models'

export const assetInfoParser = (data: any): AssetInfo | null => {
  const check = R.pathOr(null, ['account', 0], data)
  if (check) {
    return AssetInfo.fromJson(data)
  }
  return {
    address: '',
    total: 0,
    delegate: 0,
    delegationDetail: [
      {
        validatorAddress: '',
        validatorMoniker: '',
        amount: 0,
      },
    ],
  }
}
