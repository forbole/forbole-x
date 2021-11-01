const cryptocurrencies: { [key: string]: Cryptocurrency } = {
  DSM: {
    name: 'DSM',
    prefix: 'desmos',
    ledgerAppName: 'Desmos',
    ecosystem: 'cosmos',
    chainId: 'desmos-mainnet-1',
    chainName: 'Desmos Mainnet',
    image: '/static/images/cryptocurrencies/dsm.svg',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.mainnet.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql-ws.mainnet.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://explorer.desmos.network',
    lcdApiUrl: 'https://api.mainnet.desmos.network',
    rpcApiUrl: 'https://rpc.mainnet.desmos.network',
    ibcChains: [
      {
        name: 'Desmos Mainnet',
        image: '/static/images/cryptocurrencies/dsm.svg',
        channel: 'channel 1',
        chainId: 'desmos-mainnet-1',
        addressPrefix: 'desmos',
        crypto: 'DSM',
      },
    ],
    gasAdjustment: 1.5,
    gasFee: {
      amount: 0.01,
      denom: 'udsm',
    },
  },
}

export default cryptocurrencies
