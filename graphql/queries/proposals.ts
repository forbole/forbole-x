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

export const getProposal = (crypto: string): string => `
query Proposal($id: Int!) @${crypto} {
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
      block {
        timestamp
      }
    }
  }
}
`

// export const getProposers = (crypto: string): string => `
// query Account @${crypto} {
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
// query Account($address: String!) @${crypto} {
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
query ProposalResult($id: Int!) @${crypto} {
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
query VoteDetail($id: Int!) @${crypto} {
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
