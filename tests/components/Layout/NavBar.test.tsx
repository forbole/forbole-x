import React from 'react'
import renderer from 'react-test-renderer'
import NavBar from '../../../components/Layout/NavBar'

jest.mock('../../../components/Layout/CurrencyMenuButton', () => 'CurrencyMenuButton')
jest.mock('../../../components/Layout/LangMenuButton', () => 'CurrencyMenuButton')
jest.mock('../../../components/Layout/ThemeModeButton', () => 'CurrencyMenuButton')

describe('component: Layout - NavBar', () => {
  it('renders correctly', () => {
    const component = renderer.create(<NavBar />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
