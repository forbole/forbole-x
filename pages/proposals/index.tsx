import React from 'react'
import { Box, Button, Menu, MenuItem, Typography, Avatar, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Layout from '../../components/Layout'
import ProposalTable from '../../components/ProposalTable'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'
import { getProposals } from '../../graphql/queries/proposals'
import { transformProposals } from '../../misc/utils'
import cryptocurrencies from '../../misc/cryptocurrencies'

const Proposals: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const theme = useTheme()

  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<Element>()

  const [activeCrypto, setActiveCrypto] = React.useState(Object.keys(cryptocurrencies)[0])
  const crypto = cryptocurrencies[activeCrypto]

  const { data: proposalData } = useQuery(
    gql`
      ${getProposals(activeCrypto)}
    `
  )

  const proposalList = transformProposals(proposalData)

  return (
    <Layout passwordRequired activeItem="/proposals">
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('proposal')}</Typography>
        <Box ml={2} px={2} py={0.5}>
          <Button
            onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
            size="small"
            endIcon={<DropDownIcon {...iconProps} />}
            style={{
              background: theme.palette.background.paper,
              borderRadius: theme.spacing(0.5),
              padding: theme.spacing(1),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            }}
          >
            <Box display="flex">
              <Avatar
                src={crypto.image}
                alt={crypto.chainName}
                style={{
                  width: theme.spacing(3),
                  height: theme.spacing(3),
                  marginRight: theme.spacing(2),
                }}
              />
              <Typography>{crypto.chainName}</Typography>
            </Box>
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
            {Object.values(cryptocurrencies).map((a) => (
              <MenuItem
                key={a.chainId}
                button
                onClick={() => {
                  setActiveCrypto(a.name)
                  setAccountMenuAnchor(undefined)
                }}
              >
                <Box px={2} display="flex">
                  <Avatar
                    src={a.image}
                    alt={a.name}
                    style={{
                      width: theme.spacing(3),
                      height: theme.spacing(3),
                      marginRight: theme.spacing(2),
                    }}
                  />
                  <Typography>{a.chainName}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box justifyContent="flex-end" display="flex" flex="1">
          <Link href={`/proposals/create?crypto=${crypto.name}`} passHref>
            <Button variant="outlined" color="primary" component="a">
              {t('create proposal')}
            </Button>
          </Link>
        </Box>
      </Box>
      <ProposalTable crypto={crypto} proposals={proposalList} />
    </Layout>
  )
}

export default Proposals
