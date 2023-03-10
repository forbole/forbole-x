import React from 'react';
import renderer from 'react-test-renderer';
import GetStarted from '../../../components/GetStarted';

const mockGeneralContext = {
  theme: 'light',
  setTheme: jest.fn(),
};

const mockWalletsContext = {
  unlockWallets: jest.fn(),
};

jest.mock('../../../contexts/GeneralContext', () => ({
  useGeneralContext: () => mockGeneralContext,
}));

jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: () => mockWalletsContext,
}));

jest.mock('../../../components/OnboardingDialog', () => 'OnboardingDialog');
jest.mock('../../../components/CreateWalletDialog', () => 'CreateWalletDialog');

describe('component: GetStarted', () => {
  it('renders light theme correctly', () => {
    const component = renderer.create(<GetStarted />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders dark theme correctly', () => {
    mockGeneralContext.theme = 'dark';
    const component = renderer.create(<GetStarted />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('opens Onboarding Dialog on click', () => {
    const component = renderer.create(<GetStarted />);
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('closes OnboardingDialog when onClose is called from Dialog', () => {
    const component = renderer.create(<GetStarted />);
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });
    renderer.act(() => {
      component.root
        .findByProps({
          open: true,
        })
        .props.onClose();
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('opens CreateWalletDialog and calls setPassword when onSubmit is called from OnboardingDialog', () => {
    const component = renderer.create(<GetStarted />);
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });
    renderer.act(() => {
      component.root
        .findByProps({
          open: true,
        })
        .props.onSubmit('123123');
    });
    expect(mockWalletsContext.unlockWallets).toBeCalledWith('123123');
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('closes CreateWalletDialog when onClose is called from CreateWalletDialog', () => {
    const component = renderer.create(<GetStarted />);
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });
    renderer.act(() => {
      component.root
        .findByProps({
          open: true,
        })
        .props.onSubmit('123123');
    });
    renderer.act(() => {
      component.root
        .findByProps({
          open: true,
        })
        .props.onClose();
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
