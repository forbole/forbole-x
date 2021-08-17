import { Breadcrumbs, Link as MLink, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
import React from 'react'
import get from 'lodash/get'
import Layout from '../../../components/Layout'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import cryptocurrencies from '../../../misc/cryptocurrencies'
import ProposalDetail from '../../../components/ProposalDetail'
import {
  getDepositParams,
  getProposal,
  getProposalResult,
  getVoteDetail,
} from '../../../graphql/queries/proposals'
import { transformProposal, transformVoteSummary, transformVoteDetail } from '../../../misc/utils'
import { getLatestAccountBalance } from '../../../graphql/queries/accountBalances'
import chains from '../../../misc/chains'

const Proposal: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  const { id, chainId } = router.query
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const { data: proposalData } = useSubscription(
    gql`
      ${getProposal(crypto.name)}
    `,
    {
      variables: {
        id,
      },
    }
  )
  const { data: depositParamsData } = useSubscription(
    gql`
      ${getDepositParams(crypto.name)}
    `
  )

  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address: get(proposalData, 'proposal[0].proposer_address') } }
  )

  const { data: proporslReaultData } = useSubscription(
    gql`
      ${getProposalResult(crypto.name)}
    `,
    { variables: { id } }
  )

  const { data: voteDetailData } = useSubscription(
    gql`
      ${getVoteDetail(crypto.name)}
    `,
    { variables: { id } }
  )

  const proposal = transformProposal(proposalData, balanceData, depositParamsData)
  const voteSummary = transformVoteSummary(proporslReaultData)
  const voteDetail = transformVoteDetail(voteDetailData)
  const network = chains[String(chainId)]

  return (
    <Layout
      passwordRequired
      activeItem="/proposals"
      HeaderLeftComponent={
        <Breadcrumbs>
          <Link href="/proposals" passHref>
            <MLink color="textPrimary">{t('proposals')}</MLink>
          </Link>
          <Typography>{t('proposal details')}</Typography>
        </Breadcrumbs>
      }
    >
      <ProposalDetail
        network={network}
        proposal={proposal}
        crypto={crypto}
        colors={['#28C989', '#1C86FC', '#FD248C', '#FD7522']}
        voteSummary={voteSummary}
        voteDetails={voteDetail}
      />
    </Layout>
  )
}

export default Proposal