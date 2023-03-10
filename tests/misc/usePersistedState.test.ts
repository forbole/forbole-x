import { renderHook, act } from '@testing-library/react-hooks';
import useRetrievePersistedValue from '../../misc/usePersistedState';

describe('misc: usePersistedState', () => {
  it('retrieves persisted value from localStorage on mount', async () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce('"persisted"');
    const { result } = renderHook(() => useRetrievePersistedValue('storagekey', 'initial'));
    expect(result.current[0]).toBe('persisted');
  });
  it('throws error when persisted string is not valid JSON', () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce('persisted');
    try {
      renderHook(() => useRetrievePersistedValue('storagekey', 'initial'));
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
  it('returns initial value if persisted value doesnt exist on mount', async () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);
    const { result } = renderHook(() => useRetrievePersistedValue('storagekey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });
  it('calls localStorage.setItem on value change', async () => {
    const { result } = renderHook(() => useRetrievePersistedValue('storagekey', 'initial'));
    act(() => {
      result.current[1]('new value');
    });
    expect(result.current[0]).toBe('new value');
    expect(localStorage.setItem).toBeCalledWith('storagekey', '"new value"');
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
