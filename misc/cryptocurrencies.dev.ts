const cryptocurrencies: { [key: string]: Cryptocurrency } = {
  DARIC: {
    name: 'DARIC',
    prefix: 'desmos',
    ledgerAppName: 'Desmos',
    ecosystem: 'cosmos',
    chainId: 'morpheus-apollo-2',
    chainName: 'Desmos',
    image: '/static/images/cryptocurrencies/dsm.svg',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.morpheus.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql.morpheus.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://morpheus.desmos.network',
    lcdApiUrl: 'https://lcd.morpheus.desmos.network',
    rpcApiUrl: 'https://rpc.morpheus.desmos.network',
    ibcChains: [
      {
        name: 'Desmos',
        image: '/static/images/cryptocurrencies/dsm.svg',
        channel: 'channel 1',
        chainId: 'morpheus-apollo-2',
        addressPrefix: 'desmos',
        crypto: 'DSM',
      },
    ],
    gasAdjustment: 1.5,
    gasFee: {
      amount: 0.01,
      denom: 'udaric',
    },
  },
}

export default cryptocurrencies
