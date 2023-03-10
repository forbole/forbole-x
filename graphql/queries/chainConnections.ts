export const getChainConnections = (crypto: string): string => `
  query ChainLink($address: String!) @api(name: ${crypto}djuno) {
    chain_link(where: {user_address: {_eq: $address}}) {
      external_address
      user_address
      creation_time
      chain_config {
        name
      }
    }
  }
`;
