import React from 'react'
import renderer from 'react-test-renderer'
import Layout from '../../../components/Layout'

jest.mock('../../../components/Layout/NavBar', () => 'NavBar')
jest.mock('../../../components/Layout/LeftMenu', () => 'LeftMenu')

describe('component: Layout', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <Layout activeItem="">
        <div />
      </Layout>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
