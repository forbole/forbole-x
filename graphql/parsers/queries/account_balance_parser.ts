import * as R from 'ramda'
import { AccountBalance } from '../../../models'

export const accountBalanceParser = (data: any): AccountBalance | null => {
  const check = R.pathOr(null, ['account', 0, 'address'], data)
  if (check) {
    return AccountBalance.fromJson(data)
  }
  return null
}
