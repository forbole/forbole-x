import React from 'react'
import renderer from 'react-test-renderer'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from '../../misc/theme'
import App from '../../pages/_app'

const mockThemeContext = {
  theme: 'light',
}

jest.mock('../../contexts/SettingsContext', () => ({
  useSettingsContext: () => mockThemeContext,
  SettingsProvider: 'SettingsProvider',
}))
jest.mock('../../misc/globalCss', () => 'GlobalCss')
jest.mock('@material-ui/core/styles', () => ({
  ThemeProvider: 'ThemeProvider',
  createMuiTheme: jest.fn(),
}))
jest.mock('next-translate/useTranslation', () => () => ({
  lang: 'en',
}))

describe('page: _app', () => {
  it('renders light theme correctly', () => {
    const component = renderer.create(
      <App
        router={{} as any}
        Component={() => <div id="component" />}
        pageProps={{
          props: 'props',
        }}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(createMuiTheme).toBeCalledWith(lightTheme)
  })
  it('renders dark theme correctly', () => {
    mockThemeContext.theme = 'dark'
    const component = renderer.create(
      <App
        router={{} as any}
        Component={() => <div id="component" />}
        pageProps={{
          props: 'props',
        }}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(createMuiTheme).toBeCalledWith(darkTheme)
  })
  it('changes cookie on language change', () => {
    renderer.create(
      <App
        router={{} as any}
        Component={() => <div id="component" />}
        pageProps={{
          props: 'props',
        }}
      />
    )
    renderer.act(() => undefined)
    expect(document.cookie).toBe('NEXT_LOCALE=en')
  })
  it('removes server-side injected CSS', () => {
    const removeChild = jest.fn()
    document.querySelector = jest.fn().mockReturnValue({
      parentElement: {
        removeChild,
      },
    })
    renderer.create(
      <App
        router={{} as any}
        Component={() => <div id="component" />}
        pageProps={{
          props: 'props',
        }}
      />
    )
    renderer.act(() => undefined)
    expect(document.querySelector).toBeCalledWith('#jss-server-side')
    expect(removeChild).toBeCalledWith({
      parentElement: {
        removeChild,
      },
    })
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
