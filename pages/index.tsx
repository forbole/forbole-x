import { Typography } from '@material-ui/core'
import React from 'react'
import CreateWalletDialog from '../components/CreateWalletDialog'
import GetStarted from '../components/GetStarted'
import Layout from '../components/Layout'

export default function Home() {
  React.useEffect(() => {}, [])

  return (
    <Layout passwordRequired activeItem="/">
      <Typography>Overview</Typography>
    </Layout>
  )
}
