import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  // Tabs,
  // Tab,
  Checkbox,
  FormControlLabel,
  FilledTextFieldProps,
  CircularProgress,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import cloneDeep from 'lodash/cloneDeep'
import TablePagination from '../TablePagination'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatCurrency, formatTokenAmount, getTokenAmountBalance } from '../../misc/utils'
import useStyles from './styles'
import { ValidatorTag } from './index'
import ValidatorAvatar from '../ValidatorAvatar'

interface SelectValidatorsProps extends Partial<FilledTextFieldProps> {
  onConfirm(delegations: ValidatorTag[], m: string): void
  account: Account
  crypto: Cryptocurrency
  validators: Validator[]
  preselectedValidatorAddresses?: string[]
  loading: boolean
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  account,
  crypto,
  onConfirm,
  validators,
  preselectedValidatorAddresses,
  loading,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency } = useGeneralContext()
  const [amount, setAmount] = React.useState<TokenAmount>({})
  const [page, setPage] = React.useState(0)
  const [value, setValue] = React.useState('')
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  // const [currentTab, setCurrentTab] = React.useState(0)
  const [state, setState] = React.useState({})
  const theme = useTheme()

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const [isSelectAll, setIsSelectAll] = React.useState(false)

  // const tabs = [{ label: 'withdraw reward' }, { label: 'withdraw commission' }]

  const validatorsWithTag = []
  validators.forEach((x) => {
    validatorsWithTag.push({ ...x, isSelected: false })
  })
  const [validatorList, setValidatorList] = React.useState(validatorsWithTag)

  const calculateWithdrawAmount = (latestValidatorList) => {
    const withdrawAmount: TokenAmount = {}
    latestValidatorList.forEach((x) => {
      if (x.isSelected) {
        Object.keys(x.rewards).forEach((denom) => {
          if (withdrawAmount[denom]) {
            withdrawAmount[denom].amount += x.rewards[denom].amount
          } else {
            withdrawAmount[denom] = cloneDeep(x.rewards[denom])
          }
        })
      }
    })
    setAmount(withdrawAmount)
  }

  const totalAmount = React.useMemo(() => {
    const total: TokenAmount = {}
    validatorList.forEach((x) => {
      Object.keys(x.rewards).forEach((denom) => {
        if (total[denom]) {
          total[denom].amount += x.rewards[denom].amount
        } else {
          total[denom] = cloneDeep(x.rewards[denom])
        }
      })
    })
    return total
  }, [validatorList])

  const onSelect = (address) => {
    const index = validatorList.findIndex((v) => v.address === address)
    const updatedList = validatorList

    if (updatedList[index].isSelected === true) {
      updatedList[index].isSelected = false
    } else {
      updatedList[index].isSelected = true
    }
    setValidatorList(updatedList)
    calculateWithdrawAmount(updatedList)
  }

  const handleSelectAll = () => {
    const updatedList = validatorList
    if (!isSelectAll) {
      updatedList.forEach((x) => {
        const index = validatorList.findIndex((v) => v.address === x.address)
        updatedList[index].isSelected = true
      })
    } else {
      updatedList.forEach((x) => {
        const index = validatorList.findIndex((v) => v.address === x.address)
        updatedList[index].isSelected = false
      })
    }
    setIsSelectAll(!isSelectAll)
    setValidatorList(updatedList)
    calculateWithdrawAmount(updatedList)
  }

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(preselectedValidatorAddresses || []).forEach((a) => {
      onSelect(a)
    })
  }, [])

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box mb={10}>
          {/* <Tabs
            className={classes.tabs}
            value={currentTab}
            classes={{
              indicator: classes.tabIndicator,
            }}
            centered
            onChange={(e, v) => setCurrentTab(v)}
          >
            {tabs.map((tab) => (
              <Tab className={classes.tab} key={tab.label} label={t(tab.label)} />
            ))}
          </Tabs> */}
          <Box mt={4} mb={2}>
            <Typography className={classes.totalReward}>
              {t('total reward amount')}&nbsp;
              {formatTokenAmount(totalAmount, account.crypto, lang, ', ')}
            </Typography>
            <Typography>{t('withdraw amount')}</Typography>
            <Typography variant="h1" className={classes.h1}>
              {formatTokenAmount(amount, account.crypto, lang, ', ')}
            </Typography>
            <Typography>
              {t('select the validator below you want to claim the reward amount')}
            </Typography>
          </Box>
          <FormControlLabel
            value="end"
            control={<Checkbox onClick={handleSelectAll} color="primary" size="small" />}
            label={<Typography>{t('withdraw all')}</Typography>}
            labelPlacement="end"
          />
          <Box mt={0}>
            {validatorList.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((v) => (
              <FormControlLabel
                key={v.address}
                className={classes.controllLabel}
                value="end"
                control={
                  <Checkbox
                    checked={v.isSelected}
                    onClick={() => onSelect(v.address)}
                    onChange={handleChange}
                    color="primary"
                    size="small"
                    name={v.address}
                  />
                }
                label={
                  <Box display="flex" alignItems="center" style={{ flex: 1, width: '25rem' }}>
                    <ValidatorAvatar crypto={crypto} withoutLink validator={v} size="small" />
                    <Typography className={classes.rewardsAmount}>
                      {formatTokenAmount(v.rewards, account.crypto, lang, ', ')}
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
          variant="filled"
          value={value}
          placeholder={t('description')}
          multiline
          rows={4}
          onChange={(e) => setValue(e.target.value)}
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
            <Typography variant="h5">{formatTokenAmount(amount, account.crypto, lang)}</Typography>
            <Typography>{formatCurrency(getTokenAmountBalance(amount), currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            classes={{ root: classes.button }}
            color="primary"
            disabled={
              loading ||
              !Object.values(amount)
                .map((a) => a.amount)
                .reduce((a, b) => a + b, 0)
            }
            onClick={() =>
              onConfirm(
                validatorList.filter((v) => v.isSelected === true),
                value
              )
            }
          >
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default SelectValidators
