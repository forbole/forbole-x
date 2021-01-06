import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { SettingsProvider, useSettingsContext } from '../../contexts/SettingsContext'

describe('context: SettingsContext', () => {
  it('changes currency when setCurrency is called', async () => {
    const wrapper: React.FC = ({ children }) => <SettingsProvider>{children}</SettingsProvider>
    const { result } = renderHook(() => useSettingsContext(), { wrapper })
    expect(result.current.currency).toBe('USD')
    let returnValue
    await act(async () => {
      returnValue = await result.current.setCurrency('HKD')
    })
    expect(result.current.currency).toBe('HKD')
  })
  it('changes theme when setTheme is called', async () => {
    const wrapper: React.FC = ({ children }) => <SettingsProvider>{children}</SettingsProvider>
    const { result } = renderHook(() => useSettingsContext(), { wrapper })
    expect(result.current.theme).toBe('light')
    let returnValue
    await act(async () => {
      returnValue = await result.current.setTheme('dark')
    })
    expect(result.current.theme).toBe('dark')
  })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
