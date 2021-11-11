import {
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  FilledTextFieldProps,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { isValidMnemonic } from '../../misc/utils'
import { CustomTheme } from '../../misc/theme'

interface MemoInputProps extends Partial<FilledTextFieldProps> {
  setValue: (value: string) => void
  consent: boolean
  setConsent: (value: boolean) => void
}

const MemoInput: React.FC<MemoInputProps> = ({
  fullWidth,
  multiline,
  rows,
  value,
  setValue,
  consent,
  setConsent,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const themeStyle: CustomTheme = useTheme()
  return (
    <>
      <TextField
        InputProps={{
          disableUnderline: true,
        }}
        className={classes.helperText}
        fullWidth={fullWidth ? true : undefined}
        multiline={multiline ? true : undefined}
        rows={rows}
        variant="filled"
        placeholder={t('description optional')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={isValidMnemonic(value) ? true : undefined}
        helperText={isValidMnemonic(value) ? t('memo warning') : false}
      />
      {isValidMnemonic(value) ? (
        <FormControlLabel
          control={
            <Checkbox
              style={{
                color: themeStyle.palette.error.main,
              }}
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
          }
          label={
            <Typography
              variant="body2"
              style={{
                fontSize: themeStyle.spacing(1.8),
                color: themeStyle.palette.error.main,
              }}
            >
              {t('memo warning consent')}
            </Typography>
          }
        />
      ) : null}
    </>
  )
}

export default MemoInput
