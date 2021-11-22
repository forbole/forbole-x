import React from 'react'
import DsmAirdrop from '../../components/DsmAirdrop'
import Layout from '../../components/Layout'

const Index: React.FC = () => {
  return (
    <Layout passwordRequired activeItem="/">
      <DsmAirdrop />
    </Layout>
  )
}

export default Index
