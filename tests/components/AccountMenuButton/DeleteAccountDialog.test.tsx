import React from 'react'
import renderer from 'react-test-renderer'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import DeleteAccountDialog from '../../../components/AccountMenuButton/DeleteAccountDialog'

const onClose = jest.fn()
const deleteAccount = jest.fn()
jest.spyOn(console, 'log')
jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
;(useWalletsContext as jest.Mock).mockReturnValue({ deleteAccount })

describe('component: DeleteWalletDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <DeleteAccountDialog accountAddress="123" open onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(
      <DeleteAccountDialog accountAddress="123" open={false} onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose on close button click', () => {
    const component = renderer.create(
      <DeleteAccountDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls onClose on cancel button click', () => {
    const component = renderer.create(
      <DeleteAccountDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls deleteWallet on delete button click', async () => {
    const component = renderer.create(
      <DeleteAccountDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    await renderer.act(async () => {
      await component.root.findAllByType('button')[2].props.onClick()
    })
    expect(deleteAccount).toBeCalledWith('123')
  })
  it('handles error on delete button click', async () => {
    deleteAccount.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(
      <DeleteAccountDialog accountAddress="123" open onClose={onClose} />
    )
    renderer.act(() => undefined)
    await renderer.act(async () => {
      await component.root.findAllByType('button')[2].props.onClick()
    })
    expect(deleteAccount).toBeCalledWith('123')
    expect(console.log).toBeCalledWith(new Error('error'))
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
