import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { useMemo } from 'react'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { createHttpLink } from 'apollo-link-http'
import cryptocurrencies from '../misc/cryptocurrencies'

const defaultOptions: any = {
  watchQuery: {
    // fetchPolicy: 'no-cache',
    // errorPolicy: 'ignore',
  },
  query: {
    // fetchPolicy: 'no-cache',
    // errorPolicy: 'all',
  },
}

let apolloClient
const endpoints = {}

Object.values(cryptocurrencies).forEach((c) => {
  endpoints[`${c.name}bdjuno`] = c.graphqlHttpUrl
  endpoints[`${c.name}djuno`] = c.djunoUrl
})

function createApolloClient() {
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      new MultiAPILink({
        endpoints,
        createHttpLink: () => (createHttpLink as any)(),
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })

  client.defaultOptions = defaultOptions

  return client
}

export function initializeApollo(initialState = null) {
  // eslint-disable-next-line
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
