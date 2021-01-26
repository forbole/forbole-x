import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { WalletsProvider, useWalletsContext } from '../../contexts/WalletsContext'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'

jest.spyOn(Date, 'now').mockReturnValue(123)
jest.mock('../../misc/sendMsgToChromeExt', () =>
  jest.fn().mockResolvedValue({
    wallets: [{ name: 'test', pubkey: { 1: 2 } }],
    isFirstTimeUser: false,
  })
)

describe('context: WalletsContext', () => {
  it('returns empty wallets on initial state', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    expect(result.current.wallets).toStrictEqual([])
  })
  it('returns wallets stored in chrome extension on initial state', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    await act(async () => {
      await result.current.unlockWallets('password')
    })
    expect(result.current.wallets).toStrictEqual([{ name: 'test', pubkey: { 1: 2 } }])
  })
  it('adds a new wallet, encrypt it and store in chrome extension', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    await act(async () => {
      await result.current.unlockWallets('password')
    })
    await act(async () => {
      await result.current.addWallet({
        name: 'test 2',
        mnemonic: 'mnemonic',
        pubkey: { 1: 2 } as any,
        securityPassword: 'password',
      })
    })
    const wallets = [
      { name: 'test 2', pubkey: { 1: 2 } },
      { name: 'test', pubkey: { 1: 2 } },
    ]
    expect(result.current.wallets).toStrictEqual(wallets)
  })
  it('deletes a wallet, encrypt it and store in chrome extension', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    await act(async () => {
      await result.current.unlockWallets('password')
    })
    await act(async () => {
      await result.current.addWallet({
        name: 'test',
        mnemonic: 'mnemonic',
        pubkey: { 1: 2 } as any,
        securityPassword: 'password',
      })
    })
    await act(async () => {
      await result.current.deleteWallet({ 1: 2 } as any)
    })
    const wallets = []
    expect(result.current.wallets).toStrictEqual(wallets)
  })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
