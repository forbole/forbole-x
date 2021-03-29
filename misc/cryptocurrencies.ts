const cryptocurrencies = {
  // ATOM: { name: 'ATOM', image: '/static/images/cryptocurrencies/atom.png', coinType: 118 },
  DSM: {
    name: 'DSM',
    image: '/static/images/cryptocurrencies/dsm.png',
    coinType: 852,
    graphqHttpUrl: 'https://gql.morpheus.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql.morpheus.desmos.network/v1/graphql',
    chainConfig: {
      base: 'udaric',
      display: 'daric',
      denomUnits: [
        {
          denom: 'udaric',
          exponent: 0,
          aliases: ['microdaric'],
        },
        {
          denom: 'mdaric',
          exponent: 3,
          aliases: ['millidaric'],
        },
        {
          denom: 'daric',
          exponent: 6,
        },
        {
          denom: 'upotic',
          exponent: 0,
          aliases: ['microdaric'],
        },
        {
          denom: 'mpotic',
          exponent: 3,
          aliases: ['millipotic'],
        },
        {
          denom: 'potic',
          exponent: 6,
        },
      ],
    },
  },
  // SOL: { name: 'SOL', image: '/static/images/cryptocurrencies/sol.png', coinType: 501 },
}

export default cryptocurrencies
