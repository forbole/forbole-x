import React from 'react'
import { useWalletsContext } from '../../contexts/WalletsContext'
import CreateProposalForm from '../../components/CreateProposalForm'
import Layout from '../../components/Layout'

const CreateProposal: React.FC = () => {
  const { accounts } = useWalletsContext()
  const account = accounts[0]

  return (
    <Layout passwordRequired activeItem="/proposals">
      {account ? <CreateProposalForm account={account} /> : null}
    </Layout>
  )
}

export default CreateProposal
