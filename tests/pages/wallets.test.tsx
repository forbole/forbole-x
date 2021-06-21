import React from 'react'
import renderer from 'react-test-renderer'
import Wallets from '../../pages/wallets'
import { useWalletsContext } from '../../contexts/WalletsContext'

jest.mock('../../components/Layout', () => 'Layout')
jest.mock('../../components/AccountCard', () => 'AccountCard')
jest.mock('../../components/EditWalletButton', () => 'EditWalletButton')
jest.mock('../../components/AddAccountButton', () => 'AddAccountButton')
jest.mock('../../components/CreateWalletDialog', () => ({
  __esModule: true,
  default: 'CreateWalletDialog',
  CommonStage: {
    AccessMyWallet: 'access my wallet',
  },
}))
jest.mock('../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))

describe('page: Wallets', () => {
  it('renders correctly', () => {
    ;(useWalletsContext as jest.Mock).mockReturnValueOnce({
      accounts: [
        {
          walletId: '123',
          address: 'address',
          crypto: 'ATOM',
          index: 0,
          name: 'name',
          fav: false,
          createdAt: 0,
        },
      ],
      wallets: [
        {
          name: 'test',
          id: '123',
          cryptos: ['ATOM'],
        },
      ],
    })
    const component = renderer.create(<Wallets />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with missing wallet id', () => {
    ;(useWalletsContext as jest.Mock).mockReturnValueOnce({
      accounts: [
        {
          walletId: '123123',
          address: 'address',
          crypto: 'ATOM',
          index: 0,
          name: 'name',
          fav: false,
          createdAt: 0,
        },
      ],
      wallets: [
        {
          name: 'test',
          id: '123',
          cryptos: ['ATOM'],
        },
      ],
    })
    const component = renderer.create(<Wallets />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
