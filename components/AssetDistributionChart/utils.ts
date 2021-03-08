import numeral from 'numeral'
import { formatDenom } from '../../utils'
import { DelegationInfo } from '../../models'
import { chainConfig } from '../../config/chain_config'

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
    })
  }
}
