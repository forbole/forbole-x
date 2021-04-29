export const getValidators = (crypto: string): string => `
subscription Validators @${crypto} {
  validator {
    info: validator_info {
      operator_address
    }
    description: validator_descriptions(limit: 1, order_by: { height: desc }) {
      moniker
      avatar_url
      height
    }
    commission: validator_commissions(limit: 1, order_by: { height: desc }) {
      commission
      height
    }
    voting_power: validator_voting_powers(limit: 1, order_by: { height: desc }) {
      voting_power
      height
    }
    status: validator_statuses(limit: 1, order_by: { height: desc }) {
      status
      jailed
      height
    }
  }
}
`
