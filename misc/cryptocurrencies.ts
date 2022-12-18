const cryptocurrencies: { [key: string]: Cryptocurrency } = {
  DSM: {
    name: 'DSM',
    prefix: 'desmos',
    ledgerAppName: 'Desmos',
    ecosystem: 'cosmos',
    chainId: 'desmos-mainnet',
    chainName: 'Desmos Mainnet',
    image: '/static/images/cryptocurrencies/dsm.svg',
    coinType: 852,
    graphqlHttpUrl: 'https://gql.desmos.forbole.com/v1',
    graphqlWsUrl: 'wss://gql.desmos.forbole.com/v1',
    djunoUrl: 'https://gql.mainnet.desmos.network/v1',
    blockExplorerBaseUrl: 'https://explorer.desmos.network',
    lcdApiUrl: 'https://api.mainnet.desmos.network',
    rpcApiUrl: 'https://rpc.mainnet.desmos.network',
    ibcChains: [
      {
        name: 'Desmos Mainnet',
        image: '/static/images/cryptocurrencies/dsm.svg',
        channel: 'channel 1',
        chainId: 'desmos-mainnet',
        addressPrefix: 'desmos',
        crypto: 'DSM',
      },
    ],
    gasAdjustment: 1.5,
    gasFee: {
      amount: 0.01,
      denom: 'udsm',
    },
    defaultGas: {
      '/cosmos.bank.v1beta1.MsgSend': 200000,
      '/cosmos.staking.v1beta1.MsgDelegate': 400000,
      '/cosmos.staking.v1beta1.MsgBeginRedelegate': 400000,
      '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': 200000,
      '/cosmos.staking.v1beta1.MsgUndelegate': 400000,
      '/ibc.applications.transfer.v1.MsgTransfer': 400000,
      '/cosmos.gov.v1beta1.MsgSubmitProposal': 400000,
      '/cosmos.gov.v1beta1.MsgDeposit': 400000,
      '/cosmos.gov.v1beta1.MsgVote': 400000,
      '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': 400000,
      '/desmos.profiles.v3.MsgSaveProfile': 400000,
      '/desmos.profiles.v3.MsgLinkChainAccount': 400000,
      '/desmos.profiles.v3.MsgUnlinkChainAccount': 400000,
    },
    supportsDesmosProfile: true,
  },
  REGEN: {
    name: 'REGEN',
    prefix: 'regen',
    ledgerAppName: 'Cosmos',
    ecosystem: 'cosmos',
    chainId: 'regen-1',
    chainName: 'Regen Mainnet',
    image: '/static/images/cryptocurrencies/regen.png',
    coinType: 118,
    graphqlHttpUrl: 'https://gql.regen.forbole.com/v1',
    graphqlWsUrl: 'wss://gql.regen.forbole.com/v1',
    djunoUrl: 'https://gql.mainnet.desmos.network/v1',
    blockExplorerBaseUrl: 'https://regen.bigdipper.live',
    lcdApiUrl: 'https://api.regen.forbole.com',
    rpcApiUrl: 'https://rpc.regen.forbole.com',
    ibcChains: [
      {
        name: 'Regen Mainnet',
        image: '/static/images/cryptocurrencies/regen.png',
        channel: 'channel 1',
        chainId: 'regen-1',
        addressPrefix: 'regen',
        crypto: 'REGEN',
      },
    ],
    gasAdjustment: 1.5,
    gasFee: {
      amount: 0.025,
      denom: 'uregen',
    },
    defaultGas: {
      '/cosmos.bank.v1beta1.MsgSend': 80000,
      '/cosmos.staking.v1beta1.MsgDelegate': 250000,
      '/cosmos.staking.v1beta1.MsgBeginRedelegate': 300000,
      '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': 140000,
      '/cosmos.staking.v1beta1.MsgUndelegate': 300000,
      '/ibc.applications.transfer.v1.MsgTransfer': 200000,
      '/cosmos.gov.v1beta1.MsgSubmitProposal': 400000,
      '/cosmos.gov.v1beta1.MsgDeposit': 400000,
      '/cosmos.gov.v1beta1.MsgVote': 400000,
      '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': 400000,
    },
    supportsDesmosProfile: false,
  },
  ATOM: {
    name: 'ATOM',
    prefix: 'cosmos',
    ledgerAppName: 'Cosmos',
    ecosystem: 'cosmos',
    chainId: 'cosmoshub-4',
    chainName: 'Cosmos Hub',
    image: '/static/images/cryptocurrencies/atom.png',
    coinType: 118,
    graphqlHttpUrl: 'https://gql.cosmoshub.forbole.com/v1',
    graphqlWsUrl: 'wss://gql.cosmoshub.forbole.com/v1',
    djunoUrl: 'https://gql.mainnet.desmos.network/v1',
    blockExplorerBaseUrl: 'https://cosmos.bigdipper.live/',
    lcdApiUrl: 'https://api.cosmoshub.forbole.com',
    rpcApiUrl: 'https://rpc.cosmoshub.forbole.com',
    ibcChains: [
      {
        name: 'Cosmos Hub',
        image: '/static/images/cryptocurrencies/atom.png',
        channel: 'channel 1',
        chainId: 'cosmoshub-4',
        addressPrefix: 'atom',
        crypto: 'ATOM',
      },
    ],
    gasAdjustment: 1.5,
    gasFee: {
      amount: 0.025,
      denom: 'uatom',
    },
    defaultGas: {
      '/cosmos.bank.v1beta1.MsgSend': 80000,
      '/cosmos.staking.v1beta1.MsgDelegate': 250000,
      '/cosmos.staking.v1beta1.MsgBeginRedelegate': 300000,
      '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': 140000,
      '/cosmos.staking.v1beta1.MsgUndelegate': 300000,
      '/ibc.applications.transfer.v1.MsgTransfer': 200000,
      '/cosmos.gov.v1beta1.MsgSubmitProposal': 400000,
      '/cosmos.gov.v1beta1.MsgDeposit': 400000,
      '/cosmos.gov.v1beta1.MsgVote': 400000,
      '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': 400000,
    },
    supportsDesmosProfile: false,
  },
}

export default cryptocurrencies
