import React from 'react'
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import groupBy from 'lodash/groupBy'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
import Layout from '../../components/Layout'
import ProposalTable from '../../components/ProposalTable'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import AccountAvatar from '../../components/AccountAvatar'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'
import { getProposals } from '../../graphql/queries/proposals'
import { transformProposals } from '../../misc/utils'

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
  const proposalList = transformProposals(proposalData)

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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push(`/proposals/create?address=${activeAccount.address}`)}
          >
            {t('create proposal')}
          </Button>
        </Box>
      </Box>
      <ProposalTable account={activeAccount} proposals={proposalList} />
    </Layout>
  )
}

export default Proposals