import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import CryptoJS from 'crypto-js'
import { WalletsProvider, useWalletsContext } from '../../contexts/WalletsContext'

jest.spyOn(Date, 'now').mockReturnValue(123)

describe('context: WalletsContext', () => {
  it('returns empty wallets on initial state', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    expect(result.current.wallets).toStrictEqual([])
  })
  it('returns empty wallets on initial state when wallets stored in localStorage is invalid', async () => {
    localStorage.setItem('wallets', '"invalid string"')
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    await act(async () => {
      await result.current.setPassword('password')
    })
    expect(result.current.wallets).toStrictEqual([])
  })
  it('adds a new wallet, encrypt it and store in localStorage', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    await act(async () => {
      await result.current.setPassword('password')
    })
    await act(async () => {
      await result.current.addWallet({ name: 'test', mnemonic: 'mnemonic' })
    })
    const wallets = [{ id: 123, name: 'test', mnemonic: 'mnemonic' }]
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(
      JSON.parse(
        CryptoJS.AES.decrypt(JSON.parse(localStorage.__STORE__.wallets), 'password').toString(
          CryptoJS.enc.Utf8
        )
      )
    ).toStrictEqual(wallets)
  })
  it('deletes a wallet, encrypt it and store in localStorage', async () => {
    const wrapper: React.FC = ({ children }) => <WalletsProvider>{children}</WalletsProvider>
    const { result } = renderHook(() => useWalletsContext(), { wrapper })
    await act(async () => {
      await result.current.setPassword('password')
    })
    await act(async () => {
      await result.current.addWallet({ name: 'test', mnemonic: 'mnemonic' })
    })
    await act(async () => {
      await result.current.deleteWallet(123)
    })
    const wallets = []
    expect(result.current.wallets).toStrictEqual(wallets)
    expect(
      JSON.parse(
        CryptoJS.AES.decrypt(JSON.parse(localStorage.__STORE__.wallets), 'password').toString(
          CryptoJS.enc.Utf8
        )
      )
    ).toStrictEqual(wallets)
  })
})

afterEach(() => {
  localStorage.clear()
  cleanup()
  jest.clearAllMocks()
})
