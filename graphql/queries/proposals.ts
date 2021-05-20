export const getProposals = (crypto: string): string => `
query Proposals @${crypto} {
  proposal {
    content
    deposit_end_time
    description
    id
    submit_time
    title
    voting_end_time
    voting_start_time
    proposal_type
    proposer_address
    status
    proposal_deposits {
      amount
      depositor_address
      height
    }
  }
}
`

export const getProposal = (crypto: string): string => `
query Proposal($id: Int!) @${crypto} {
  proposal(where: {id: {_eq: $id }}) {
    content
    deposit_end_time
    description
    id
    submit_time
    title
    voting_end_time
    voting_start_time
    proposal_type
    proposer_address
    status
    proposal_deposits {
      amount
      depositor_address
      height
    }
  }
}
`

export const getProposers = (crypto: string): string => `
query Account @${crypto} {
  account(where: {validator_infos: {operator_address: {_neq: "null"}}}) {
    address
    validator_infos {
      operator_address
      validator {
        validator_descriptions {
          avatar_url
          identity
          moniker
          validator_address
        }
      }
    }
  }
}
`

export const getProposer = (crypto: string): string => `
query Account($address: String!) @${crypto} {
  account(where: {address: {_eq: $address}}) {
    address
    validator_infos {
      operator_address
      validator {
        validator_descriptions {
          avatar_url
          identity
          moniker
          validator_address
        }
      }
    }
  }
}
`
