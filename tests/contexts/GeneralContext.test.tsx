import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { GeneralProvider, useGeneralContext } from '../../contexts/GeneralContext';

global.fetch = jest.fn().mockResolvedValue({ json: () => ({}) });

describe('context: GeneralContext', () => {
  it('changes currency when setCurrency is called', async () => {
    const wrapper: React.FC = ({ children }) => <GeneralProvider>{children}</GeneralProvider>;
    const { result } = renderHook(() => useGeneralContext(), {
      wrapper,
    });
    expect(result.current.currency).toBe('USD');
    await act(async () => {
      await result.current.setCurrency('HKD');
    });
    expect(result.current.currency).toBe('HKD');
  });
  it('changes theme when setTheme is called', async () => {
    const wrapper: React.FC = ({ children }) => <GeneralProvider>{children}</GeneralProvider>;
    const { result } = renderHook(() => useGeneralContext(), {
      wrapper,
    });
    expect(result.current.theme).toBe('light');
    await act(async () => {
      await result.current.setTheme('dark');
    });
    expect(result.current.theme).toBe('dark');
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
