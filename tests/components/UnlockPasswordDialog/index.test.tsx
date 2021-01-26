import React from 'react'
import renderer from 'react-test-renderer'
import UnlockPasswordDialog from '../../../components/UnlockPasswordDialog'

const mockWalletsContext = {
  password: '',
  unlockWallets: jest.fn(),
  wallets: [],
}

jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../components/PasswordInput', () => (props) => (
  <div id="PasswordInput" {...props} />
))

jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: () => mockWalletsContext,
}))

describe('component: UnlockPasswordDialog', () => {
  it('renders correctly', () => {
    const component = renderer.create(<UnlockPasswordDialog />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders non empty wallets correctly', () => {
    mockWalletsContext.wallets = ['wallet']
    const component = renderer.create(<UnlockPasswordDialog />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders non empty password correctly', () => {
    mockWalletsContext.password = 'password'
    const component = renderer.create(<UnlockPasswordDialog />)
    renderer.act(() => {})
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when password is changed', () => {
    const component = renderer.create(<UnlockPasswordDialog />)
    renderer.act(() => {
      component.root
        .findByProps({ id: 'PasswordInput' })
        .props.onChange({ target: { value: 'password' } })
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls setPassword when button is clicked', () => {
    const component = renderer.create(<UnlockPasswordDialog />)
    renderer.act(() => {
      component.root
        .findByProps({ id: 'PasswordInput' })
        .props.onChange({ target: { value: 'password' } })
    })
    renderer.act(() => {
      component.root.findByType('button').props.onClick()
    })
    expect(mockWalletsContext.unlockWallets).toBeCalledWith('password')
  })
})

afterEach(() => {
  mockWalletsContext.password = ''
  mockWalletsContext.wallets = []
  jest.clearAllMocks()
})
