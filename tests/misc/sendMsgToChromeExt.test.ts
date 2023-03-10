import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt';

describe('misc: sendMsgToChromeExt', () => {
  it('resolves response', async () => {
    (chrome.runtime.sendMessage as jest.Mock).mockImplementation((extId, message, callback) => {
      callback({ success: true });
    });
    const response = await sendMsgToChromeExt({ event: 'ping' });
    expect(response).toStrictEqual({ success: true });
  });
  it('rejests error', async () => {
    (chrome.runtime.sendMessage as jest.Mock).mockImplementation((extId, message, callback) => {
      callback({ err: 'error' });
    });
    try {
      await sendMsgToChromeExt({ event: 'ping' });
      expect(true).toBe(false);
    } catch (err) {
      expect(err.message).toBe('error');
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
