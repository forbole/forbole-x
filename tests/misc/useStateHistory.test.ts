import { renderHook, act } from '@testing-library/react-hooks';
import useStateHistory from '../../misc/useStateHistory';

describe('misc: useStateHistory', () => {
  it('returns initial state', async () => {
    const { result } = renderHook(() => useStateHistory('state 1'));
    expect(result.current[0]).toBe('state 1');
    expect(result.current[3]).toBe(false);
  });
  it('updates state and set isPrevStateAvailable to true', async () => {
    const { result } = renderHook(() => useStateHistory('state 1'));
    act(() => {
      result.current[1]('state 2');
    });
    expect(result.current[0]).toBe('state 2');
    expect(result.current[3]).toBe(true);
  });
  it('moves to previous state on prevState called', async () => {
    const { result } = renderHook(() => useStateHistory('state 1'));
    act(() => {
      result.current[1]('state 2');
    });
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe('state 1');
    expect(result.current[3]).toBe(false);
  });
  it('resets history on setNextState', async () => {
    const { result } = renderHook(() => useStateHistory('state 1'));
    act(() => {
      result.current[1]('state 2', true);
    });
    expect(result.current[0]).toBe('state 2');
    expect(result.current[3]).toBe(false);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
