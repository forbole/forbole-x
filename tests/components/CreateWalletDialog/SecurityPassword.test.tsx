import React from 'react';
import renderer from 'react-test-renderer';
import SecurityPassword from '../../../components/CreateWalletDialog/SecurityPassword';

const onConfirm = jest.fn();

jest.mock('../../../components/PasswordInput', () => props => (
  <div id="PasswordInput" {...props} />
));

describe('component: CreateWalletDialog - SecurityPassword', () => {
  it('renders correctly', () => {
    const component = renderer.create(<SecurityPassword onConfirm={onConfirm} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with password less than 6 char', () => {
    const component = renderer.create(<SecurityPassword onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'PasswordInput',
        })
        .props.onChange({
          target: {
            value: '123',
          },
        });
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with weak password', () => {
    const component = renderer.create(<SecurityPassword onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'PasswordInput',
        })
        .props.onChange({
          target: {
            value: '123456',
          },
        });
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with medium strength password', () => {
    const component = renderer.create(<SecurityPassword onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'PasswordInput',
        })
        .props.onChange({
          target: {
            value: '123123qwe',
          },
        });
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with strong password', () => {
    const component = renderer.create(<SecurityPassword onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'PasswordInput',
        })
        .props.onChange({
          target: {
            value: '123123qweQWE!@#',
          },
        });
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('calls onConfirm when button is clicked', () => {
    const component = renderer.create(<SecurityPassword onConfirm={onConfirm} />);
    renderer.act(() => {
      component.root
        .findByProps({
          id: 'PasswordInput',
        })
        .props.onChange({
          target: {
            value: '123123qweQWE!@#',
          },
        });
    });
    renderer.act(() => {
      component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
    });
    expect(onConfirm).toBeCalledWith('123123qweQWE!@#');
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
