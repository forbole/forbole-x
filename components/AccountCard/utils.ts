import { formatDenom } from '../../utils'
import { AccountBalance } from '../../models'
import { chainConfig } from '../../config/chain_config'

export const formatData = (data: AccountBalance) => {
  return {
    address: data.address,
    total: formatDenom(chainConfig.display, data.total),
  }
}
