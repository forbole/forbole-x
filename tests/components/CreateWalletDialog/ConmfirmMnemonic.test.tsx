import React from 'react'
import renderer from 'react-test-renderer'
import ConfirmMnemonic from '../../../components/CreateWalletDialog/ConfirmMnemonic'

const onConfirm = jest.fn()

jest.mock('../../../components/MnemonicPhraseInput', () => (props) => (
  <div id="MnemonicPhraseInput" {...props} />
))

describe('component: CreateWalletDialog - ConfirmMnemonic', () => {
  it('renders default state correctly', () => {
    const component = renderer.create(<ConfirmMnemonic error="" onConfirm={onConfirm} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders error state correctly', () => {
    const component = renderer.create(<ConfirmMnemonic error="error" onConfirm={onConfirm} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onConfirm with correct params', () => {
    const component = renderer.create(<ConfirmMnemonic error="" onConfirm={onConfirm} />)
    renderer.act(() => {
      component.root.findByProps({ id: 'MnemonicPhraseInput' }).props.onChange('mnemonic')
    })
    renderer.act(() => {
      component.root.findByType('button').props.onClick()
    })
    expect(onConfirm).toBeCalledWith('mnemonic')
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
