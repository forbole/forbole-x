const getGqlDateFormat = (date: Date) => date.toISOString().split('.')[0]

const now = getGqlDateFormat(new Date())

export const getLatestAccountBalance = (crypto: string): string => `
  subscription AccountBalance($address: String!) {
    account(where: {address: {_eq: $address}}) {
      address
      available: account_balances(limit: 1, order_by: {height: desc}) {
        coins
        height
        tokens_prices {
          unit_name
          price
          timestamp
          token_unit {
            denom
            exponent
            token {
              token_units {
                denom
                exponent
              }
            }
          }
        }
      }
      delegated: delegations(distinct_on: [validator_address], order_by: [{validator_address: desc}, {height: desc}]) {
        amount
        validator {
          validator_info {
            operator_address
          }
        }
        validator_address
      }
      unbonding: unbonding_delegations(where: {completion_timestamp: {_gt: "${now}"}}, order_by: [{validator_address: desc}, {height: desc}]) {
        amount
        completion_timestamp
        height
        validator {
          validator_info {
            operator_address
          }
        }
        validator_address
      }
      rewards: delegation_rewards(distinct_on: [validator_address], order_by: [{validator_address: desc}, {height: desc}]) {
        amount
        validator {
          validator_info {
            operator_address
          }
        }
        validator_address
      }
      validator: validator_infos(where: {self_delegate_address: {_eq: $address}}) {
        consensus_address
        operator_address
        self_delegate_address
        validator {
          commissions: validator_commission_amounts(limit: 1, order_by: {height: desc}) {
            amount
          }
        }
      }
    }
  }  
`

export const getBalanceAtTimestamp = (crypto: string): string => `
  query AccountBalance($address: String!, $timestamp: timestamp! ) {
    account_balance_history(limit: 1, order_by: { timestamp: desc }, where: { address: { _eq: $address }, timestamp: { _lte: $timestamp } }) {
      address
      balance
      delegated
      unbonding
      commission
      redelegating
      reward
      timestamp
      tokens_prices: token_prices_history {
        unit_name
        price
        timestamp
        token_unit {
          denom
          exponent
          token {
            token_units {
              denom
              exponent
            }
          }
        }
      }
    }
  }
`

export const getBalance = (crypto: string, availableBalanceOnly?: boolean): string => `
query AccountBalance($address: String!) {
  account(where: {address: {_eq: $address}}) {
    address
    available: account_balances(limit: 1, order_by: {height: desc}) {
      coins
      height
      tokens_prices {
        unit_name
        price
        timestamp
        token_unit {
          denom
          exponent
          token {
            token_units {
              denom
              exponent
            }
          }
        }
      }
    }
    ${
      availableBalanceOnly
        ? ''
        : `
    delegated: delegations(distinct_on: [validator_address], order_by: [{validator_address: desc}, {height: desc}]) {
      amount
      validator {
        validator_info {
          operator_address
        }
        validator_descriptions {
          moniker
          avatar_url
          height
        }
      }
      validator_address
    }
    unbonding: unbonding_delegations(where: {completion_timestamp: {_gt: "${now}"}}, order_by: [{validator_address: desc}, {height: desc}]) {
      amount
      completion_timestamp
      height
      validator {
        validator_info {
          operator_address
        }
        validator_descriptions {
          moniker
          avatar_url
          height
        }
      }
      validator_address
    }
    rewards: delegation_rewards(distinct_on: [validator_address], order_by: [{validator_address: desc}, {height: desc}]) {
      amount
      validator {
        validator_info {
          operator_address
        }
        validator_descriptions {
          moniker
          avatar_url
          height
        }
      }
      validator_address
    }
    validator: validator_infos(where: {self_delegate_address: {_eq: $address}}) {
      consensus_address
      operator_address
      self_delegate_address
      validator {
        commissions: validator_commission_amounts(limit: 1, order_by: {height: desc}) {
          amount
        }
      }
    }
    `
    }
  }
}  
`

export const getDelegatedBalance = (crypto: string): string => `
query AccountBalance($address: String!) {
  account(where: {address: {_eq: $address}}) {
    address
    available: account_balances(limit: 1, order_by: {height: desc}) {
      coins
      height
      tokens_prices {
        unit_name
        price
        timestamp
        token_unit {
          denom
          exponent
          token {
            token_units {
              denom
              exponent
            }
          }
        }
      }
    }
    delegated: delegations(distinct_on: [validator_address], order_by: [{validator_address: desc}, {height: desc}]) {
      amount
      validator {
        validator_info {
          operator_address
        }
        validator_descriptions {
          moniker
          avatar_url
          height
        }
      }
      validator_address
    }
  }
}  
`
