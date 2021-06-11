import { Button, DialogActions, DialogContent, DialogContentText, Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import PasswordInput from '../PasswordInput'
import useStyles from './styles'

interface SecurityPasswordProps {
  onConfirm(password: string): void
}

const SecurityPassword: React.FC<SecurityPasswordProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [password, setPassword] = React.useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(password)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('security password description')}</DialogContentText>
        <Box mb={30}>
          <PasswordInput
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            withSecurityLevel
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={password.length < 6}
            type="submit"
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default SecurityPassword
