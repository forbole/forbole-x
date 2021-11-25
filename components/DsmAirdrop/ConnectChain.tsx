import { Box, Button, CardMedia, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import ProfileDialog from '../ProfileDialog/index'
import ConnectChainDialog from '../ConnectChainDialog'

interface ConnectChainsProps {
  account: Account
  profile: Profile
  granter: string
  onConfirm(): void
  chainConnections: ChainConnection[]
}

const ConnectChains: React.FC<ConnectChainsProps> = ({
  onConfirm,
  account,
  profile,
  granter,
  chainConnections,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const theme = useTheme()
  const [isConnectChainDialogOpen, setIsConnectChainDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (chainConnections.length > 0) {
      onConfirm()
    }
  }, [chainConnections, onConfirm])

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          setIsConnectChainDialogOpen(true)
        }}
      >
        <Box display="flex" justifyContent="center">
          <Box
            className={classes.stageContent}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography align="center">{t('airdrop connect account subtitle')}</Typography>
            <Box width={theme.spacing(17.5)} mt={1.5}>
              <CardMedia image="/static/images/connect_chain_airdrop.png" component="img" />
            </Box>
            <Box flex={1} display="flex" flexDirection="column" mb={3} mt={5.5} width="100%">
              <Button className={classes.button} color="primary" variant="contained" type="submit">
                {t('connect account')}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
      <ConnectChainDialog
        account={account}
        granter={granter}
        connections={chainConnections}
        open={isConnectChainDialogOpen}
        onClose={() => {
          setIsConnectChainDialogOpen(false)
        }}
      />
    </>
  )
}

export default ConnectChains
