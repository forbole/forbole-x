export const ACCOUNT_BALANCE = `
query AccountBalance($address: String, $height: bigint) {
  account(where: {address: {_eq: $address}}, limit: 1) {
    address
    available: account_balances(where: {height: {_eq: $height}}) {
      coins
    }
    delegations(where: {height: {_eq: $height}}) {
      amount
    }
    unbonding: unbonding_delegations(where: {height: {_eq: $height}}) {
      amount
    }
    rewards: delegation_rewards(where: {delegator_address: {_eq: $address}, height: {_eq: $height}}) {
      amount
      withdraw_address
    }
  }
  validator: validator(where: {validator_info: {self_delegate_address: {_eq: $address}}}) {
    commissions: validator_commission_amounts(where: {height: {_eq: $height}}) {
      amount
    }
  }
  token_price(limit: 1, order_by: {timestamp: desc}) {
    price
  }
}
`
