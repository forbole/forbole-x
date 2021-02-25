import React from 'react'
import renderer from 'react-test-renderer'
import last from 'lodash/last'
import ImportWallet from '../../../components/CreateWalletDialog/ImportWallet'
import cryptocurrencies from '../../../misc/cryptocurrencies'

const onConfirm = jest.fn()

describe('component: CreateWalletDialog - ImportWallet', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ImportWallet onConfirm={onConfirm} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with wallet name', () => {
    const component = renderer.create(<ImportWallet onConfirm={onConfirm} />)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({
        target: {
          value: 'wallet',
        },
      })
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onConfirm when button is clicked', () => {
    const component = renderer.create(<ImportWallet onConfirm={onConfirm} />)
    renderer.act(() => {
      component.root.findByType('input').props.onChange({
        target: {
          value: 'wallet',
        },
      })
    })
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick()
    })
    renderer.act(() => {
      last(component.root.findAllByType('button')).props.onClick()
    })
    expect(onConfirm).toBeCalledWith('wallet', [Object.values(cryptocurrencies)[0].name])
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
