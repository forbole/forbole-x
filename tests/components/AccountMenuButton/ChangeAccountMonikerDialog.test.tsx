import React from 'react'
import renderer from 'react-test-renderer'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import ChangeAccountMonikerDialog from '../../../components/AccountMenuButton/ChangeAccountMonikerDialog'

const onClose = jest.fn()
const updateAccount = jest.fn()

jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
;(useWalletsContext as jest.Mock).mockReturnValue({ updateAccount })

describe('component: ChangeAccountMonikerDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <ChangeAccountMonikerDialog accountAddress="123" open onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(
      <ChangeAccountMonikerDialog accountAddress="123" open={false} onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose on close button click', () => {
    const component = renderer.create(
      <ChangeAccountMonikerDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls updateWallet on next button click', async () => {
    const component = renderer.create(
      <ChangeAccountMonikerDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'new name' } })
    })
    await renderer.act(async () => {
      await component.root.findAllByType('button')[1].props.onClick()
    })
    expect(updateAccount).toBeCalledWith('123', { name: 'new name' })
    expect(onClose).toBeCalled()
  })
  it('handles error on next button click', async () => {
    updateAccount.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(
      <ChangeAccountMonikerDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({ target: { value: 'new name' } })
    })
    await renderer.act(async () => {
      await component.root.findAllByType('button')[1].props.onClick()
    })
    expect(updateAccount).toBeCalledWith('123', { name: 'new name' })
    expect(onClose).toBeCalledTimes(0)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
