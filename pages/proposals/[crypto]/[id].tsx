import { Breadcrumbs, Link as MLink, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import React from 'react'
import get from 'lodash/get'
import Layout from '../../../components/Layout'
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
import { getTokensPrices } from '../../../graphql/queries/tokensPrices'

const Proposal: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { id, crypto: cryptoId } = router.query
  const crypto = cryptocurrencies[String(cryptoId)]
  const { data: proposalData } = useQuery(
    gql`
      ${getProposal(crypto.name)}
    `,
    {
      variables: {
        id,
      },
    }
  )
  const { data: depositParamsData } = useQuery(
    gql`
      ${getDepositParams(crypto.name)}
    `,
    { pollInterval: 5000 }
  )

  const { data: balanceData } = useQuery(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    {
      variables: { address: get(proposalData, 'proposal[0].proposer_address') },
      pollInterval: 5000,
    }
  )

  const { data: proporslReaultData } = useQuery(
    gql`
      ${getProposalResult(crypto.name)}
    `,
    { variables: { id }, pollInterval: 5000 }
  )

  const { data: voteDetailData } = useQuery(
    gql`
      ${getVoteDetail(crypto.name)}
    `,
    { variables: { id }, pollInterval: 5000 }
  )
  const { data: denomsData } = useQuery(
    gql`
      ${getTokensPrices(crypto.name)}
    `,
    { pollInterval: 5000 }
  )
  const denoms = get(denomsData, 'token_price', [])

  const proposal = transformProposal(proposalData, balanceData, depositParamsData)
  const voteSummary = transformVoteSummary(proporslReaultData)
  const voteDetail = transformVoteDetail(voteDetailData, proposal)

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
        proposal={proposal}
        crypto={crypto}
        voteSummary={voteSummary}
        voteDetails={voteDetail}
        denoms={denoms}
      />
    </Layout>
  )
}

export default Proposal
