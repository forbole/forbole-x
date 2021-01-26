import React from 'react'
import renderer from 'react-test-renderer'
import { Secp256k1HdWallet } from '@cosmjs/launchpad'
import CreateWalletDialog from '../../../components/CreateWalletDialog'

const mockWalletsContext = {
  addWallet: jest.fn(),
}

const onClose = jest.fn()

jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: () => mockWalletsContext,
}))

jest.mock('../../../components/CreateWalletDialog/Start', () => (props) => (
  <div id="Start" {...props} />
))
jest.mock('../../../components/CreateWalletDialog/CreateWallet', () => (props) => (
  <div id="CreateWallet" {...props} />
))
jest.mock('../../../components/CreateWalletDialog/ConfirmMnemonic', () => (props) => (
  <div id="ConfirmMnemonic" {...props} />
))
jest.mock('../../../components/CreateWalletDialog/SecurityPassword', () => (props) => (
  <div id="SecurityPassword" {...props} />
))
jest.mock('../../../components/CreateWalletDialog/ImportWallet', () => (props) => (
  <div id="ImportWallet" {...props} />
))
jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('@cosmjs/launchpad', () => ({
  Secp256k1HdWallet: {
    generate: jest.fn().mockResolvedValue({
      mnemonic: 'guide check kick present flash casual',
      pubkey: { 1: { 2: 3 } },
    }),
  },
}))

describe('component: CreateWalletDialog', () => {
  it('renders open state correctly', () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders open state correctly', () => {
    const component = renderer.create(<CreateWalletDialog open={false} onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders import wallets stage correctly', () => {
    const component = renderer.create(<CreateWalletDialog open={false} onClose={onClose} />)
    renderer.act(() => {
      component.root.findByProps({ id: 'Start' }).props.onImportWalletClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when back button is clicked on import wallets stage', () => {
    const component = renderer.create(<CreateWalletDialog open={false} onClose={onClose} />)
    renderer.act(() => {
      component.root.findByProps({ id: 'Start' }).props.onImportWalletClick()
    })
    renderer.act(() => {
      component.root
        .findByProps({ 'data-file-name': 'SvgIcon_back' })
        .parent.parent.parent.props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose when close icon button is clicked', () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    renderer.act(() => {
      component.root
        .findByProps({ 'data-file-name': 'SvgIcon_cross' })
        .parent.parent.parent.props.onClick()
    })
    expect(onClose).toBeCalled()
  })
  it('calls Secp256k1HdWallet.generate(24) and renders create wallet stage correctly when onCreateWalletClick is called', async () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'Start' }).props.onCreateWalletClick()
    })
    expect(Secp256k1HdWallet.generate).toBeCalledWith(24)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders confirm mnemonic stage correctly when onConfirm is called from CreateWallet', async () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'Start' }).props.onCreateWalletClick()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'CreateWallet' }).props.onConfirm()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders set security password stage correctly when mnemonic is confirmed to be correct', async () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    const { mnemonic: mockMnemonic } = await Secp256k1HdWallet.generate()
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'Start' }).props.onCreateWalletClick()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'CreateWallet' }).props.onConfirm()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'ConfirmMnemonic' }).props.onConfirm(mockMnemonic)
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when confirm mnemonic is invalid', async () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'Start' }).props.onCreateWalletClick()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'CreateWallet' }).props.onConfirm()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'ConfirmMnemonic' }).props.onConfirm('invalid mnemonic')
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders import wallet stage correctly when security password is set', async () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    const { mnemonic: mockMnemonic } = await Secp256k1HdWallet.generate()
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'Start' }).props.onCreateWalletClick()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'CreateWallet' }).props.onConfirm()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'ConfirmMnemonic' }).props.onConfirm(mockMnemonic)
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'SecurityPassword' }).props.onConfirm('123123')
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls addWallet and onClose when wallet name is set', async () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    const { mnemonic: mockMnemonic, pubkey: mockPubkey }: any = await Secp256k1HdWallet.generate()
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'Start' }).props.onCreateWalletClick()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'CreateWallet' }).props.onConfirm()
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'ConfirmMnemonic' }).props.onConfirm(mockMnemonic)
    })
    renderer.act(() => {
      component.root.findByProps({ id: 'SecurityPassword' }).props.onConfirm('123123')
    })
    await renderer.act(async () => {
      await component.root.findByProps({ id: 'ImportWallet' }).props.onConfirm('wallet name')
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(mockWalletsContext.addWallet).toBeCalledWith({
      mnemonic: mockMnemonic,
      name: 'wallet name',
      securityPassword: '123123',
      pubkey: mockPubkey,
    })
    expect(onClose).toBeCalled()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
