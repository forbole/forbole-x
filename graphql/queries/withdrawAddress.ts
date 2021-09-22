export const getWithdrawAddress = (crypto: string): string => `
  subscription WithdrawAddress($address: String!) {
    delegation_reward(where: {delegator_address: {_eq: $address}}, limit: 1, order_by: {height: desc}) {
      withdraw_address
      delegator_address
    }
  }
`
