import React from 'react'
import renderer from 'react-test-renderer'
import CreateWalletDialog, {
  ImportStage,
  CommonStage,
} from '../../../components/CreateWalletDialog'
import sendMsgToChromeExt from '../../../misc/sendMsgToChromeExt'

const mockWalletsContext = {
  addWallet: jest.fn(),
}

const onClose = jest.fn()

jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: () => mockWalletsContext,
}))

jest.mock('../../../misc/sendMsgToChromeExt', () => jest.fn())

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
jest.mock('../../../components/CreateWalletDialog/AccessMyWallet', () => (props) => (
  <div id="AccessMyWallet" {...props} />
))
jest.mock('../../../components/CreateWalletDialog/ImportMnemonicBackup', () => (props) => (
  <div id="ImportMnemonicBackup" {...props} />
))
jest.mock('../../../components/CreateWalletDialog/WhatIsMnemonic', () => (props) => (
  <div id="WhatIsMnemonic" {...props} />
))
jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)

describe('component: CreateWalletDialog', () => {
  it('renders open state correctly', () => {
    const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(<CreateWalletDialog open={false} onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  // it('renders import wallets stage correctly', () => {
  //   const component = renderer.create(<CreateWalletDialog open={false} onClose={onClose} />)
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage)
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders correctly when back button is clicked on import wallets stage', () => {
  //   const component = renderer.create(<CreateWalletDialog open={false} onClose={onClose} />)
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage)
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         'data-file-name': 'SvgIcon_back',
  //       })
  //       .parent.parent.parent.props.onClick()
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls onClose when close icon button is clicked', () => {
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         'data-file-name': 'SvgIcon_cross',
  //       })
  //       .parent.parent.parent.props.onClick()
  //   })
  //   expect(onClose).toBeCalled()
  // })
  // it('calls Secp256k1HdWallet.generate(24) and renders create wallet stage correctly when onCreateWalletClick is called', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onCreateWallet()
  //   })
  //   expect(sendMsgToChromeExt).toBeCalledWith({ event: 'generateMnemonic' })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders confirm mnemonic stage correctly when onConfirm is called from CreateWallet', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onCreateWallet()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'CreateWallet',
  //       })
  //       .props.onConfirm()
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders set security password stage correctly when mnemonic is confirmed to be correct', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onCreateWallet()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'CreateWallet',
  //       })
  //       .props.onConfirm()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'ConfirmMnemonic',
  //       })
  //       .props.onConfirm('mnemonic')
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders correctly when confirm mnemonic is invalid', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onCreateWallet()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'CreateWallet',
  //       })
  //       .props.onConfirm()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'ConfirmMnemonic',
  //       })
  //       .props.onConfirm('invalid mnemonic')
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders import wallet stage correctly when security password is set', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onCreateWallet()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'CreateWallet',
  //       })
  //       .props.onConfirm()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'ConfirmMnemonic',
  //       })
  //       .props.onConfirm('mnemonic')
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'SecurityPassword',
  //       })
  //       .props.onConfirm('123123')
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls addWallet and onClose when wallet name is set', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onCreateWallet()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'CreateWallet',
  //       })
  //       .props.onConfirm()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'ConfirmMnemonic',
  //       })
  //       .props.onConfirm('mnemonic')
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'SecurityPassword',
  //       })
  //       .props.onConfirm('123123')
  //   })
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'ImportWallet',
  //       })
  //       .props.onConfirm('wallet name', ['DSM'])
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  //   expect(mockWalletsContext.addWallet).toBeCalledWith(
  //     {
  //       mnemonic: 'mnemonic',
  //       name: 'wallet name',
  //       securityPassword: '123123',
  //       type: 'mnemonic',
  //       cryptos: ['DSM'],
  //     },
  //     undefined
  //   )
  //   expect(onClose).toBeCalled()
  // })
  // it('renders import mnemonic phrase stage correctly when onConfirm is called from AccessMyWallet', async () => {
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage.ImportMnemonicPhraseStage)
  //   })
  //   // renderer.act(() => {
  //   //   component.root
  //   //     .findByProps({
  //   //       id: 'AccessMyWallet',
  //   //     })
  //   //     .props.onConfirm(ImportStage.ImportMnemonicPhraseStage)
  //   // })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls verify mnemonic and renders set security password stage correctly when onConfirm is called from ConfirmMnemonic', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage.ImportMnemonicPhraseStage)
  //   })
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'ConfirmMnemonic',
  //       })
  //       .props.onConfirm('mnemonic')
  //   })
  //   expect(sendMsgToChromeExt).toBeCalledWith({
  //     event: 'verifyMnemonic',
  //     data: { mnemonic: 'mnemonic' },
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders error state when invalid mnemonic phrase is imported', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockRejectedValueOnce(new Error('invalid mnemonic'))
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage.ImportMnemonicPhraseStage)
  //   })
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'ConfirmMnemonic',
  //       })
  //       .props.onConfirm('mnemonic')
  //   })
  //   expect(sendMsgToChromeExt).toBeCalledWith({
  //     event: 'verifyMnemonic',
  //     data: { mnemonic: 'mnemonic' },
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders mnemonic phrase backup stage correctly when onConfirm is called from AccessMyWallet', async () => {
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage.MnemonicPhraseBackupStage)
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls verify mnemonic backup and renders set security password stage correctly when onConfirm is called from ImportMnemonicBackup', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockResolvedValueOnce({ mnemonic: 'mnemonic' })
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm()
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage.MnemonicPhraseBackupStage)
  //   })
  //   await renderer.act(async () => {
  //     await component.root
  //       .findByProps({
  //         id: 'ImportMnemonicBackup',
  //       })
  //       .props.onConfirm({
  //         password: 'password',
  //         backupPhrase: 'backup phrase',
  //       })
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('renders error state when invalid mnemonic phrase backup is imported', async () => {
  //   ;(sendMsgToChromeExt as jest.Mock).mockRejectedValueOnce(new Error('invalid mnemonic'))
  //   const component = renderer.create(<CreateWalletDialog open onClose={onClose} />)
  //   await renderer.act(async () => {
  //     component.root
  //       .findByProps({
  //         id: 'AccessMyWallet',
  //       })
  //       .props.onConfirm(ImportStage.MnemonicPhraseBackupStage)
  //   })
  //   renderer.act(() => {
  //     component.root
  //       .findByProps({
  //         id: 'ImportMnemonicBackup',
  //       })
  //       .props.onConfirm({
  //         password: 'password',
  //         backupPhrase: 'backup phrase',
  //       })
  //   })
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
})

afterEach(() => {
  jest.clearAllMocks()
})
