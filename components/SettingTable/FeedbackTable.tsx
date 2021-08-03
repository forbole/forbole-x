import {
  Button,
  Box,
  Typography,
  useTheme,
  Dialog,
  TextField,
  Paper,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import useStyles from './styles'

const FeedbackTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    const fetcher = async (url) => {
      const res = await fetch(url)
      const data = await res.json()

      if (res.status !== 200) {
        throw new Error(data.message)
      }
      return data
    }
    const { query } = useRouter()
    const { data, error } = useSWR(() => query.message && '/api/nodemailer', fetcher)
    console.log('data', data)
    setOpen(true)
  }

  const [message, setMessage] = React.useState({ from: '', to: '', subject: '', text: '' })


  return (
    <Paper className={classes.papaer}>
      <form noValidate onSubmit={handleClick}>
        <Typography>{t('email')}</Typography>
        <TextField
          className={classes.subject}
          fullWidth
          autoFocus
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('subject placeholder')}
          value={message.from}
          onChange={(e) => setMessage({ ...message, from: e.target.value })}
        />
        <Typography>{t('subject')}</Typography>
        <TextField
          className={classes.subject}
          fullWidth
          autoFocus
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('subject placeholder')}
          value={message.subject}
          onChange={(e) => setMessage({ ...message, subject: e.target.value })}
        />

        <Typography>{t('message')}</Typography>
        <TextField
          className={classes.message}
          fullWidth
          autoFocus
          multiline
          rows={20}
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('message placeholder')}
          value={message.text}
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
        />
        <Box display="flex" justifyContent="flex-end" pt={12}>
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
            color="primary"
            disabled={!!(message.subject === '' || message.text === '' || message.from === '')}
          >
            {t('next')}
          </Button>
        </Box>
      </form>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography variant="h4" align="center">
            {t('thank you')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={themeStyle.spacing(0.5)}>
            <Typography align="center">{t('thank you content')}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}

export default FeedbackTable
