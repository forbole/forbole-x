export const getChainConnections = (crypto: string): string => `
  subscription ChainLink($address: String!) {
    chain_link(where: {user_address: {_eq: $address}}) {
      external_address
      user_address
      creation_time
    }
  }
`
