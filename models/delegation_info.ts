import * as R from 'ramda'
import numeral from 'numeral'
import { chainConfig } from '../config/chain_config'

class DelegationInfo {
  public address: string
  delegationTotal: number
  public delegation?: {
    validatorAddress: string
    validatorMoniker: string
    amount: number
  }[]

  constructor(payload: any) {
    this.address = payload.address
    this.delegationTotal = payload.delegationTotal
    this.delegation = payload.delegation
  }

  static fromJson(data: any) {
    return new DelegationInfo({
      address: R.pathOr('', ['account', 0, 'address'], data),
      delegationTotal: R.pathOr([], ['account', 0, 'delegations'], data)
        .filter((x) => x?.amount?.denom === chainConfig.base)
        .reduce((a, b) => {
          return a + numeral(b?.amount?.amount).value()
        }, 0),
      delegation: R.pathOr(
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
          amount:
            delegation.amount.denom === chainConfig.base ? Number(delegation.amount.amount) : 0,
        }
      }),
    })
  }
}

export default DelegationInfo
