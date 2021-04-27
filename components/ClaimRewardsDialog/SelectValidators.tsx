import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Avatar,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import TablePagination from '../TablePagination'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import useStyles from './styles'

interface SelectValidatorsProps {
  onConfirm(
    delegations: Array<{ amount: number; validator: { name: string; image: string } }>
  ): void
  account: Account
  validators: any
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({ account, onConfirm, validators }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency } = useGeneralContext()
  const [amount, setAmount] = React.useState(1)
  const [page, setPage] = React.useState(0)
  const [value, setValue] = React.useState('')
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  const [checked, setChecked] = React.useState(true)
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  const handleClick = (v) => {
    v.isSelected = true
  }

  const tabs = [{ label: 'withrawReward' }, { label: 'withdraw commission' }]

  const [selectedValidators, setSelectedValidators] = React.useState([])
  const select = (v: any) => {
    setSelectedValidators([...selectedValidators, v])
  }
  const validatorList = () => {
    const newList = []
    validators.map((x) => {
      newList.push({ ...x, isSelected: false })
      return newList
    })
    return newList
  }

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
                // className={classes.checkBox}
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
            {validatorList()
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((v, i) => (
                <FormControlLabel
                  className={classes.controllLabel}
                  value="end"
                  control={
                    <Checkbox
                      // className={classes.checkBox}
                      checked={v.isSelected}
                      onClick={handleClick(v)}
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
              ))}
          </Box>
          <TablePagination
            className={classes.tablePagination}
            hideFooter
            page={page}
            rowsPerPage={rowsPerPage}
            rowsCount={validators.length}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </Box>
        <Typography>{t('memo')}</Typography>
        <TextField
          InputProps={{
            disableUnderline: true,
          }}
          fullWidth
          // type={isShowingPassword ? 'text' : 'password'}
          variant="filled"
          value={value}
          placeholder={t('description')}
          multiline
          rows={4}
        />
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
            onClick={() =>
              onConfirm(
                validators.filter((v) => v.isSelected === true),
                value
              )
            }
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SelectValidators
