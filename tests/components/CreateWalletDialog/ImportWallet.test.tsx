import React from 'react';
import renderer from 'react-test-renderer';
import ImportWallet from '../../../components/CreateWalletDialog/ImportWallet';
import cryptocurrencies from '../../../misc/cryptocurrencies';

const onConfirm = jest.fn();

describe('component: CreateWalletDialog - ImportWallet', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ImportWallet onConfirm={onConfirm} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with wallet name', () => {
    const component = renderer.create(<ImportWallet onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root.findByType('input').props.onChange({
        target: {
          value: 'wallet',
        },
      });
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('calls onConfirm when button is clicked', () => {
    const component = renderer.create(<ImportWallet onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root.findByType('input').props.onChange({
        target: {
          value: 'wallet',
        },
      });
    });
    // Click first crypto
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick();
    });
    // // Click second crypto
    // renderer.act(() => {
    //   component.root.findAllByType('button')[1].props.onClick()
    // })
    // // Click second crypto again
    // renderer.act(() => {
    //   component.root.findAllByType('button')[1].props.onClick()
    // })
    renderer.act(() => {
      component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
    });
    expect(onConfirm).toBeCalledWith('wallet', [Object.values(cryptocurrencies)[0].name]);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
