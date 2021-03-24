import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import DelegateIcon from '../../assets/images/icons/icon_delegate_tx.svg'
import useStyles from './styles'

interface ConfirmDelegationProps {
  account: Account
  amount: number
  delegations: Array<{ amount: number; validator: { name: string; image: string } }>
  memo: string
  onConfirm(): void
}

const ConfirmDelegation: React.FC<ConfirmDelegationProps> = ({
  account,
  amount,
  delegations,
  memo,
  onConfirm,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
          <DelegateIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          <Box mt={2} mb={4}>
            <Typography variant="h4">
              {t('delegate')} {amount} {account.crypto}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('from')}</Typography>
          <Typography variant="body2" color="textSecondary">
            {account.address}
          </Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('delegate to')}</Typography>
          {delegations.map((d, i) => (
            <React.Fragment key={d.validator.name}>
              <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    className={classes.validatorAvatar}
                    alt={d.validator.name}
                    src={d.validator.image}
                  />
                  <Typography color="textSecondary">{d.validator.name}</Typography>
                </Box>
                <Typography color="textSecondary">
                  {d.amount} {account.crypto}
                </Typography>
              </Box>
              {i === delegations.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))}
        </Box>
        <Divider />
        <Box my={1}>
          <Typography gutterBottom>{t('memo')}</Typography>
          <Typography color="textSecondary">{memo || t('NA')}</Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography gutterBottom>{t('fee')}</Typography>
          <Typography color="textSecondary">
            {0.00001} {account.crypto}
          </Typography>
        </Box>
        <Divider />
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button variant="text" color="secondary">
            {t('view data')}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          onClick={onConfirm}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmDelegation
