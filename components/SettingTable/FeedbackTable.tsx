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
  CircularProgress,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';

const FeedbackTable: React.FC = () => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const theme = useTheme();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [message, setMessage] = React.useState({ from: '', subject: '', text: '' });

  const handleClick = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch('/api/contact-us', {
        method: 'POST',
        body: JSON.stringify(message),
      });
      setLoading(false);
      setIsSuccessDialogOpen(true);
      setMessage({ from: '', subject: '', text: '' });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Paper className={classes.paper}>
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
          placeholder={t('email placeholder')}
          value={message.from}
          onChange={e => setMessage({ ...message, from: e.target.value })}
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
          onChange={e => setMessage({ ...message, subject: e.target.value })}
        />

        <Typography>{t('message')}</Typography>
        <TextField
          className={classes.message}
          fullWidth
          autoFocus
          multiline
          rows={10}
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={t('message placeholder')}
          value={message.text}
          onChange={e => setMessage({ ...message, text: e.target.value })}
        />
        <Box display="flex" justifyContent="flex-end" pt={4}>
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
            color="primary"
            disabled={
              loading || message.subject === '' || message.text === '' || message.from === ''
            }
          >
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </form>
      <Dialog open={isSuccessDialogOpen} onClose={() => setIsSuccessDialogOpen(false)}>
        <DialogTitle>
          <Typography variant="h4" align="center">
            {t('thank you')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography align="center">{t('thank you content')}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default FeedbackTable;
