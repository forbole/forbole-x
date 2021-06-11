import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  CircularProgress,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import PasswordInput from '../PasswordInput'
import useStyles from './styles'

interface SecurityPasswordProps {
  onConfirm(password: string): void
  loading: boolean
}

const SecurityPassword: React.FC<SecurityPasswordProps> = ({ onConfirm, loading }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const [password, setPassword] = React.useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(password)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('enter security password')}</DialogContentText>
        <Box mb={30}>
          <PasswordInput
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.fullWidthButton}
            variant="contained"
            color="primary"
            disabled={!password.length || loading}
            type="submit"
          >
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('confirm')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default SecurityPassword
