import React from 'react';
import { useRouter } from 'next/router';
import { useWalletsContext } from '../../contexts/WalletsContext';
import CreateProposalForm from '../../components/CreateProposalForm';
import Layout from '../../components/Layout';

const CreateProposal: React.FC = () => {
  const { accounts } = useWalletsContext();
  const {
    query: { crypto },
  } = useRouter();
  const account = accounts.find(a => a.crypto === crypto) || accounts[0];

  return (
    <Layout passwordRequired activeItem="/proposals">
      {account ? <CreateProposalForm account={account} /> : null}
    </Layout>
  );
};

export default CreateProposal;
