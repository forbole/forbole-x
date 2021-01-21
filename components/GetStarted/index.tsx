import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'
import GetStartedLightImage from '../../assets/images/get_started_light.svg'
import GetStartedDarkImage from '../../assets/images/get_started_dark.svg'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
import useTranslation from 'next-translate/useTranslation'
import OnboardingDialog from '../OnboardingDialog'
import { useWalletsContext } from '../../contexts/WalletsContext'
import CreateWalletDialog from '../CreateWalletDialog'

interface GetStartedProps {}

const GetStarted: React.FC<GetStartedProps> = () => {
  const classes = useStyles()
  const { theme } = useSettingsContext()
  const { unlockWallets } = useWalletsContext()
  const { t } = useTranslation('common')
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = React.useState(false)
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = React.useState(false)
  return (
    <>
      <Box className={classes.container}>
        {theme === 'light' ? <GetStartedLightImage /> : <GetStartedDarkImage />}
        <Typography className={classes.marginTop} variant="h4" align="center">
          {t('get started line1')}
        </Typography>
        <Typography className={classes.marginTop} variant="h6" align="center">
          {t('get started line2')}
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setIsOnboardingDialogOpen(true)}
        >
          {t('get started button')}
        </Button>
      </Box>
      <OnboardingDialog
        open={isOnboardingDialogOpen}
        onClose={() => setIsOnboardingDialogOpen(false)}
        onSubmit={(password) => {
          unlockWallets(password)
          setIsOnboardingDialogOpen(false)
          setIsCreateWalletDialogOpen(true)
        }}
      />
      <CreateWalletDialog
        open={isCreateWalletDialogOpen}
        onClose={() => setIsCreateWalletDialogOpen(false)}
      />
    </>
  )
}

export default GetStarted
