const cryptocurrencies = {
  DARIC: {
    name: 'DARIC',
    prefix: 'desmos',
    ecosystem: 'cosmos',
    image: '/static/images/cryptocurrencies/dsm.png',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.morpheus.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql.morpheus.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://morpheus.desmos.network',
    rpcEndpoint: 'http://rpc.morpheus.desmos.network:26657',
    defaultGasFee: {
      amount: [
        {
          amount: '2000',
          denom: 'udaric',
        },
      ],
      gas: {
        'cosmos-sdk/MsgSend': '100000',
        'cosmos-sdk/MsgDelegate': '200000',
        'cosmos-sdk/MsgBeginRedelegate': '200000',
        'cosmos-sdk/MsgWithdrawDelegationReward': '100000',
        'cosmos-sdk/MsgUndelegate': '200000',
      },
    },
  },
}

export default cryptocurrencies
