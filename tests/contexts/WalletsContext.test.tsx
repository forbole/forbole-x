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
  walletId: '123',
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
  it('updates a wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet, { ...wallet, id: '321' }],
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
      { ...wallet, id: '321' },
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
  it('deletes a wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet, { ...wallet, id: '321' }],
      })
      .mockResolvedValueOnce({
        accounts: [account],
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
    expect(result.current.wallets).toStrictEqual([{ ...wallet, id: '321' }])
    expect(result.current.accounts).toStrictEqual([])
    expect(result.current.isFirstTimeUser).toBe(false)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'deleteWallet',
      data: {
        id: wallet.id,
        password,
      },
    })
  })
  it('deletes all wallets and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [account],
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
    expect(result.current.wallets).toStrictEqual([])
    expect(result.current.accounts).toStrictEqual([])
    expect(result.current.isFirstTimeUser).toBe(true)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'deleteWallet',
      data: {
        id: wallet.id,
        password,
      },
    })
  })
  it('adds a new account and store in chrome extension', async () => {
    const account2 = {
      ...account,
      address: 'address 2',
    }
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [
          {
            name: 'test',
            id: '123',
            cryptos: ['ATOM'],
          },
        ],
      })
      .mockResolvedValueOnce({
        accounts: [account],
      })
      .mockResolvedValueOnce({
        account: account2,
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      await result.current.addAccount(account2, 'password')
    })
    const accounts = [account2, account]
    expect(result.current.accounts).toStrictEqual(accounts)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'addAccount',
      data: {
        account: account2,
        securityPassword: 'password',
        password,
      },
    })
  })
  it('updates a account and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [account, { ...account, address: 'address 2' }],
      })
      .mockResolvedValueOnce({
        account: {
          ...account,
          name: 'name 2',
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
      await result.current.updateAccount(account.address, { name: 'name 2' })
    })
    const accounts = [
      {
        ...account,
        name: 'name 2',
      },
      { ...account, address: 'address 2' },
    ]
    expect(result.current.accounts).toStrictEqual(accounts)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'updateAccount',
      data: {
        address: account.address,
        account: { name: 'name 2' },
        password,
      },
    })
  })
  it('deletes a account and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [account],
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      await result.current.deleteAccount(account.address)
    })
    const accounts = []
    expect(result.current.accounts).toStrictEqual(accounts)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'deleteAccount',
      data: {
        address: account.address,
        password,
      },
    })
  })
  it('views mnemonic phrase', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [account],
      })
      .mockResolvedValueOnce({ mnemonic: 'mnemonic' })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      const mnemonic = await result.current.viewMnemonicPhrase(wallet.id, 'password')
      expect(mnemonic).toBe('mnemonic')
    })
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'viewMnemonicPhrase',
      data: {
        id: wallet.id,
        securityPassword: 'password',
        password,
      },
    })
  })
  it('views mnemonic phrase backup', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValueOnce({
        wallets: [wallet],
      })
      .mockResolvedValueOnce({
        accounts: [account],
      })
      .mockResolvedValueOnce({ mnemonic: 'mnemonic backup' })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      const mnemonic = await result.current.viewMnemonicPhraseBackup(
        wallet.id,
        'password',
        'password 2'
      )
      expect(mnemonic).toBe('mnemonic backup')
    })
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'viewMnemonicPhraseBackup',
      data: {
        id: wallet.id,
        securityPassword: 'password',
        backupPassword: 'password 2',
        password,
      },
    })
  })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
