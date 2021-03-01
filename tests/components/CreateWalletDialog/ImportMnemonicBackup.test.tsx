import React from 'react'
import renderer from 'react-test-renderer'
import last from 'lodash/last'
import ImportMnemonicBackup from '../../../components/CreateWalletDialog/ImportMnemonicBackup'

const onConfirm = jest.fn()
jest.mock('../../../components/PasswordInput', () => 'input')

describe('component: CreateWalletDialog - ImportMnemonicBackup', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ImportMnemonicBackup onConfirm={onConfirm} error="" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with error', () => {
    const component = renderer.create(<ImportMnemonicBackup onConfirm={onConfirm} error="error" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onConfirm when button is clicked', () => {
    const component = renderer.create(<ImportMnemonicBackup onConfirm={onConfirm} error="" />)
    renderer.act(() => {
      component.root.findByType('textarea').props.onChange({
        target: {
          value: 'back up phrase',
        },
      })
      component.root.findByType('input').props.onChange({
        target: {
          value: 'encryption password',
        },
      })
    })
    renderer.act(() => {
      last(component.root.findAllByType('button')).props.onClick()
    })

    expect(onConfirm).toBeCalledWith({
      password: 'encryption password',
      backupPhrase: 'back up phrase',
    })
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
