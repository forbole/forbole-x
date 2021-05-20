import React from 'react'
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import groupBy from 'lodash/groupBy'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
import Layout from '../components/Layout'
import ProposalTable from '../components/ProposalTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'
import AccountAvatar from '../components/AccountAvatar'
import DropDownIcon from '../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../misc/useIconProps'
import CreateProposalButton from '../components/CreateProposalButton'
import { getProposals, getProposers } from '../graphql/queries/proposals'
import { transformProposals } from '../misc/utils'

const Proposals: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const { accounts, wallets } = useWalletsContext()
  const accountsMap = React.useMemo(
    () =>
      groupBy(
        accounts.map((a, index) => ({ ...a, index })),
        'walletId'
      ),
    [accounts]
  )

  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<Element>()
  const [activeAccountIndex, setActiveAccountIndex] = React.useState(0)
  const activeAccount = accounts[activeAccountIndex]
  const router = useRouter()
  const crypto = activeAccount
    ? cryptocurrencies[activeAccount.crypto]
    : Object.values(cryptocurrencies)[0]

  const { data: proposalData } = useSubscription(
    gql`
      ${getProposals(crypto.name)}
    `
  )

  const { data: proposerData } = useSubscription(
    gql`
      ${getProposers(crypto.name)}
    `
  )
  const proposalList = transformProposals(proposalData, proposerData)

  return (
    <Layout passwordRequired activeItem="/proposals">
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('proposal')}</Typography>
        {activeAccount ? (
          <Box ml={2}>
            <Button
              onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
              size="small"
              endIcon={<DropDownIcon {...iconProps} />}
            >
              <AccountAvatar account={activeAccount} hideAddress size="small" />
            </Button>
            <Menu
              anchorEl={accountMenuAnchor}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              keepMounted
              open={!!accountMenuAnchor}
              onClose={() => setAccountMenuAnchor(undefined)}
            >
              {wallets.map((w) => (
                <Box mb={2} key={w.id}>
                  <Box px={2}>
                    <Typography gutterBottom variant="body2" color="textSecondary">
                      {w.name}
                    </Typography>
                  </Box>
                  {accountsMap[w.id].map((a) => (
                    <MenuItem
                      key={a.address}
                      button
                      onClick={() => {
                        setActiveAccountIndex(a.index)
                        setAccountMenuAnchor(undefined)
                      }}
                    >
                      <AccountAvatar account={a} hideAddress size="small" />
                    </MenuItem>
                  ))}
                </Box>
              ))}
            </Menu>
          </Box>
        ) : null}
        <Box justifyContent="flex-end" display="flex" flex="1">
          <Button onClick={() => router.push('/createProposal')}>
            <CreateProposalButton />
          </Button>
        </Box>
      </Box>
      <ProposalTable
        accounts={accounts}
        // availableTokens={availableTokens}
        proposals={[
          ...proposalList,
          {
            id: 1,
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            description:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingEndTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
            duration: 1,
            isActive: true,
            tag: 'vote',
            status: 'vote',
          },
          {
            id: 2,
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            description:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingStartTime: '12 Dec 2019 16:22',
            votingEndTime: 'to 26 Dec 2019, 16:22 UTC',
            duration: '14',
            isActive: true,
            tag: 'deposit',
            status: 'deposit',
          },
          {
            id: 3,
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            description:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingStartTime: '12 Dec 2019 16:22',
            votingEndTime: 'to 26 Dec 2019, 16:22 UTC',
            isActive: false,
            tag: 'rejected',
            status: 'rejected',
          },
          {
            id: 8,
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            description:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingStartTime: '12 Dec 2019 16:22',
            votingEndTime: 'to 26 Dec 2019, 16:22 UTC',
            isActive: false,
            tag: 'passed',
            status: 'passed',
          },
          {
            id: 9,
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            description:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingStartTime: '12 Dec 2019 16:22',
            votingEndTime: 'to 26 Dec 2019, 16:22 UTC',
            isActive: false,
            tag: 'removed',
            status: 'removed',
          },
        ]}
      />
    </Layout>
  )
}

export default Proposals
