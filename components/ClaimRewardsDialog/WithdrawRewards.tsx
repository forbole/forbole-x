import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
  Tabs,
  Tab,
  TablePagination,
  Checkbox,
  FormControlLabel,
  Avatar,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import useStyles from './styles'

interface WithdrawRewardsProps {
  onConfirm(amount: number): void
  account: Account
  validators: any
}

const WithdrawRewards: React.FC<WithdrawRewardsProps> = ({ account, onConfirm, validators }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency } = useGeneralContext()
  const [amount, setAmount] = React.useState('')
  const [currentTab, setCurrentTab] = React.useState(0)
  const [checked, setChecked] = React.useState(true)
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  const tabs = [{ label: 'withrawReward' }, { label: 'withdraw commission' }]

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box mb={10}>
          <Tabs
            className={classes.tab}
            value={currentTab}
            classes={{
              indicator: classes.tabIndicator,
            }}
            centered
            onChange={(e, v) => setCurrentTab(v)}
            // textColor={theme === 'light' ? 'primary' : 'inherit'}
          >
            {tabs.map((tab) => (
              <Tab key={tab.label} label={t(tab.label)} />
            ))}
          </Tabs>
          <Box mt={2}>
            <Typography className={classes.totalReward}>
              {t('total reward amount')}&nbsp;9,666.749 ATOM
            </Typography>
            <Typography>{t('withdraw amount')}</Typography>
            <Typography variant="h1" className={classes.h1}>
              622.028873 ATOM
            </Typography>
            <Typography>Select the validator below you want to claim the reward amount</Typography>
          </Box>
          <FormControlLabel
            value="end"
            control={
              <Checkbox
                className={classes.checkBox}
                checked={checked}
                onChange={handleChange}
                color="primary"
                size="small"
              />
            }
            label={<Typography>{t('withdraw all')}</Typography>}
            labelPlacement="end"
          />
          <Box>
            {validators.map((v) => {
              return (
                // <Box>
                // </Box>

                <FormControlLabel
                  className={classes.controllLabel}
                  value="end"
                  control={
                    <Checkbox
                      // className={classes.checkBox}
                      checked={checked}
                      onChange={handleChange}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" style={{ flex: 1, width: '25rem' }}>
                      <Avatar className={classes.validatorAvatar} alt={v.name} src={v.image} />
                      <Typography>{v.name}</Typography>
                      <Typography className={classes.rewardsAmount}>
                        {`${v.reward} ATOM`}
                      </Typography>
                    </Box>
                  }
                  labelPlacement="end"
                />
              )
            })}
          </Box>
          {/* <TablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            rowsCount={activitiesCollection.length}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          flex={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          mx={2}
        >
          <Box>
            <Typography variant="h5">{formatCrypto(0, account.crypto, lang)}</Typography>
            <Typography>{formatCurrency(0, currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!Number(amount)}
            onClick={() => onConfirm(Number(amount))}
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default WithdrawRewards
