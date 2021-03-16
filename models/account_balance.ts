import * as R from 'ramda'
import numeral from 'numeral'
import { chainConfig } from '../config/chain_config'

class AccountBalance {
  public address: string
  public total: number

  constructor(payload: any) {
    this.address = payload.address
    this.total = payload.total
  }

  static fromJson(data: any) {
    // ==========================
    // base
    // ==========================
    const account = R.pathOr({}, ['account', 0], data)

    // ==========================
    // available
    // ==========================
    const available = R.pathOr(
      0,
      [0, 'amount'],
      R.pathOr([], ['available', 0, 'coins'], account).filter((x) => x.denom === chainConfig.base));

    // ==========================
    // delegate
    // ==========================
    const delegate = R.pathOr([], ['delegations'], account)
      .filter((x) => x?.amount?.denom === chainConfig.base)
      .reduce((a, b) => {
        return a + numeral(b?.amount?.amount).value()
      }, 0)

    // ==========================
    // unbonding
    // ==========================
    const unbonding = R.pathOr([], ['unbonding'], account)
      .filter((x) => x?.amount?.denom === chainConfig.base)
      .reduce((a, b) => {
        return a + numeral(b?.amount?.amount).value()
      }, 0)

    // ==========================
    // rewards
    // ==========================
    const reward = R.pathOr([], ['rewards'], account)
      .map((x) => {
        return x?.amount?.filter((y) => {
          return y?.denom === chainConfig.base
        })
      })
      .reduce((a, b) => {
        const amount = b.reduce((c, d) => {
          return c + numeral(d?.amount).value()
        }, 0)
        return a + numeral(amount).value()
      }, 0)
    // ==========================
    // address
    // ==========================
    const address = R.pathOr('', ['account', 0, 'address'], data)

    // ==========================
    // commissions
    // ==========================
    const commission = numeral(
      R.pathOr(
        0,
        [0, 'amount'],
        R.pathOr([], ['validator', 0, 'commissions', 0, 'amount'], data).filter(
          (x: { denom: string }) => x?.denom === chainConfig.base
        )
      )
    ).value()

    const total = available + delegate + unbonding + reward + commission;
    return new AccountBalance({
      address,
      total,
    })
  }
}

export default AccountBalance
