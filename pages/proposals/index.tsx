import React from 'react'
import { Box, Button, Menu, MenuItem, Typography, Avatar, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import groupBy from 'lodash/groupBy'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
import Layout from '../../components/Layout'
import ProposalTable from '../../components/ProposalTable'
import cryptocurrencies from '../../misc/cryptocurrencies'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'
import { getProposals } from '../../graphql/queries/proposals'
import { transformProposals } from '../../misc/utils'

const Proposals: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const theme = useTheme()

  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<Element>()
  const router = useRouter()

  const networkList = [
    {
      id: 3,
      crypto: 'DARIC',
      name: 'Desmos',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
    },
    // {
    //   id: 0,
    //   crypto: 'AKT',
    //   name: 'Akash',
    //   img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/akash.svg?sanitize=true',
    // },
    // {
    //   id: 1,
    //   crypto: 'BAND',
    //   name: 'Band Protocol',
    //   img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/band.svg?sanitize=true',
    // },
    // {
    //   id: 2,
    //   crypto: 'ATOM',
    //   name: 'Cosmos',
    //   img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/cosmoshub.svg?sanitize=true',
    // },

    // {
    //   id: 4,
    //   crypto: 'NGM',
    //   name: 'e-Money',
    //   img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/e-money.svg?sanitize=true',
    // },
    // {
    //   id: 5,
    //   crypto: 'FLOW',
    //   name: 'Flow',
    //   img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/flow.svg?sanitize=true',
    // },
  ]

  const networksMap = React.useMemo(
    () =>
      groupBy(
        networkList.map((a, index) => ({ ...a, index })),
        'id'
      ),
    [networkList]
  )

  const [activeNetworkIndex, setActiveNetworkIndex] = React.useState(0)
  const activeNetwork = networkList[activeNetworkIndex]

  const crypto = activeNetwork
    ? cryptocurrencies[activeNetwork.crypto]
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
        {networkList ? (
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
                  src={activeNetwork.img}
                  alt={activeNetwork.name}
                  style={{
                    width: theme.spacing(3),
                    height: theme.spacing(3),
                    marginRight: theme.spacing(2),
                  }}
                />
                <Typography variant="body1" color="textPrimary">
                  {activeNetwork.name}
                </Typography>
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
              {networkList.map((w) => (
                <Box mb={2} key={w.id}>
                  {networksMap[w.id].map((a) => (
                    <MenuItem
                      key={a.id}
                      button
                      onClick={() => {
                        setActiveNetworkIndex(a.index)
                        setAccountMenuAnchor(undefined)
                      }}
                    >
                      <Box px={2} display="flex">
                        <Avatar
                          src={w.img}
                          alt={w.name}
                          style={{
                            width: theme.spacing(3),
                            height: theme.spacing(3),
                            marginRight: theme.spacing(2),
                          }}
                        />
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          style={{ display: 'contents' }}
                        >
                          {w.name}
                        </Typography>
                      </Box>
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
            onClick={() => router.push(`/proposals/create?network=${activeNetwork.id}`)}
          >
            {t('create proposal')}
          </Button>
        </Box>
      </Box>
      <ProposalTable network={activeNetwork} proposals={proposalList} />
    </Layout>
  )
}

export default Proposals
