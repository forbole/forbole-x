import React from 'react';
import renderer from 'react-test-renderer';
import LeftMenu from '../../../components/Layout/LeftMenu';

const setIsMenuExpanded = jest.fn();

describe('component: Layout - LeftMenu', () => {
  it('renders no matching activeItem correctly', () => {
    const component = renderer.create(
      <LeftMenu activeItem="" isMenuExpanded setIsMenuExpanded={setIsMenuExpanded} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders activeItem "/" correctly', () => {
    const component = renderer.create(
      <LeftMenu activeItem="/" isMenuExpanded setIsMenuExpanded={setIsMenuExpanded} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // it('renders collapsed menu correctly', () => {
  //   const component = renderer.create(
  //     <LeftMenu activeItem="/" isMenuExpanded={false} setIsMenuExpanded={setIsMenuExpanded} />
  //   )
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls setIsMenuExpanded on logo click', () => {
  //   const component = renderer.create(
  //     <LeftMenu activeItem="/" isMenuExpanded={false} setIsMenuExpanded={setIsMenuExpanded} />
  //   )
  //   renderer.act(() => {
  //     component.root
  //       .findAllByProps({ className: 'MuiListItemIcon-root' })[0]
  //       .parent.parent.parent.props.onClick()
  //   })
  //   expect(setIsMenuExpanded).toBeCalledWith(true)
  // })
});

afterEach(() => {
  jest.clearAllMocks();
});
