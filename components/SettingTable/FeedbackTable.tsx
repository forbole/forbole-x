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
import axios from 'axios'
import DOMPurify from 'isomorphic-dompurify'
// import { toast } from 'react-toastify'
import useStyles from './styles'

const FeedbackTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle = useTheme()
  // const [subject, setSubject] = React.useState('')
  // const [content, setContent] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const [inputs, setInputs] = React.useState({ name: '', subject: '', message: '', email: '' })
  // const onNext = (s: string, c: string) => {
  //   setOpen(true)
  //   setSubject('')
  //   setContent('')
  // }
  console.log('inputs', inputs)

  const { sanitize } = DOMPurify

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
      axios
        .post('/api/contact', {
          from: inputs.email,
          to: 'postmaster@mail.forbole.com',
          subject: 'Inquiry From Forbole-x',
          text: sanitize(inputs.message),
          html: `<p>${sanitize(inputs.message)}</p>`,
        })
        .then((res) => {
          if (res.status === 200) {
            // toast.success(t('success'))
            console.log('success')
            setOpen(true)
            setInputs({
              name: '',
              subject: '',
              message: '',
              email: '',
            })
          }
        })
        .catch((err) => {
          console.log('error', err)
          // toast.error(t('error'))
        })
    }
  }

  return (
    <Paper style={{ padding: themeStyle.spacing(3) }}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography>{t('email')}</Typography>
        <TextField
          className={classes.subject}
          fullWidth
          autoFocus
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('email placeholder')}
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
          value={inputs.subject}
          onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
        />

        <Typography>{t('message')}</Typography>
        <TextField
          className={classes.message}
          fullWidth
          autoFocus
          multiline
          rows={14}
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('message placeholder')}
          value={inputs.message}
          onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
        />
        <Box display="flex" justifyContent="flex-end" pt={12}>
          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!!(inputs.subject === '' || inputs.message === '' || inputs.email === '')}
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
