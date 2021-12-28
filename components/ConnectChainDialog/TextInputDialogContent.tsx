import { Button, DialogActions, DialogContent, Typography, Box, TextField } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface TextInputDialogContentProps {
  onConfirm(text: string): void
  error: string
  title: string
  placeholder: string
}

const TextInputDialogContent: React.FC<TextInputDialogContentProps> = ({
  onConfirm,
  error,
  title,
  placeholder,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [text, setText] = React.useState('')

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
        <TextField
          placeholder={placeholder}
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          multiline
          rows={8}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Box my={3}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!text}
            type="submit"
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default TextInputDialogContent
