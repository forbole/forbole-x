export const getValidators = (crypto: string): string => `
query Validators @api(name: ${crypto}bdjuno) {
  validator(where: {validator_info: {operator_address: {_neq: ""}}}) {
    info: validator_info {
      operator_address
      self_delegate_address
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
    validator_signing_infos(order_by: {height: desc}, limit: 1) {
      missed_blocks_counter
    }
    status: validator_statuses(limit: 1, order_by: { height: desc }) {
      status
      jailed
      height
    }
  }
}
`;

export const getValidatorsByAddresses = (crypto: string): string => `
query Validators($addresses: [String!]) @api(name: ${crypto}bdjuno) {
  validator(where: {validator_info: {operator_address: { _in: $addresses }}}) {
    info: validator_info {
      operator_address
      self_delegate_address
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
`;

export const getSlashingParams = (crypto: string) => `
query Validators @api(name: ${crypto}bdjuno) {
  slashing_params(order_by: {height: desc}, limit: 1) {
    params
  }
}
`;
