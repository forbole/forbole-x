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

const account = {
  walletId: '123',
  address: 'address',
  crypto: 'DSM',
  index: 0,
  name: 'name',
  fav: false,
  createdAt: 0,
}

describe('component: DeleteWalletDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <DeleteAccountDialog account={account} open onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(
      <DeleteAccountDialog account={account} open={false} onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose on close button click', () => {
    const component = renderer.create(
      <DeleteAccountDialog account={account} open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls onClose on cancel button click', () => {
    const component = renderer.create(
      <DeleteAccountDialog account={account} open onClose={onClose} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick({ currentTarget: 'anchor' })
    })
    expect(onClose).toBeCalled()
  })
  it('calls deleteWallet on delete button click', async () => {
    const component = renderer.create(
      <DeleteAccountDialog account={account} open onClose={onClose} />
    )
    renderer.act(() => undefined)
    await renderer.act(async () => {
      await component.root.findAllByType('button')[2].props.onClick()
    })
    expect(deleteAccount).toBeCalledWith('address', '123')
  })
  it('handles error on delete button click', async () => {
    deleteAccount.mockRejectedValueOnce(new Error('error'))
    const component = renderer.create(
      <DeleteAccountDialog account={account} open onClose={onClose} />
    )
    renderer.act(() => undefined)
    await renderer.act(async () => {
      await component.root.findAllByType('button')[2].props.onClick()
    })
    expect(deleteAccount).toBeCalledWith('address', '123')
    expect(console.log).toBeCalledWith(new Error('error'))
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
