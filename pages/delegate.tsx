import React from 'react'
import { gql, useSubscription } from '@apollo/client'
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import groupBy from 'lodash/groupBy'
import Layout from '../components/Layout'
import DelegateValidatorsTable from '../components/DelegateValidatorsTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import cryptocurrencies from '../misc/cryptocurrencies'
import { getValidators } from '../graphql/queries/validators'
import { transformValidators } from '../misc/utils'
import AccountAvatar from '../components/AccountAvatar'
import DropDownIcon from '../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../misc/useIconProps'

const Delegate: React.FC = () => {
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

  return (
    <Layout passwordRequired activeItem="/delegate">
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('delegate')}</Typography>
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
      <DelegateValidatorsTable account={activeAccount} validators={validators} crypto={crypto} />
    </Layout>
  )
}

export default Delegate
