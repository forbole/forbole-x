import React from 'react';
import renderer from 'react-test-renderer';
import CreateWallet from '../../../components/CreateWalletDialog/CreateWallet';

const onConfirm = jest.fn();

jest.mock('../../../components/MnemonicPhraseInput', () => 'MnemonicPhraseInput');

describe('component: CreateWalletDialog - CreateWallet', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CreateWallet onConfirm={onConfirm} mnemonic="mnemonic" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('calls onConfirm when button is clicked', () => {
    const component = renderer.create(<CreateWallet onConfirm={onConfirm} mnemonic="mnemonic" />);
    renderer.act(() => {
      component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
    });
    expect(onConfirm).toBeCalled();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
