import React from 'react'
import { useWalletsContext } from '../contexts/WalletsContext'
import CreateProposal from '../components/CreateProposal'

const Proposals: React.FC = () => {
  const { accounts } = useWalletsContext()

  // how to query networks?
  const networks = [
    {
      name: 'Cosmoshub - ATOM',
      id: '01',
    },
    {
      name: 'Desmoshub - DSM',
      id: '02',
    },
  ]

  return <CreateProposal accounts={accounts} networks={networks} />
}

export default Proposals
