import React from 'react'
import { useWalletsContext } from '../../contexts/WalletsContext'
import CreateProposalForm from '../../components/CreateProposalForm'
import Layout from '../../components/Layout'

const CreateProposal: React.FC = () => {
  const { accounts } = useWalletsContext()
  // TODO
  const account = accounts[0]

  // how to query networks?
  const networks = [
    {
      name: 'Cosmoshub - ATOM',
      id: '01',
    },
    {
      name: 'Desmoshub - DARIC',
      id: '02',
    },
  ]

  return (
    <Layout passwordRequired activeItem="/proposals">
      {account ? <CreateProposalForm account={account} networks={networks} /> : null}
    </Layout>
  )
}

export default CreateProposal
