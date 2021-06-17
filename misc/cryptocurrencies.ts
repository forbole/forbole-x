const cryptocurrencies = {
  // ATOM: { name: 'ATOM', image: '/static/images/cryptocurrencies/atom.png', coinType: 118 },
  DSM: {
    name: 'DSM',
    prefix: 'desmos',
    ecosystem: 'cosmos',
    image: '/static/images/cryptocurrencies/dsm.png',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.morpheus.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql.morpheus.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://morpheus.desmos.network',
    defaultGasFee: {
      amount: [
        {
          amount: '2000',
          denom: 'udaric',
        },
      ],
      gas: {
        send: '100000',
        delegate: '200000',
        redelegate: '200000',
        claimRewards: '100000',
        undelegate: '200000',
      },
    },
  },
  // SOL: { name: 'SOL', image: '/static/images/cryptocurrencies/sol.png', coinType: 501 },
}

export default cryptocurrencies
