import { Box, Button, CardMedia, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface CreateProfileProps {
  onConfirm(): void
}

const CreateProfile: React.FC<CreateProfileProps> = ({ onConfirm }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onConfirm()
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
    </>
  )
}

export default CreateProfile
