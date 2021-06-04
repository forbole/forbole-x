import React from 'react'
import renderer from 'react-test-renderer'
import last from 'lodash/last'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import CreateAccountDialog from '../../../components/WalletMenuButton/CreateAccountDialog'

const onClose = jest.fn()
const addAccount = jest.fn()

jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
jest.mock('../../../components/PasswordInput', () => 'input')
;(useWalletsContext as jest.Mock).mockReturnValue({ addAccount })

describe('component: CreateAccountDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <CreateAccountDialog walletType="mnemonic" walletId="123" open onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(
      <CreateAccountDialog walletType="mnemonic" walletId="123" open={false} onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose on close button click', () => {
    const component = renderer.create(
      <CreateAccountDialog walletType="mnemonic" walletId="123" open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('moves to next stage on next button click, then goes back on back button click', async () => {
    const component = renderer.create(
      <CreateAccountDialog walletType="mnemonic" walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findAllByType('input')[0].props.onChange({ target: { value: 'DSM' } })
      component.root.findAllByType('input')[1].props.onChange({ target: { value: 'name' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick()
    })
    const tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
  })
  it('calls addAccount on confirm button click', async () => {
    const component = renderer.create(
      <CreateAccountDialog walletType="mnemonic" walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findAllByType('input')[0].props.onChange({ target: { value: 'DSM' } })
      component.root.findAllByType('input')[1].props.onChange({ target: { value: 'name' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await component.root.findAllByType('button')[2].props.onClick()
    })
    expect(addAccount).toBeCalledWith({ walletId: '123', crypto: 'DSM', name: 'name' }, 'password')
    expect(onClose).toBeCalled()
  })
  it('handles error on next button click', async () => {
    addAccount.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(
      <CreateAccountDialog walletType="mnemonic" walletId="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findAllByType('input')[0].props.onChange({ target: { value: 'DSM' } })
      component.root.findAllByType('input')[1].props.onChange({ target: { value: 'name' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'password' } })
    })
    await renderer.act(async () => {
      await last(component.root.findAllByType('button')).props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
