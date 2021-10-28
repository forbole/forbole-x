export const getVestingAccount = (crypto: string): string => `
  subscription VestingAccount($address: String!) {
    vesting_account(where: {address: {_eq: $address}}) {
      vesting_periods(order_by: {period_order: asc}, distinct_on: period_order) {
        amount
        period_order
        length
      }
      start_time
    }
  }
`
