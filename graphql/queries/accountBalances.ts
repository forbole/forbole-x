const getGqlDateFormat = (date: Date) => date.toISOString().split('.')[0]

export const getLatestAccountBalance = (
  crypto: string,
  address: string,
  availableBalanceOnly?: boolean
): string => `
  query AccountBalance {
    token_price {
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
      price
      timestamp
      unit_name
    }
    action_account_balance(address: "${address}") {
      coins
    }
    ${
      availableBalanceOnly
        ? ''
        : `
        action_delegation(address: "${address}") {
          delegations
        }
        action_unbonding_delegation(address: "${address}") {
          unbonding_delegations
        }
      ${
        address.includes('valoper') // validator only
          ? `action_validator_commission_amount(address: "${address}") {
        coins
      }`
          : ''
      }
      action_delegation_reward(address: "${address}") {
        coins
        validator_address
      }
    `
    }
  }  
`

export const getAccountBalanceAtHeight = (crypto: string, address: string): string => `
  query AccountBalance($height: Int!, $timestamp: timestamp! ) {
    token_price_history(limit: 1, order_by: { timestamp: desc }, where: { timestamp: { _lte: $timestamp } }) {
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
      price
      timestamp
      unit_name
    }
    action_account_balance(address: "${address}", height: $height) {
      coins
    }
    action_delegation(address: "${address}", height: $height) {
      delegations
    }
    action_unbonding_delegation(address: "${address}", height: $height) {
      unbonding_delegations
    }
    ${
      address.includes('valoper') // validator only
        ? `action_validator_commission_amount(address: "${address}", height: $height) {
      coins
    }`
        : ''
    }
    action_delegation_reward(address: "${address}", height: $height) {
      coins
      validator_address
    }
  }  
`

// TODO
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
