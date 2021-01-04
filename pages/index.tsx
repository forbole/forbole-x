import { Typography } from '@material-ui/core'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout activeItem="/">
      <Typography variant="h1">SF Pro Text</Typography>
    </Layout>
  )
}
