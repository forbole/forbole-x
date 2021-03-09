import React from 'react'
import renderer from 'react-test-renderer'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import ChangeSecurityPasswordDialog from '../../../components/WalletMenuButton/ChangeSecurityPasswordDialog'

const onClose = jest.fn()
const updateWallet = jest.fn()
const viewMnemonicPhrase = jest.fn()

jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
jest.mock('../../../components/PasswordInput', () => 'input')
;(useWalletsContext as jest.Mock).mockReturnValue({ updateWallet, viewMnemonicPhrase })

describe('component: ChangeSecurityPasswordDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <ChangeSecurityPasswordDialog walletId="123" open onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(
      <ChangeSecurityPasswordDialog walletId="123" open={false} onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose on close button click', () => {
    const component = renderer.create(
      <ChangeSecurityPasswordDialog walletId="123" open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls viewMnemonicPhrase on next button click, then calls updateWallet on next button click again', async () => {
    const component = renderer.create(
      <ChangeSecurityPasswordDialog walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await component.root.findAllByType('button')[1].props.onClick()
    })
    expect(viewMnemonicPhrase).toBeCalledWith('123', 'password')
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'new password' } })
    })
    await renderer.act(async () => {
      await component.root.findAllByType('button')[1].props.onClick()
    })
    expect(updateWallet).toBeCalledWith('123', {
      securityPassword: 'password',
      newSecurityPassword: 'new password',
    })
    expect(onClose).toBeCalled()
  })
  it('handles error on next button click', async () => {
    viewMnemonicPhrase.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(
      <ChangeSecurityPasswordDialog walletId="123" open onClose={onClose} />
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
