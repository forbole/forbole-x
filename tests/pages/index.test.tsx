import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../pages/index';
import { useWalletsContext } from '../../contexts/WalletsContext';

jest.mock('../../components/Layout', () => 'Layout');
jest.mock('../../components/Banner', () => 'Banner');
jest.mock('../../components/AccountStatCard', () => 'AccountStatCard');
jest.mock('../../components/AssetDistributionChart', () => 'AssetDistributionChart');
jest.mock('../../components/WalletBalanceChart', () => 'WalletBalanceChart');
jest.mock('../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}));

describe('page: Home', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 3, 1));
  });
  it('renders correctly', () => {
    (useWalletsContext as jest.Mock).mockReturnValueOnce({
      accounts: [
        {
          walletId: '123',
          address: 'address',
          crypto: 'ATOM',
          index: 0,
          name: 'name',
          fav: false,
          createdAt: 0,
        },
      ],
    });
    const component = renderer.create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
