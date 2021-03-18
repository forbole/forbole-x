import React from 'react'
import renderer from 'react-test-renderer'
import last from 'lodash/last'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import ViewMnemonicPhraseDialog from '../../../components/WalletMenuButton/ViewMnemonicPhraseDialog'

const onClose = jest.fn()
const viewMnemonicPhraseBackup = jest.fn().mockResolvedValue('encrypted mnemonic')
const viewMnemonicPhrase = jest.fn()

const selectInput = jest.fn()
const copyText = jest.fn()
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: copyText,
  },
})

jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
jest.mock('../../../components/PasswordInput', () => 'input')
;(useWalletsContext as jest.Mock).mockReturnValue({ viewMnemonicPhraseBackup, viewMnemonicPhrase })

describe('component: ViewMnemonicPhraseDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <ViewMnemonicPhraseDialog walletId="123" open onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(
      <ViewMnemonicPhraseDialog walletId="123" open={false} onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose on close button click', () => {
    const component = renderer.create(
      <ViewMnemonicPhraseDialog walletId="123" open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls viewMnemonicPhrase on next button click, then goes back on back button click', async () => {
    const component = renderer.create(
      <ViewMnemonicPhraseDialog walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    expect(viewMnemonicPhrase).toBeCalledWith('123', 'password')
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls viewMnemonicPhrase on next button click, then calls viewMnemonicPhraseBackup on next button click, then calls onClose on next button click', async () => {
    const component = renderer.create(
      <ViewMnemonicPhraseDialog walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    expect(viewMnemonicPhrase).toBeCalledWith('123', 'password')
    renderer.act(() => {
      component.root
        .findByType('input')
        .props.onChange({ target: { value: 'encryption password' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    expect(viewMnemonicPhraseBackup).toBeCalledWith('123', 'password', 'encryption password')
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByType('textarea').props.onFocus({ target: { select: selectInput } })
    })
    expect(selectInput).toBeCalled()
    expect(copyText).toBeCalledWith('encrypted mnemonic')
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    expect(onClose).toBeCalled()
  })
  it('handles error on next button click', async () => {
    viewMnemonicPhrase.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(
      <ViewMnemonicPhraseDialog walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await component.root.findAllByType('button')[1].props.onClick()
    })
    expect(viewMnemonicPhrase).toBeCalledWith('123', 'password')
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
