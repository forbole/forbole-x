import React from 'react'
import renderer from 'react-test-renderer'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import DeleteWalletDialog from '../../../components/WalletMenuButton/DeleteWallet'

const onClose = jest.fn()
const deleteWallet = jest.fn()
jest.spyOn(console, 'log')
jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
;(useWalletsContext as jest.Mock).mockReturnValue({ deleteWallet })

describe('component: DeleteWalletDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(<DeleteWalletDialog walletId="123" onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  // it('renders closed state correctly', () => {
  //   const component = renderer.create(
  //     <DeleteWalletDialog walletId="123" open={false} onClose={onClose} />
  //   )
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls onClose on close button click', () => {
  //   const component = renderer.create(<DeleteWalletDialog walletId="123" open onClose={onClose} />)
  //   renderer.act(() => {
  //     component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
  //   })
  //   expect(onClose).toBeCalled()
  // })
  // it('calls onClose on cancel button click', () => {
  //   const component = renderer.create(<DeleteWalletDialog walletId="123" open onClose={onClose} />)
  //   renderer.act(() => {
  //     component.root.findAllByType('button')[1].props.onClick({ currentTarget: 'anchor' })
  //   })
  //   expect(onClose).toBeCalled()
  // })
  // it('calls deleteWallet on delete button click', async () => {
  //   const component = renderer.create(<DeleteWalletDialog walletId="123" open onClose={onClose} />)
  //   renderer.act(() => undefined)
  //   await renderer.act(async () => {
  //     await component.root.findAllByType('button')[2].props.onClick()
  //   })
  //   expect(deleteWallet).toBeCalledWith('123')
  // })
  // it('handles error on delete button click', async () => {
  //   deleteWallet.mockRejectedValueOnce(new Error('error'))
  //   const component = renderer.create(<DeleteWalletDialog walletId="123" open onClose={onClose} />)
  //   renderer.act(() => undefined)
  //   await renderer.act(async () => {
  //     await component.root.findAllByType('button')[2].props.onClick()
  //   })
  //   expect(deleteWallet).toBeCalledWith('123')
  //   expect(console.log).toBeCalledWith(new Error('error'))
  // })
})

afterEach(() => {
  jest.clearAllMocks()
})
