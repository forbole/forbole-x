import { Box, Button, CardMedia, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import ProfileDialog from '../ProfileDialog/index'

interface CreateProfileProps {
  account: Account
  profile: Profile
  onConfirm(): void
}

const CreateProfile: React.FC<CreateProfileProps> = ({ onConfirm, account, profile }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const theme = useTheme()
  const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false)

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          setIsProfileDialogOpen(true)
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
            <Typography align="center">{t('airdrop create profile subtitle')}</Typography>
            <Box width={theme.spacing(25)} mt={1.5}>
              <CardMedia image="/static/images/create_profile_airdrop.png" component="img" />
            </Box>
            <Box flex={1} display="flex" flexDirection="column" mb={3} mt={5.5} width="100%">
              <Button className={classes.button} color="primary" variant="contained" type="submit">
                {t('create profile')}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
      <ProfileDialog
        account={account}
        profile={profile}
        open={isProfileDialogOpen}
        onClose={() => {
          setIsProfileDialogOpen(false)
          if (profile.dtag) {
            onConfirm()
          }
        }}
      />
    </>
  )
}

export default CreateProfile
