import React from 'react'
import renderer from 'react-test-renderer'
import WalletMenuButton from '../../../components/WalletMenuButton'

jest.mock('@material-ui/core/Menu', () => (props) => <div id="Menu" {...props} />)
jest.mock('../../../components/WalletMenuButton/ChangeWalletMonikerDialog', () => (props) => (
  <div id="ChangeWalletMonikerDialog" {...props} />
))
jest.mock('../../../components/WalletMenuButton/ChangeSecurityPasswordDialog', () => (props) => (
  <div id="ChangeSecurityPasswordDialog" {...props} />
))
jest.mock('../../../components/WalletMenuButton/ViewMnemonicPhraseDialog', () => (props) => (
  <div id="ViewMnemonicPhraseDialog" {...props} />
))
jest.mock('../../../components/WalletMenuButton/DeleteWalletDialog', () => (props) => (
  <div id="DeleteWalletDialog" {...props} />
))
jest.mock('../../../components/WalletMenuButton/CreateAccountDialog', () => (props) => (
  <div id="CreateAccountDialog" {...props} />
))

describe('component: WalletMenuButton', () => {
  it('renders correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders open / close menu correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
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
  it('renders open / close change wallet name dialog correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('li')[0].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'ChangeWalletMonikerDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
  it('renders open / close change security password dialog correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('li')[1].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'ChangeSecurityPasswordDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
  it('renders open / close view mnemonic phrase dialog correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('li')[2].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'ViewMnemonicPhraseDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
  it('renders open / close create account dialog correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('li')[3].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'CreateAccountDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
  it('renders open / close delete wallet dialog correctly', () => {
    const component = renderer.create(<WalletMenuButton walletId="123" />)
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'DeleteWalletDialog' }).props.onClose()
    })
    const closedTree = component.toJSON()
    expect(closedTree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
