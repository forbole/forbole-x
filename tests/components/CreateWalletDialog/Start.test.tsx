import React from 'react'
import renderer from 'react-test-renderer'
import Start from '../../../components/CreateWalletDialog/Start'

const onImportWalletClick = jest.fn()
const onCreateWalletClick = jest.fn()

describe('component: CreateWalletDialog - Start', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <Start onImportWalletClick={onImportWalletClick} onCreateWalletClick={onCreateWalletClick} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onImportWalletClick when first button is clicked', () => {
    const component = renderer.create(
      <Start onImportWalletClick={onImportWalletClick} onCreateWalletClick={onCreateWalletClick} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick()
    })
    expect(onImportWalletClick).toBeCalled()
  })
  it('calls onCreateWalletClick when second button is clicked', () => {
    const component = renderer.create(
      <Start onImportWalletClick={onImportWalletClick} onCreateWalletClick={onCreateWalletClick} />
    )
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick()
    })
    expect(onCreateWalletClick).toBeCalled()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
