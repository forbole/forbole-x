import { Box, Button, CardMedia, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface ConnectChainsProps {
  onConfirm(): void
  chainConnections: ChainConnection[]
  setIsConnectChainDialogOpen(open: boolean): void
}

const ConnectChains: React.FC<ConnectChainsProps> = ({
  onConfirm,
  chainConnections,
  setIsConnectChainDialogOpen,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const theme = useTheme()

  React.useEffect(() => {
    if (chainConnections.length > 0) {
      onConfirm()
    }
  }, [chainConnections, onConfirm])

  return (
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
  )
}

export default ConnectChains
