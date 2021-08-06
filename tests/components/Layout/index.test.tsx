import React from 'react'
import renderer from 'react-test-renderer'
import Layout from '../../../components/Layout'

const mockWalletsContext = {
  isFirstTimeUser: true,
  isChromeExtInstalled: true,
}

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'https://localhost:3000',
  }),
}))
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: () => mockWalletsContext,
}))
jest.mock('../../../components/Layout/NavBar', () => 'NavBar')
jest.mock('../../../components/Layout/LeftMenu', () => (props) => <div id="LeftMenu" {...props} />)
jest.mock('../../../components/GetStarted', () => 'GetStarted')
jest.mock('../../../components/UnlockPasswordDialog', () => 'UnlockPasswordDialog')

describe('component: Layout', () => {
  it('renders default state for first time user correctly', () => {
    mockWalletsContext.isFirstTimeUser = true
    const component = renderer.create(
      <Layout activeItem="">
        <div />
      </Layout>
    )
    renderer.act(() => undefined)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passwordRequired state for first time user correctly', () => {
    mockWalletsContext.isFirstTimeUser = true
    const component = renderer.create(
      <Layout activeItem="" passwordRequired>
        <div />
      </Layout>
    )
    renderer.act(() => undefined)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders default state for non first time user correctly', () => {
    mockWalletsContext.isFirstTimeUser = false
    const component = renderer.create(
      <Layout activeItem="">
        <div />
      </Layout>
    )
    renderer.act(() => undefined)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passwordRequired state for non first time user correctly', () => {
    mockWalletsContext.isFirstTimeUser = false
    const component = renderer.create(
      <Layout activeItem="" passwordRequired>
        <div />
      </Layout>
    )
    renderer.act(() => undefined)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders menu collapsed state', () => {
    const component = renderer.create(
      <Layout activeItem="" passwordRequired>
        <div />
      </Layout>
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByProps({ id: 'LeftMenu' }).props.setIsMenuExpanded(false)
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
