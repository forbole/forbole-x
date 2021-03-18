import * as R from 'ramda'
import { AssetInfo } from '../../../models'

export const assetInfoParser = (data: any, account: Account): AssetInfo | null => {
  const check = R.pathOr(null, ['account', 0], data)
  // console.log('check', check)
  if (check) {
    return AssetInfo.fromJson(data, account)
  }
  return null
  // {
  //   address: account.address,
  //   total: 0,
  //   delegate: 0,
  //   delegationDetail: [
  //     {
  //       validatorAddress: '',
  //       validatorMoniker: '',
  //       amount: 0,
  //     },
  //   ],
  //   crypto: account.crypto,
  //   fav: account.fav,
  //   name: account.name,
  //   walletId: account.walletId,
  // }
}
