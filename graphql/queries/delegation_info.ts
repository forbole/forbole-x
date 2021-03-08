export const DELEGATION_INFO = `
query DelegationInfo($address: String, $height: bigint) {
  account(where: {address: {_eq: $address}}) {
    address
    delegations(where: {height: {_eq: $height}}) {
      amount
      validator_address
      validator{
        validator_descriptions{
          moniker
        }
      }
    }
  }
}
`
