import React from 'react'
import { gql, useSubscription } from '@apollo/client'
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import groupBy from 'lodash/groupBy'
import get from 'lodash/get'
import Layout from '../components/Layout'
import ProposalsTable from '../components/ProposalsTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'
import { getValidators } from '../graphql/queries/validators'
import { transformValidators } from '../misc/utils'
import AccountAvatar from '../components/AccountAvatar'
import DropDownIcon from '../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../misc/useIconProps'
import { getLatestAccountBalance } from '../graphql/queries/accountBalances'

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
  const { data } = useSubscription(
    gql`
      ${getValidators('DSM')}
    `
  )
  const validators = transformValidators(data)

  const activeAccount = accounts[activeAccountIndex]

  const crypto = activeAccount
    ? cryptocurrencies[activeAccount.crypto]
    : Object.values(cryptocurrencies)[0]

  const { data: balanceData } = useSubscription(
    gql`
      ${getLatestAccountBalance(crypto.name)}
    `,
    { variables: { address: activeAccount ? activeAccount.address : '' } }
  )
  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  })

  return (
    <Layout passwordRequired activeItem="/delegate">
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
      </Box>
      <ProposalsTable
        proposals={[
          {
            no: '01',
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            content:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
            duration: '(in 14 days)',
            isActive: true,
            tag: 'vote',
          },
          {
            no: '02',
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            content:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
            duration: '(in 14 days)',
            isActive: true,
            tag: 'delegate',
          },
          {
            no: '03',
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            content:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
            isActive: false,
            tag: 'rejected',
          },
          {
            no: '04',
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            content:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
            isActive: false,
            tag: 'passed',
          },
          {
            no: '05',
            proposer: {
              name: 'forbole',
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              address: 'address',
            },
            title:
              'Are Validators Charging 0% Commission Harmful to the Success of the Cosmos Hub?',
            content:
              'This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Cosmos Hub, there has been much debate about …',
            votingTime: 'Voting Time: 12 Dec 2019 16:22  to 26 Dec 2019, 16:22 UTC',
            isActive: false,
            tag: 'removed',
          },
        ]}
      />
    </Layout>
  )
}

export default Proposals
