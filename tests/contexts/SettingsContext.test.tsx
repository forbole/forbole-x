import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { SettingsProvider, useGeneralContext } from '../../contexts/GeneralContext'

describe('context: GeneralContext', () => {
  it('changes currency when setCurrency is called', async () => {
    const wrapper: React.FC = ({ children }) => <SettingsProvider>{children}</SettingsProvider>
    const { result } = renderHook(() => useGeneralContext(), {
      wrapper,
    })
    expect(result.current.currency).toBe('USD')
    await act(async () => {
      await result.current.setCurrency('HKD')
    })
    expect(result.current.currency).toBe('HKD')
  })
  it('changes theme when setTheme is called', async () => {
    const wrapper: React.FC = ({ children }) => <SettingsProvider>{children}</SettingsProvider>
    const { result } = renderHook(() => useGeneralContext(), {
      wrapper,
    })
    expect(result.current.theme).toBe('light')
    await act(async () => {
      await result.current.setTheme('dark')
    })
    expect(result.current.theme).toBe('dark')
  })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
