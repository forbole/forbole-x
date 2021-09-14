export const getValidators = (crypto: string): string => `
subscription Validators {
  validator {
    self_delegations(limit: 1, order_by: {height: desc}) {
      amount
    }
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
    validatorSigningInfos: validator_signing_infos(order_by: {height: desc}, limit: 1) {
      missedBlocksCounter: missed_blocks_counter
    }
    status: validator_statuses(limit: 1, order_by: { height: desc }) {
      status
      jailed
      height
    }
  }
}
`

export const getValidatorsByAddresses = (crypto: string): string => `
subscription Validators($addresses: [String!]) {
  validator(where: {validator_info: {operator_address: { _in: $addresses }}}) {
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

export const getSlashingParams = () => `
query Validators {
  slashingParams: slashing_params(order_by: {height: desc}, limit: 1) {
    params
  }
}
`
