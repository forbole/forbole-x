import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import useTranslation from 'next-translate/useTranslation'
import { useApollo } from '../graphql/client'
import { lightTheme, darkTheme } from '../misc/theme'
import GlobalCss from '../misc/globalCss'
import { SettingsProvider, useSettingsContext } from '../contexts/SettingsContext'
import { WalletsProvider } from '../contexts/WalletsContext'

function InnerApp({ Component, pageProps }: AppProps) {
  const { theme } = useSettingsContext()
  const { lang } = useTranslation()

  const muiTheme = React.useMemo(() => {
    if (theme === 'dark') {
      return createMuiTheme(darkTheme)
    }
    return createMuiTheme(lightTheme)
  }, [theme])

  const apolloClient = useApollo(pageProps.initialApolloState)

  React.useEffect(() => {
    document.cookie = `NEXT_LOCALE=${lang}`
  }, [lang])

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalCss />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
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
        <title>Forbole Portal</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <SettingsProvider>
        <WalletsProvider>
          <InnerApp {...props} />
        </WalletsProvider>
      </SettingsProvider>
    </>
  )
}
