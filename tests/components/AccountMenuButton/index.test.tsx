import React from 'react'
import renderer from 'react-test-renderer'
import AccountMenuButton from '../../../components/AccountMenuButton'

jest.mock('@material-ui/core/Menu', () => (props) => <div id="Menu" {...props} />)
jest.mock('../../../components/AccountMenuButton/ChangeAccountMonikerDialog', () => (props) => (
  <div id="ChangeAccountMonikerDialog" {...props} />
))
jest.mock('../../../components/AccountMenuButton/DeleteAccountDialog', () => (props) => (
  <div id="DeleteAccountDialog" {...props} />
))

const account = {
  walletId: '123',
  address: 'address',
  crypto: 'DSM',
  index: 0,
  name: 'name',
  fav: false,
  createdAt: 0,
}

describe('component: AccountMenuButton', () => {
  it('renders correctly', () => {
    const component = renderer.create(<AccountMenuButton account={account} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders open / close menu correctly', () => {
    const component = renderer.create(<AccountMenuButton account={account} />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'Menu' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
  it('renders open / close change account name dialog correctly', () => {
    const component = renderer.create(<AccountMenuButton account={account} />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('li')[0].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'ChangeAccountMonikerDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
  it('renders open / close delete wallet dialog correctly', () => {
    const component = renderer.create(<AccountMenuButton account={account} />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'DeleteAccountDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
