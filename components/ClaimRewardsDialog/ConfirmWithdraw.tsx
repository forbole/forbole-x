import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  useTheme,
  TextField,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import WithdrawIcon from '../../assets/images/icons/icon_withdraw_tx.svg'
import useStyles from './styles'

interface ConfirmWithdrawProps {
  account: Account
  amount: number
  delegations: Array<{
    name: string
    image: string
    amount: number
    isSelected: boolean
    reward: number
  }>
  memo: string
  onConfirm(
    amount: number,
    delegations: Array<{
      name: string
      image: string
      amount: number
      isSelected: boolean
      reward: number
    }>,
    m: string
  ): void
}

const ConfirmWithdraw: React.FC<ConfirmWithdrawProps> = ({
  amount,
  account,
  delegations,
  memo,
  onConfirm,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  console.log('delegations', delegations)

  const example =
    '"chain_id": "akashnet-1",\n"account_number": "2063",\n"sequence": "8",\n"fee": {\n"gas": "1000",\n"amount": [{ "delegator_address": "akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw",\n},\n},'

  const [viewData, setViewData] = React.useState(false)

  const toggleViewData = () => {
    setViewData(!viewData)
  }

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
          <WithdrawIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          <Box mt={2} mb={4}>
            <Typography variant="h4">
              {t('withdraw')} {amount} {account.crypto}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {/* <Box my={1}>
          <Typography>{t('rewards')}</Typography>
          <Typography variant="body2" color="textSecondary">
            {account.address}
          </Typography>
        </Box>
        <Divider /> */}
        <Box my={1}>
          <Typography>{t('rewards')}</Typography>
          <Typography variant="body2" color="textSecondary">
            {amount}
          </Typography>
        </Box>
        {/* <Divider />
        <Box my={1}>
          <Typography>{t('memo')}</Typography>
          <Typography variant="body2" color="textSecondary">
            N/A
          </Typography>
        </Box> */}
        <Divider />
        <Box my={1}>
          <Typography>{t('withdraw rewards from')}</Typography>
          {delegations.map((d, i) => (
            <React.Fragment key={d.name}>
              <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
                <Box display="flex" alignItems="center">
                  <Avatar className={classes.validatorAvatar} alt={d.name} src={d.image} />
                  <Typography color="textSecondary">{d.name}</Typography>
                </Box>
                <Typography color="textSecondary">
                  {d.reward} {account.crypto}
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
          <Button variant="text" color="primary" onClick={toggleViewData}>
            {t('view data')}
          </Button>
        </Box>
        <TextField
          style={{ display: viewData ? 'inherit' : 'none' }}
          InputProps={{
            disableUnderline: true,
          }}
          fullWidth
          variant="filled"
          value={example}
          placeholder={t('description')}
          multiline
          rows={8}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          onClick={() => onConfirm(amount, delegations, memo)}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmWithdraw
