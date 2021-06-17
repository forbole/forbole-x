import React from 'react'
import renderer from 'react-test-renderer'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import ChangeSecurityPassword from '../../../components/WalletMenuButton/ChangeSecurityPassword'

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
    const component = renderer.create(<ChangeSecurityPassword walletId="123" onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(<ChangeSecurityPassword walletId="123" onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls viewMnemonicPhrase on next button click, then calls updateWallet on next button click again', async () => {
    const component = renderer.create(<ChangeSecurityPassword walletId="123" onClose={onClose} />)
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() })
    })
    expect(viewMnemonicPhrase).toBeCalledWith('123', 'password')
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'new password' } })
    })
    await renderer.act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() })
    })
    expect(updateWallet).toBeCalledWith('123', {
      securityPassword: 'password',
      newSecurityPassword: 'new password',
    })
    expect(onClose).toBeCalled()
  })
  it('handles error on next button click', async () => {
    viewMnemonicPhrase.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(<ChangeSecurityPassword walletId="123" onClose={onClose} />)
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() })
    })
    expect(viewMnemonicPhrase).toBeCalledWith('123', 'password')
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
