import * as R from 'ramda'
import numeral from 'numeral'
import { chainConfig } from '../config/chain_config'

class AssetInfo {
  public address: string
  public delegate: number
  public total: number
  public delegationDetail?: {
    validatorAddress: string
    validatorMoniker: string
    amount: number
  }[]
  public crypto: string
  public fav: boolean
  public name: string
  public walletId: string

  constructor(payload: any) {
    this.address = payload.address
    this.delegate = payload.delegate
    this.total = payload.total
    this.delegationDetail = payload.delegationDetail
    this.crypto = payload.crypto
    this.fav = payload.fav
    this.name = payload.name
    this.walletId = payload.walletId
  }

  static fromJson(data: any, account?: Account) {
    const address = R.pathOr('', ['account', 0, 'address'], data)

    const baseAccount = R.pathOr({}, ['account', 0], data)

    const available = R.pathOr(
      0,
      [0, 'amount'],
      R.pathOr([], ['available', 0, 'coins'], baseAccount).filter((x) => x.denom === chainConfig.base)
    )

    const delegate = R.pathOr([], ['delegations'], baseAccount)
      .filter((x) => x?.amount?.denom === chainConfig.base)
      .reduce((a, b) => {
        return a + numeral(b?.amount?.amount).value()
      }, 0)

    const unbonding = R.pathOr([], ['unbonding'], baseAccount)
      .filter((x) => x?.amount?.denom === chainConfig.base)
      .reduce((a, b) => {
        return a + numeral(b?.amount?.amount).value()
      }, 0)

    const reward = R.pathOr([], ['rewards'], baseAccount)
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

    const commission = numeral(
      R.pathOr(
        0,
        [0, 'amount'],
        R.pathOr([], ['validator', 0, 'commissions', 0, 'amount'], data).filter(
          (x) => x?.denom === chainConfig.base
        )
      )
    ).value()

    const total = available + delegate + unbonding + reward + commission

    const delegationDetail = R.pathOr(
      [{ validatorAddress: '', validatorMoniker: '', amount: 0 }],
      ['account', 0, 'delegations'],
      data
    ).map((delegation) => {
      return {
        validatorAddress: delegation?.validator_address,
        validatorMoniker: R.pathOr(
          '',
          ['validator', 'validator_descriptions', 0, 'moniker'],
          delegation
        ),
        amount: delegation.amount.denom === chainConfig.base ? Number(delegation.amount.amount) : 0,
      }
    })

    return new AssetInfo({
      address: account ? account.address : '',
      delegate,
      total,
      delegationDetail,
      crypto: account ? account.crypto : '',
      fav: account ? account.fav : false,
      name: account ? account.name : '',
      walletId: account ? account.walletId : '',
    })
  }
}

export default AssetInfo
