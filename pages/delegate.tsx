import React from 'react'
import { gql, useSubscription } from '@apollo/client'
import Layout from '../components/Layout'
import DelegateValidatorsTable from '../components/DelegateValidatorsTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'
import { getValidators } from '../graphql/queries/validators'
import { transformValidators } from '../misc/utils'

const Delegate: React.FC = () => {
  const { accounts } = useWalletsContext()
  const { data } = useSubscription(
    gql`
      ${getValidators('DSM')}
    `
  )
  const validators = transformValidators(data)

  const crypto = cryptocurrencies.DSM

  return (
    <Layout passwordRequired activeItem="/delegate">
      <DelegateValidatorsTable account={accounts[0]} validators={validators} crypto={crypto} />
    </Layout>
  )
}

export default Delegate
