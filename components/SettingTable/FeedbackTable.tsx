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
import useStyles from './styles'

const FeedbackTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const themeStyle = useTheme()
  const [subject, setSubject] = React.useState('')
  const [content, setContent] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const onNext = (s: string, c: string) => {
    setOpen(true)
    setSubject('')
    setContent('')
  }

  return (
    <Paper style={{ padding: themeStyle.spacing(3) }}>
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
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box display="flex" justifyContent="flex-end" pt={12}>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          disabled={!!(subject === '' || content === 'undefined')}
          onClick={() => onNext(subject, content)}
        >
          {t('next')}
        </Button>
      </Box>
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
