import React from 'react'
import renderer from 'react-test-renderer'
import ThemeModeButton from '../../../components/Layout/ThemeModeButton'

const mockThemeContext = {
  theme: 'light',
  setTheme: jest.fn(),
}

jest.mock('../../../contexts/SettingsContext', () => ({
  useSettingsContext: () => mockThemeContext,
}))

describe('component: ThemeModeButton', () => {
  it('renders light theme correctly', () => {
    mockThemeContext.theme = 'light'
    const component = renderer.create(<ThemeModeButton width={10} height={10} fill="#000" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders dark theme correctly', () => {
    mockThemeContext.theme = 'dark'
    const component = renderer.create(<ThemeModeButton width={10} height={10} fill="#000" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('sets theme to dark on click', () => {
    mockThemeContext.theme = 'light'
    const component = renderer.create(<ThemeModeButton width={10} height={10} fill="#000" />)
    component.root.findByType('button').props.onClick()
    expect(mockThemeContext.setTheme).toBeCalledWith('dark')
  })
  it('sets theme to light on click', () => {
    mockThemeContext.theme = 'dark'
    const component = renderer.create(<ThemeModeButton width={10} height={10} fill="#000" />)
    component.root.findByType('button').props.onClick()
    expect(mockThemeContext.setTheme).toBeCalledWith('light')
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
