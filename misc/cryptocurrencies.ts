const cryptocurrencies = {
  DARIC: {
    name: 'DARIC',
    prefix: 'desmos',
    ecosystem: 'cosmos',
    chainId: 'morpheus-apollo-2',
    image: '/static/images/cryptocurrencies/dsm.png',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.morpheus.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql.morpheus.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://morpheus.desmos.network',
    rpcEndpoint: 'https://rpc.morpheus.desmos.network',
    defaultGasFee: {
      amount: {
        amount: 0.01,
        denom: 'udaric',
      },
      gas: {
        'cosmos-sdk/MsgSend': '200000',
        'cosmos-sdk/MsgDelegate': '400000',
        'cosmos-sdk/MsgBeginRedelegate': '400000',
        'cosmos-sdk/MsgWithdrawDelegationReward': '200000',
        'cosmos-sdk/MsgUndelegate': '400000',
        'cosmos-sdk/MsgTransfer': '400000',
      },
    },
  },
}

export default cryptocurrencies
