import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  Link,
  TextField,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import React from 'react'
import useStyles from './styles'
import { CustomTheme } from '../../misc/theme'

interface RequestPrivateKeyDialogContentProps {
  onConfirm(text: string): void
  consent: boolean
  setConsent: (value: boolean) => void
  error: string
  title: string
}

const RequestPrivateKeyDialogContent: React.FC<RequestPrivateKeyDialogContentProps> = ({
  onConfirm,
  consent,
  setConsent,
  error,
  title,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle: CustomTheme = useTheme()
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    if (error) {
      setConsent(false)
    } else {
      setConsent(true)
    }
  }, [error])

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(text)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Typography>{title}</Typography>
        <Trans
          i18nKey={t('private key consent')}
          components={[
            <Typography
              variant="body2"
              style={{
                fontSize: themeStyle.spacing(1.8),
                color: themeStyle.palette.text.secondary,
              }}
            />,
            <Link
              href="https://medium.com/desmosnetwork/desmos-airdrop-faqs-d5107dd34f17#P6"
              target="_blank"
              style={{
                fontSize: themeStyle.spacing(1.8),
                color: themeStyle.palette.text.secondary,
                textDecoration: 'underline',
              }}
            />,
          ]}
        />
      </DialogContent>
    </form>
  )
}

export default RequestPrivateKeyDialogContent
