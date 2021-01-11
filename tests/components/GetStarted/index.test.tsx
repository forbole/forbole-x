import React from 'react'
import renderer from 'react-test-renderer'
import GetStarted from '../../../components/GetStarted'

const mockThemeContext = {
  theme: 'light',
  setTheme: jest.fn(),
}

jest.mock('../../../contexts/SettingsContext', () => ({
  useSettingsContext: () => mockThemeContext,
}))

jest.mock('../../../components/OnboardingDialog', () => 'OnboardingDialog')

describe('component: GetStarted', () => {
  it('renders light theme correctly', () => {
    const component = renderer.create(<GetStarted />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders dark theme correctly', () => {
    mockThemeContext.theme = 'dark'
    const component = renderer.create(<GetStarted />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('opens Onboarding Dialog on click', () => {
    const component = renderer.create(<GetStarted />)
    renderer.act(() => {
      component.root.findByType('button').props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('closes Onboarding Dialog when onClose is called from Dialog', () => {
    const component = renderer.create(<GetStarted />)
    renderer.act(() => {
      component.root.findByType('button').props.onClick()
    })
    renderer.act(() => {
      component.root.findByProps({ open: true }).props.onClose()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
