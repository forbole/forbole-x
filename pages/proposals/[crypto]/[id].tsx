import { Box, Breadcrumbs, Link as MLink, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import React from 'react'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
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
import { getTokensPrices } from '../../../graphql/queries/tokensPrices'
import useLatestAccountBalance from '../../../graphql/hooks/useLatestAccountBalance'
import { useWalletsContext } from '../../../contexts/WalletsContext'
import { CustomTheme } from '../../../misc/theme'

const Proposal: React.FC = () => {
  const router = useRouter()
  const theme: CustomTheme = useTheme()
  const { t } = useTranslation('common')
  const { id, crypto: cryptoId } = router.query
  const crypto = cryptocurrencies[String(cryptoId)]
  const { accounts } = useWalletsContext()
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
    { pollInterval: 15000 }
  )

  const { data: balanceData } = useLatestAccountBalance(
    crypto.name,
    get(proposalData, 'proposal[0].proposer_address', '')
  )

  const { data: proporslReaultData } = useQuery(
    gql`
      ${getProposalResult(crypto.name)}
    `,
    { variables: { id }, pollInterval: 15000 }
  )

  const { data: voteDetailData } = useQuery(
    gql`
      ${getVoteDetail(crypto.name)}
    `,
    { variables: { id }, pollInterval: 15000 }
  )
  const { data: denomsData } = useQuery(
    gql`
      ${getTokensPrices(crypto.name)}
    `
  )
  const denoms = get(denomsData, 'token_price', [])

  const proposal = transformProposal(proposalData, balanceData, depositParamsData)
  const voteSummary = transformVoteSummary(proporslReaultData)
  const voteDetail = transformVoteDetail(voteDetailData, proposal)
  const voteDetailMap = keyBy(voteDetail, 'voter.address')

  const myVotes = React.useMemo(
    () =>
      accounts
        .filter((a) => !!voteDetailMap[a.address])
        .map((a) => ({ account: a, vote: voteDetailMap[a.address] })),
    [voteDetailMap, accounts]
  )

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
      {myVotes.length > 0 ? (
        <Box
          position="fixed"
          left={0}
          right={0}
          bottom={0}
          p={1.5}
          bgcolor={theme.palette.bannerBackground}
          zIndex={1000}
          textAlign="center"
        >
          {myVotes.map((v) => (
            <Typography key={v.account.address}>
              <div
                style={{ color: theme.palette.common.white }}
                dangerouslySetInnerHTML={{
                  __html: t('account voted', {
                    name: v.account.name,
                    address: v.account.address,
                    vote: t(v.vote.answer),
                  }),
                }}
              />
            </Typography>
          ))}
        </Box>
      ) : null}
    </Layout>
  )
}

export default Proposal
