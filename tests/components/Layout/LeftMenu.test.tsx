import React from 'react'
import renderer from 'react-test-renderer'
import LeftMenu from '../../../components/Layout/LeftMenu'

describe('component: Layout - LeftMenu', () => {
  it('renders no matching activeItem correctly', () => {
    const component = renderer.create(<LeftMenu activeItem="" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders activeItem "/" correctly', () => {
    const component = renderer.create(<LeftMenu activeItem="/" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
