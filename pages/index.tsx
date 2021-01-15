import { Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout passwordRequired activeItem="/">
      <Typography>Overview</Typography>
    </Layout>
  )
}
