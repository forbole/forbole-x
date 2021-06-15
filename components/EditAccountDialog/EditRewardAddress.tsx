import { Box, DialogContent, Typography, TextField, DialogActions, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

interface EditRewardAddressProps {
  account: Account
  onNext(r: string, m: string): void
}

const EditRewardAddress: React.FC<EditRewardAddressProps> = ({ account, onNext }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [rewardAddress, setRewardAddress] = React.useState('')
  const [memo, setMemo] = React.useState('')

  return (
    <>
      <DialogContent>
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
                value={account.address}
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
                value={rewardAddress}
                onChange={(e) => setRewardAddress(e.target.value)}
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
          disabled={rewardAddress === ''}
          onClick={() => onNext(rewardAddress, memo)}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </>
  )
}

export default EditRewardAddress
