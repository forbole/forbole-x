import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

// export type Query = {
//   __typename?: 'Query'
//   rates?: Maybe<Array<Maybe<ExchangeRate>>>
// }

// export type QueryRatesArgs = {
//   currency: Scalars['String']
// }

export type ExchangeRate = {
  __typename?: 'ExchangeRate'
  currency?: Maybe<Scalars['String']>
  rate?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type GetAccountBalanceQueryVariables = Exact<{ [key: string]: never }>

export type GetAccountBalanceQuery = { __typename?: 'Query' } & {
  rates?: Maybe<Array<Maybe<{ __typename?: 'ExchangeRate' } & Pick<ExchangeRate, 'currency'>>>>
}

// export type GetCurrencyCadQueryVariables = Exact<{ [key: string]: never; }>;

// export type GetCurrencyCadQuery = (
//   { __typename?: 'Query' }
//   & {
//     rates?: Maybe<Array<Maybe<(
//       { __typename?: 'ExchangeRate' }
//       & Pick<ExchangeRate, 'currency'>
//     )>>>
//   }
// );

export const GetAccountBalanceQuery = gql`
  query AccountBalance($address: String, $height: bigint) {
    account(where: { address: { _eq: $address } }, limit: 1) {
      address
      available: account_balances(where: { height: { _eq: $height } }) {
        coins
      }
      delegations(where: { height: { _eq: $height } }) {
        amount
      }
      unbonding: unbonding_delegations(where: { height: { _eq: $height } }) {
        amount
      }
      rewards: delegation_rewards(
        where: { delegator_address: { _eq: $address }, height: { _eq: $height } }
      ) {
        amount
        withdraw_address
      }
    }
    validator: validator(where: { validator_info: { self_delegate_address: { _eq: $address } } }) {
      commissions: validator_commission_amounts(where: { height: { _eq: $height } }) {
        amount
      }
    }
  }
`

/**
 * __useGetAccountBalanceQuery__
 *
 * To run a query within a React component, call `useGetAccountBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountBalanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountBalanceQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAccountBalanceQuery, GetAccountBalanceQueryVariables>
) {
  return Apollo.useQuery<GetAccountBalanceQuery, GetAccountBalanceQueryVariables>(
    GetAccountBalanceQuery,
    baseOptions
  )
}
export function useGetAccountBalanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAccountBalanceQuery, GetAccountBalanceQueryVariables>
) {
  return Apollo.useLazyQuery<GetAccountBalanceQuery, GetAccountBalanceQueryVariables>(
    GetAccountBalanceQuery,
    baseOptions
  )
}
export type GetAccountBalanceQueryHookResult = ReturnType<typeof useGetAccountBalanceQuery>
export type GetAccountBalanceLazyQueryHookResult = ReturnType<typeof useGetAccountBalanceLazyQuery>
export type GetAccountBalanceQueryResult = Apollo.QueryResult<
  GetAccountBalanceQuery,
  GetAccountBalanceQueryVariables
>

// export const GetCurrencyCadDocument = gql`
//     query GetCurrencyCad {
//   rates(currency: "CAD") {
//     currency
//   }
// }
//     `;

// /**
//  * __useGetCurrencyCadQuery__
//  *
//  * To run a query within a React component, call `useGetCurrencyCadQuery` and pass it any options that fit your needs.
//  * When your component renders, `useGetCurrencyCadQuery` returns an object from Apollo Client that contains loading, error, and data properties
//  * you can use to render your UI.
//  *
//  * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
//  *
//  * @example
//  * const { data, loading, error } = useGetCurrencyCadQuery({
//  *   variables: {
//  *   },
//  * });
//  */
// export function useGetCurrencyCadQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrencyCadQuery, GetCurrencyCadQueryVariables>) {
//   return Apollo.useQuery<GetCurrencyCadQuery, GetCurrencyCadQueryVariables>(GetCurrencyCadDocument, baseOptions);
// }
// export function useGetCurrencyCadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrencyCadQuery, GetCurrencyCadQueryVariables>) {
//   return Apollo.useLazyQuery<GetCurrencyCadQuery, GetCurrencyCadQueryVariables>(GetCurrencyCadDocument, baseOptions);
// }
// export type GetCurrencyCadQueryHookResult = ReturnType<typeof useGetCurrencyCadQuery>;
// export type GetCurrencyCadLazyQueryHookResult = ReturnType<typeof useGetCurrencyCadLazyQuery>;
// export type GetCurrencyCadQueryResult = Apollo.QueryResult<GetCurrencyCadQuery, GetCurrencyCadQueryVariables>;