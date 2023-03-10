export const getRedelegations = (crypto: string): string => `
query Redelegations($address: String!) @api(name: ${crypto}bdjuno) {
    redelegations: redelegation(where: { delegator_address: {_eq: $address} }, distinct_on: [height] ,order_by: { height: desc }) {
      height
      amount
      completion_timestamp: completion_time
      from_validator: validator {
        info: validator_info {
          operator_address
        }
        description: validator_descriptions(limit: 1, order_by: { height: desc }) {
          moniker
          avatar_url
          height
        }
      }
      to_validator: validatorByDstValidatorAddress {
        info: validator_info {
          operator_address
        }
        description: validator_descriptions(limit: 1, order_by: { height: desc }) {
          moniker
          avatar_url
          height
        }
      }
    }
  }
`;
