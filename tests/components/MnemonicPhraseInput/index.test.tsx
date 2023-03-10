import React from 'react';
import renderer from 'react-test-renderer';
import MnemonicPhraseInput from '../../../components/MnemonicPhraseInput';

const onChange = jest.fn();
const focus = jest.fn();
const blur = jest.fn();
document.getElementById = jest.fn().mockImplementation(id =>
  id === 'mnemonic-24'
    ? null
    : {
        focus,
        blur,
      },
);
const mnemonic =
  'guide check kick present flash casual history auto agree help actor swarm battle decline canyon magnet novel curve dad guilt web actor weekend uncover';

describe('component: MnemonicPhraseInput', () => {
  it('renders default state correctly', () => {
    const component = renderer.create(
      <MnemonicPhraseInput onChange={onChange} mnemonic={mnemonic} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders empty mnemonic state correctly', () => {
    const component = renderer.create(<MnemonicPhraseInput onChange={onChange} mnemonic="" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled state correctly', () => {
    const component = renderer.create(<MnemonicPhraseInput disabled mnemonic={mnemonic} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders no onChange state correctly', () => {
    const component = renderer.create(<MnemonicPhraseInput mnemonic={mnemonic} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('moves to next input when space is pressed', () => {
    const component = renderer.create(
      <MnemonicPhraseInput onChange={onChange} mnemonic={mnemonic} />,
    );
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'mnemonic-1',
        })
        .props.onKeyPress({
          key: ' ',
        });
    });
    expect(document.getElementById).toBeCalledWith('mnemonic-2');
    expect(focus).toBeCalled();
  });
  it('does nothing when non space key is pressed', () => {
    const component = renderer.create(
      <MnemonicPhraseInput onChange={onChange} mnemonic={mnemonic} />,
    );
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'mnemonic-1',
        })
        .props.onKeyPress({
          key: 'a',
        });
    });
    expect(document.getElementById).toBeCalledTimes(0);
    expect(focus).toBeCalledTimes(0);
  });
  it('blurs input when space is pressed on last input', () => {
    const component = renderer.create(
      <MnemonicPhraseInput onChange={onChange} mnemonic={mnemonic} />,
    );
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'mnemonic-23',
        })
        .props.onKeyPress({
          key: ' ',
        });
    });
    expect(document.getElementById).toBeCalledWith('mnemonic-23');
    expect(blur).toBeCalled();
  });
  it('calls onChange with correct params when input value changes', () => {
    const component = renderer.create(
      <MnemonicPhraseInput onChange={onChange} mnemonic={mnemonic} />,
    );
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'mnemonic-1',
        })
        .props.onChange({
          target: {
            value: 'apple',
          },
        });
    });
    expect(onChange).toBeCalledWith(mnemonic.replace('check', 'apple'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
