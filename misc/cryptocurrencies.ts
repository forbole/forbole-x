const cryptocurrencies: { [key: string]: Cryptocurrency } = {
  DSM: {
    name: 'DSM',
    prefix: 'desmos',
    ecosystem: 'cosmos',
    chainId: 'desmos-mainnet-1',
    chainName: 'Desmos Mainnet',
    image: '/static/images/cryptocurrencies/dsm.png',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.mainnet.desmos.network/v1/graphql',
    graphqlWsUrl: 'wss://gql-ws.mainnet.desmos.network/v1/graphql',
    blockExplorerBaseUrl: 'https://explorer.desmos.network',
    rpcEndpoint: 'https://rpc.mainnet.desmos.network',
    ibcChains: [
      {
        name: 'Desmos Mainnet',
        image: '/static/images/cryptocurrencies/dsm.png',
        channel: 'channel 1',
        chainId: 'desmos-mainnet-1',
        addressPrefix: 'desmos',
        crypto: 'DSM',
      },
    ],
    defaultGasFee: {
      amount: {
        amount: 0.01,
        denom: 'udsm',
      },
      gas: {
        '/cosmos.bank.v1beta1.MsgSend': '200000',
        '/cosmos.staking.v1beta1.MsgDelegate': '400000',
        '/cosmos.staking.v1beta1.MsgBeginRedelegate': '400000',
        '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': '200000',
        '/cosmos.staking.v1beta1.MsgUndelegate': '400000',
        '/ibc.applications.transfer.v1.MsgTransfer': '400000',
        '/cosmos.gov.v1beta1.MsgSubmitProposal': '400000',
        '/cosmos.gov.v1beta1.MsgDeposit': '400000',
        '/cosmos.gov.v1beta1.MsgVote': '400000',
      },
    },
  },
}

export default cryptocurrencies
