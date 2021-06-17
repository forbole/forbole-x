import React from 'react'
import renderer from 'react-test-renderer'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import ChangeWalletMonikerDialog from '../../../components/WalletMenuButton/ChangeWalletMoniker'

const onClose = jest.fn()
const updateWallet = jest.fn()

jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)
jest.mock('../../../contexts/WalletsContext', () => ({
  useWalletsContext: jest.fn(),
}))
;(useWalletsContext as jest.Mock).mockReturnValue({ updateWallet })

describe('component: ChangeWalletMonikerDialog', () => {
  it('renders opened state correctly', () => {
    const component = renderer.create(
      <ChangeWalletMonikerDialog walletId="123" onClose={onClose} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  // it('renders closed state correctly', () => {
  //   const component = renderer.create(
  //     <ChangeWalletMonikerDialog walletId="123" open={false} onClose={onClose} />
  //   )
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  // it('calls onClose on close button click', () => {
  //   const component = renderer.create(
  //     <ChangeWalletMonikerDialog walletId="123" open onClose={onClose} />
  //   )
  //   renderer.act(() => {
  //     component.root.findAllByType('button')[0].props.onClick({ currentTarget: 'anchor' })
  //   })
  //   expect(onClose).toBeCalled()
  // })
  // it('calls updateWallet on next button click', async () => {
  //   const component = renderer.create(
  //     <ChangeWalletMonikerDialog walletId="123" open onClose={onClose} />
  //   )
  //   renderer.act(() => undefined)
  //   renderer.act(() => {
  //     component.root.findByType('input').props.onChange({ target: { value: 'new name' } })
  //   })
  //   await renderer.act(async () => {
  //     await component.root.findAllByType('button')[1].props.onClick()
  //   })
  //   expect(updateWallet).toBeCalledWith('123', { name: 'new name' })
  //   expect(onClose).toBeCalled()
  // })
  // it('handles error on next button click', async () => {
  //   updateWallet.mockRejectedValueOnce(new Error('error'))
  //   const component = renderer.create(
  //     <ChangeWalletMonikerDialog walletId="123" open onClose={onClose} />
  //   )
  //   renderer.act(() => undefined)
  //   renderer.act(() => {
  //     component.root.findByType('input').props.onChange({ target: { value: 'new name' } })
  //   })
  //   await renderer.act(async () => {
  //     await component.root.findAllByType('button')[1].props.onClick()
  //   })
  //   expect(updateWallet).toBeCalledWith('123', { name: 'new name' })
  //   expect(onClose).toBeCalledTimes(0)
  // })
})

afterEach(() => {
  jest.clearAllMocks()
})
