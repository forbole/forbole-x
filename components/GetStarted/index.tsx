import { Box, Button, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import GetStartedLightImage from '../../assets/images/get_started_light.svg'
import GetStartedDarkImage from '../../assets/images/get_started_dark.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import OnboardingDialog from '../OnboardingDialog'
import { useWalletsContext } from '../../contexts/WalletsContext'
import CreateWalletDialog from '../CreateWalletDialog'
import useIsMobile from '../../misc/useIsMobile'

const GetStarted: React.FC = () => {
  const classes = useStyles()
  const { theme } = useGeneralContext()
  const themeStyle = useTheme()
  const isMobile = useIsMobile()
  const { unlockWallets } = useWalletsContext()
  const { t } = useTranslation('common')
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = React.useState(false)
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = React.useState(false)

  return (
    <>
      <Box
        className={classes.container}
        mt={isMobile ? '5vh' : '15vh'}
        width={isMobile ? themeStyle.spacing(40) : 'inherits'}
      >
        {theme === 'light' ? (
          <GetStartedLightImage
            width={isMobile ? themeStyle.spacing(40) : themeStyle.spacing(60)}
            height={isMobile ? themeStyle.spacing(24.12) : 'inherits'}
          />
        ) : (
          <GetStartedDarkImage
            width={isMobile ? themeStyle.spacing(40) : themeStyle.spacing(60)}
            height={isMobile ? themeStyle.spacing(24.12) : 'inherits'}
          />
        )}
        <Typography
          className={classes.marginTop}
          variant={isMobile ? 'subtitle1' : 'h4'}
          align="center"
        >
          {t('get started line1')}
        </Typography>
        <Typography
          className={classes.marginTopSub}
          variant={isMobile ? 'subtitle1' : 'h6'}
          align="center"
        >
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
