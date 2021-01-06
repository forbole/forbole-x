import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../../pages/index'

jest.mock('../../components/Layout', () => 'Layout')

describe('page: Home', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Home />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
