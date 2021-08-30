import React from 'react'
import renderer from 'react-test-renderer'
import { ImportStage } from '../../../components/CreateWalletDialog'
import AccessMyWallet from '../../../components/CreateWalletDialog/AccessMyWallet'

const onConfirm = jest.fn()
const onCreateWallet = jest.fn()

describe('component: CreateWalletDialog - AccessMyWallet', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <AccessMyWallet onConfirm={onConfirm} onCreateWallet={onCreateWallet} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onConfirm with ImportStage.ImportMnemonicPhrase when first button is clicked', () => {
    const component = renderer.create(
      <AccessMyWallet onConfirm={onConfirm} onCreateWallet={onCreateWallet} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick()
    })
    expect(onConfirm).toBeCalledWith(ImportStage.ImportMnemonicPhraseStage)
  })
  it('calls onConfirm with ImportStage.MnemonicPhraseBackup when second button is clicked', () => {
    const component = renderer.create(
      <AccessMyWallet onConfirm={onConfirm} onCreateWallet={onCreateWallet} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick()
    })
    expect(onConfirm).toBeCalledWith(ImportStage.MnemonicPhraseBackupStage)
  })
  it('calls onConfirm with ImportStage.ConnectLedgerDevice when third button is clicked', () => {
    const component = renderer.create(
      <AccessMyWallet onConfirm={onConfirm} onCreateWallet={onCreateWallet} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[2].props.onClick()
    })
    expect(onConfirm).toBeCalledWith(ImportStage.ConnectLedgerDeviceStage)
  })
  // it('calls onCreateWallet when last button is clicked', () => {
  //   const component = renderer.create(
  //     <AccessMyWallet onConfirm={onConfirm} onCreateWallet={onCreateWallet} />
  //   )
  //   renderer.act(() => {
  //     component.root.findAllByType('button')[3].props.onClick()
  //   })
  //   expect(onCreateWallet).toBeCalled()
  // })
})

afterEach(() => {
  jest.clearAllMocks()
})
