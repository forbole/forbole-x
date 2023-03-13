const getVestingAccount = (crypto: string): string => `
query VestingAccount($address: String!) @api(name: ${crypto}bdjuno) {
    vesting_account(where: {address: {_eq: $address}}) {
      vesting_periods(order_by: {period_order: asc}, distinct_on: period_order) {
        amount
        period_order
        length
      }
      start_time
    }
  }
`;

export default getVestingAccount;
