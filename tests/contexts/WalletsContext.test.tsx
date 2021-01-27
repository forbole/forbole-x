import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { WalletsProvider, useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'

jest.spyOn(Date, 'now').mockReturnValue(123)
jest.mock('../../misc/sendMsgToChromeExt')

const password = 'unlock password'

describe('context: WalletsContext', () => {
  it('returns wallets stored in chrome extension on unlockWallets', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValue({
        wallets: [
          {
            name: 'test',
            pubkey: {
              1: 2,
            },
          },
        ],
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    expect(result.current.wallets).toStrictEqual([
      {
        name: 'test',
        pubkey: {
          1: 2,
        },
      },
    ])
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'getWallets',
      data: {
        password,
      },
    })
  })
  it('returns empty wallet on initial state for first time user', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: true,
      })
      .mockResolvedValue({
        wallets: [
          {
            name: 'test',
            pubkey: {
              1: 2,
            },
          },
        ],
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result, waitForNextUpdate } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await waitForNextUpdate()
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    expect(result.current.wallets).toStrictEqual([])
  })
  it('adds a new wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValue({
        wallets: [
          {
            name: 'test',
            pubkey: {
              1: 2,
            },
          },
        ],
      })
    const wallet = {
      name: 'test 2',
      mnemonic: 'mnemonic',
      pubkey: {
        1: 2,
      } as any,
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
      await result.current.addWallet(wallet)
    })
    const wallets = [
      {
        name: wallet.name,
        pubkey: wallet.pubkey,
      },
      {
        name: 'test',
        pubkey: {
          1: 2,
        },
      },
    ]
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'addWallet',
      data: {
        wallet,
        password,
      },
    })
  })
  it('deletes a wallet and store in chrome extension', async () => {
    ;(sendMsgToChromeExt as jest.Mock)
      .mockResolvedValueOnce({
        isFirstTimeUser: false,
      })
      .mockResolvedValue({
        wallets: [
          {
            name: 'test',
            pubkey: {
              1: 2,
            },
          },
        ],
      })
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const pubkey: any = {
      1: 2,
    }
    const { result } = renderHook(() => useWalletsContext(), {
      wrapper,
    })
    await act(async () => {
      await result.current.unlockWallets(password)
    })
    await act(async () => {
      await result.current.deleteWallet(pubkey)
    })
    const wallets = []
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(sendMsgToChromeExt).toBeCalledWith({
      event: 'deleteWallet',
      data: {
        pubkey,
        password,
      },
    })
  })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
