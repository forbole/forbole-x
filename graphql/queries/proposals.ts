export const getProposals = (crypto: string): string => `
subscription Proposals {
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
    proposer {
      address
      validator_infos {
        validator {
          validator_descriptions {
            moniker
            avatar_url
          }
        }
      }
    }
    status
  }
}
`

export const getDepositParams = (crypto: string): string => `
subscription DepositParams {
  gov_params {
    deposit_params
  }
}
`

export const getProposal = (crypto: string): string => `
subscription Proposal($id: Int!) {
  proposal(where: {id: {_eq: $id }}) {
    content
    description
    id
    title
    voting_end_time
    voting_start_time
    submit_time
    deposit_end_time
    proposal_type
    proposer_address
    proposer {
      address
      validator_infos {
        validator {
          validator_descriptions {
            moniker
            avatar_url
          }
        }
      }
    }
    status
    proposal_deposits {
      amount
      depositor {
        address
        validator_infos {
         validator {
          validator_descriptions {
            moniker
            avatar_url
          }
        }
        }
      }
    }
  }
}
`

// export const getProposers = (crypto: string): string => `
// query Account {
//   account(where: {validator_infos: {operator_address: {_neq: "null"}}}) {
//     address
//     validator_infos {
//       operator_address
//       validator {
//         validator_descriptions {
//           avatar_url
//           identity
//           moniker
//           validator_address
//         }
//       }
//     }
//   }
// }
// `

// export const getProposer = (crypto: string): string => `
// query Account($address: String!) {
//   account(where: {address: {_eq: $address}}) {
//     address
//     validator_infos {
//       operator_address
//       validator {
//         validator_descriptions {
//           avatar_url
//           identity
//           moniker
//           validator_address
//         }
//       }
//     }
//   }
// }
// `

export const getProposalResult = (crypto: string): string => `
subscription ProposalResult($id: Int!) {
  proposal_tally_result(where: {proposal_id: {_eq: $id}}) {
    abstain
    height
    no
    no_with_veto
    proposal_id
    yes
  }
}
`

export const getVoteDetail = (crypto: string): string => `
subscription VoteDetail($id: Int!) {
  proposal_vote(where: {proposal_id: {_eq: $id}}) {
    voter_address
    proposal_id
    option
    account {
      validator_infos {
        validator {
          validator_descriptions {
            avatar_url
            moniker
        }
      }
    }
    }
  }
}
`
