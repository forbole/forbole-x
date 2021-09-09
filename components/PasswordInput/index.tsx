import {
  FilledTextFieldProps,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Typography,
  useTheme,
} from '@material-ui/core'
import React from 'react'
import passwordStrength from 'check-password-strength'
import useTranslation from 'next-translate/useTranslation'
import HidePasswordIcon from '../../assets/images/icons/icon_hide.svg'
import ShowPasswordIcon from '../../assets/images/icons/icon_show.svg'
import useIconProps from '../../misc/useIconProps'

interface PasswordInputProps extends Partial<FilledTextFieldProps> {
  withSecurityLevel?: boolean
}

const PasswordInput: React.FC<PasswordInputProps> = ({ withSecurityLevel, value, ...props }) => {
  const iconProps = useIconProps()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const [isShowingPassword, setIsShowingPassword] = React.useState(false)

  const passwordSecurityLevel = React.useMemo(() => {
    return value ? passwordStrength(value).id : 0
  }, [value])
  const passwordSecurityColors = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ]

  return (
    <>
      <TextField
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setIsShowingPassword((prev) => !prev)}>
                {isShowingPassword ? (
                  <ShowPasswordIcon {...iconProps} />
                ) : (
                  <HidePasswordIcon {...iconProps} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          autocomplete: 'one-time-code',
        }}
        fullWidth
        type={isShowingPassword ? 'text' : 'password'}
        variant="filled"
        value={value}
        {...props}
      />
      {withSecurityLevel ? (
        <Box mt={2}>
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
      ) : null}
    </>
  )
}

export default PasswordInput
