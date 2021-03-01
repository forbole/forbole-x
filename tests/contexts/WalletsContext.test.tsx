import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { WalletsProvider, useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'

jest.spyOn(Date, 'now').mockReturnValue(123)
jest.mock('../../misc/sendMsgToChromeExt')

const password = 'unlock password'

const wallet = {
  name: 'test',
  id: '123',
  cryptos: ['ATOM'],
}

const account = {
  walletId: '123123',
  address: 'address',
  crypto: 'ATOM',
  index: 0,
  name: 'name',
  fav: false,
  createdAt: 0,
}

describe('context: WalletsContext', () => {
  it('returns wallets stored in chrome extension on unlockWallets', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [],
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    expect(result.current.wallets).toStrictEqual([wallet])
    expect(sendMsgToChromeExt).toBeCalledTimes(3)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'getWallets',
      data: {
        password,
      },
    })
  })
  it('returns empty wallet on initial state for first time user', async () => {
    ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({
      isFirstTimeUser: true,
    })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result, waitForNextUpdate } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await waitForNextUpdate()
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    expect(sendMsgToChromeExt).toBeCalledTimes(1)
    expect(result.current.wallets).toStrictEqual([])
  })
  it('adds a new wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [],
      })
      .mockResolvedValueOnce({
        wallet: {
          name: 'test 2',
          id: '1234',
          cryptos: ['ATOM'],
        },
        accounts: [],
      })
    const wallet2 = {
      name: 'test 2',
      cryptos: ['ATOM'],
      mnemonic: 'mnemonic',
      securityPassword: 'password',
    }

    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      await result.current.addWallet(wallet2)
    })
    const wallets = [
      {
        name: wallet2.name,
        id: '1234',
        cryptos: ['ATOM'],
      },
      wallet,
    ]
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'addWallet',
      data: {
        wallet: wallet2,
        password,
      },
    })
  })
  it('deletes a wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [],
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      await result.current.deleteWallet(wallet.id)
    })
    const wallets = []
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'deleteWallet',
      data: {
        id: wallet.id,
        password,
      },
    })
  })
  it('updates a new wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [],
      })
      .mockResolvedValueOnce({
        wallet: {
          ...wallet,
          name: 'test 2',
        },
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      await result.current.updateWallet(wallet.id, { name: 'test 2' })
    })
    const wallets = [
      {
        ...wallet,
        name: 'test 2',
      },
    ]
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'updateWallet',
      data: {
        id: wallet.id,
        wallet: { name: 'test 2' },
        password,
      },
    })
  })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
