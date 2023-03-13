import React from 'react';
import renderer from 'react-test-renderer';
import WhatIsMnemonic from '../../../components/CreateWalletDialog/WhatIsMnemonic';

describe('component: CreateWalletDialog - WhatIsMnemonic', () => {
  it('renders correctly', () => {
    const component = renderer.create(<WhatIsMnemonic />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
