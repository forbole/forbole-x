import { formatDenom } from '../../utils'
import { UserInfo } from '../../models'
import { chainConfig } from '../../config/chain_config'

export const formatData = (data:UserInfo) => {
  return {
    address: data.address,
    rewardAddress: data.rewardAddress,
    total: formatDenom(chainConfig.display, data.total),
    available: formatDenom(chainConfig.display, data.available, '0,0.00[0000]'),
    delegate: formatDenom(chainConfig.display, data.delegate, '0,0.00[0000]'),
    unbonding: formatDenom(chainConfig.display, data.unbonding, '0,0.00[0000]'),
    reward: formatDenom(chainConfig.display, data.reward, '0,0.00[0000]'),
    commission: formatDenom(chainConfig.display, data.commission, '0,0.00[0000]'),
    price: data.price,
  }
}
