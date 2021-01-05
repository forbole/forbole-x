import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from '../misc/theme'
import { SettingsProvider, useSettingsContext } from '../contexts/SettingsContext'

function InnerApp({ Component, pageProps }: AppProps) {
  const { theme } = useSettingsContext()

  const muiTheme = React.useMemo(() => {
    if (theme === 'dark') {
      return createMuiTheme(darkTheme)
    } else {
      return createMuiTheme(lightTheme)
    }
  }, [theme])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default function App(props: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        @font-face {
          font-family: 'SF Pro Text';
          src: url('/fonts/SFProDisplay-Regular.ttf');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
      <SettingsProvider>
        <InnerApp {...props} />
      </SettingsProvider>
    </>
  )
}
