const cryptocurrencies = {
  // ATOM: { name: 'ATOM', image: '/static/images/cryptocurrencies/atom.png', coinType: 118 },
  DSM: {
    name: 'DSM',
    ecosystem: 'cosmos',
    image: '/static/images/cryptocurrencies/dsm.png',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.morpheus.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql.morpheus.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://morpheus.desmos.network',
    defaultGasFee: {
      amount: [
        {
          amount: '20000',
          denom: 'udaric',
        },
      ],
      gas: '400000',
    },
  },
  // SOL: { name: 'SOL', image: '/static/images/cryptocurrencies/sol.png', coinType: 501 },
}

export default cryptocurrencies
