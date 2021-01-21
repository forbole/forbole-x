import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import passwordStrength from 'check-password-strength'
import PasswordInput from '../PasswordInput'
import useStyles from './styles'

interface SecurityPasswordProps {
  onConfirm(password: string): void
}

const SecurityPassword: React.FC<SecurityPasswordProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const [password, setPassword] = React.useState('')
  const passwordSecurityLevel = React.useMemo(() => {
    return password ? passwordStrength(password).id : 0
  }, [password])
  const passwordSecurityColors = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ]

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('security password description')}</DialogContentText>
        <PasswordInput
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box mt={2} mb={30}>
          <Box my={2} display="flex" alignItems="center">
            <Box flex={1} height={theme.spacing(0.5)} bgcolor={passwordSecurityColors[0]} />
            <Box
              flex={1}
              height={theme.spacing(0.5)}
              bgcolor={
                passwordSecurityLevel > 0 ? passwordSecurityColors[1] : theme.palette.grey[50]
              }
            />
            <Box
              flex={1}
              height={theme.spacing(0.5)}
              bgcolor={
                passwordSecurityLevel > 1 ? passwordSecurityColors[2] : theme.palette.grey[50]
              }
            />
            <Typography
              style={{
                margin: theme.spacing(0, 1),
                color: passwordSecurityColors[passwordSecurityLevel],
              }}
              variant="body2"
            >
              {t(`password security level ${passwordSecurityLevel}`)}
            </Typography>
          </Box>
          <Typography variant="body2">{t('password caption')}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={password.length < 6}
            onClick={() => onConfirm(password)}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SecurityPassword
