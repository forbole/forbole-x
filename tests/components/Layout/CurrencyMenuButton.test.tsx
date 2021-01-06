import React from 'react'
import renderer from 'react-test-renderer'
import CurrencyMenuButton from '../../../components/Layout/CurrencyMenuButton'

const mockCurrencyContext = {
  currency: 'USD',
  setCurrency: jest.fn(),
}

jest.mock('../../../contexts/SettingsContext', () => ({
  useSettingsContext: () => mockCurrencyContext,
}))

jest.mock('@material-ui/core/Menu', () => (props) => <div id="menu" {...props} />)

describe('component: Layout - CurrencyMenuButton', () => {
  it('renders USD correctly', () => {
    const component = renderer.create(<CurrencyMenuButton width={10} height={10} fill="#000" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders HKD correctly', () => {
    mockCurrencyContext.currency = 'HKD'
    const component = renderer.create(<CurrencyMenuButton width={10} height={10} fill="#000" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders menu correctly', () => {
    const component = renderer.create(<CurrencyMenuButton width={10} height={10} fill="#000" />)
    renderer.act(() => {
      component.root.findByType('button').props.onClick({ currentTarget: 'button' })
    })
    const menuOpenedTree = component.toJSON()
    expect(menuOpenedTree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'menu' }).props.onClose()
    })
    const menuClosedTree = component.toJSON()
    expect(menuClosedTree).toMatchSnapshot()
  })
  it('sets currency to HKD on click', () => {
    const component = renderer.create(<CurrencyMenuButton width={10} height={10} fill="#000" />)
    renderer.act(() => {
      component.root.findByType('button').props.onClick({ currentTarget: 'button' })
      component.root.findByProps({ children: 'HKD' }).props.onClick()
    })
    expect(mockCurrencyContext.setCurrency).toBeCalledWith('HKD')
  })
})

afterEach(() => {
  mockCurrencyContext.currency = 'USD'
  jest.clearAllMocks()
})
