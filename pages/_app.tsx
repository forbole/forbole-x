import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import useTranslation from 'next-translate/useTranslation'
import { ApolloProvider } from '@apollo/client'
import { lightTheme, darkTheme } from '../misc/theme'
import GlobalCss from '../misc/globalCss'
import { GeneralProvider, useGeneralContext } from '../contexts/GeneralContext'
import { WalletsProvider } from '../contexts/WalletsContext'
import { useApollo } from '../graphql/client'

function InnerApp({ Component, pageProps }: AppProps) {
  const { theme } = useGeneralContext()
  const { lang } = useTranslation()

  const muiTheme = React.useMemo(() => {
    if (theme === 'dark') {
      return createMuiTheme(darkTheme)
    }
    return createMuiTheme(lightTheme)
  }, [theme])

  React.useEffect(() => {
    document.cookie = `NEXT_LOCALE=${lang}`
  }, [lang])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalCss />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default function App({ Component, pageProps, ...props }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  const apolloClient = useApollo(pageProps.initialApolloState)

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
      <ApolloProvider client={apolloClient}>
        <GeneralProvider>
          <WalletsProvider>
            <InnerApp Component={Component} pageProps={pageProps} {...props} />
          </WalletsProvider>
        </GeneralProvider>
      </ApolloProvider>
    </>
  )
}
