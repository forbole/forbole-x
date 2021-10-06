import {
  Box,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface EditRewardAddressProps {
  oldWithdrawAddress: string
  onNext(r: string, m: string): void
  loading: boolean
}

const EditRewardAddress: React.FC<EditRewardAddressProps> = ({
  oldWithdrawAddress,
  onNext,
  loading,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const [withdrawAddress, setWithdrawAddress] = React.useState('')
  const [memo, setMemo] = React.useState('')

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onNext(withdrawAddress, memo)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box my={2}>
          <Box>
            <Box mb={2}>
              <Typography>{t('reward address')}</Typography>
              <TextField
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                value={oldWithdrawAddress}
                disabled
                className={classes.textField}
              />
            </Box>
            <Box mb={2}>
              <Typography>{t('new reward address')}</Typography>
              <TextField
                fullWidth
                variant="filled"
                placeholder={t('insert address')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
              />
            </Box>
            <Box>
              <Typography className={classes.marginBottom}>{t('memo')}</Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder={t('description')}
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.nextButton}
          color="primary"
          disabled={withdrawAddress === '' || loading}
          type="submit"
        >
          {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default EditRewardAddress
