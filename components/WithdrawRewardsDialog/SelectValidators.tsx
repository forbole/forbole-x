import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
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
import ImageDefaultDark from '../../assets/images/image_default_dark.svg'
import ImageDefaultLight from '../../assets/images/image_default_light.svg'

interface SelectValidatorsProps extends Partial<FilledTextFieldProps> {
  wallet: Wallet
  onConfirm(delegations: ValidatorTag[], m: string): void
  account: Account
  crypto: Cryptocurrency
  totalAmount: TokenAmount
  validators: Validator[]
  preselectedValidatorAddresses?: string[]
  loading: boolean
  openDelegationDialog: () => void
  onClose(): void
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  wallet,
  account,
  crypto,
  totalAmount,
  onConfirm,
  validators,
  preselectedValidatorAddresses,
  loading,
  openDelegationDialog,
  onClose,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency, theme } = useGeneralContext()
  const [amount, setAmount] = React.useState<TokenAmount>({})
  const [page, setPage] = React.useState(0)
  const [value, setValue] = React.useState('')
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  // const [currentTab, setCurrentTab] = React.useState(0)
  const [state, setState] = React.useState({})
  const themeStyle = useTheme()

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
      {Object.keys(totalAmount).length > 0 ? (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            onConfirm(
              validatorList.filter((v) => v.isSelected === true),
              value
            )
          }}
        >
          <DialogContent className={classes.dialogContent}>
            <Box mb={4}>
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
              {validatorList.filter((x) => x.isSelected === true).length > 5 ? (
                <Box mt={2}>
                  <Typography color="secondary">
                    {wallet.type === 'mnemonic'
                      ? t('withdraw warning mnemonic')
                      : t('withdraw warning ledger')}
                  </Typography>
                </Box>
              ) : null}
            </Box>

            <Typography>{t('memo')}</Typography>
            <TextField
              InputProps={{
                disableUnderline: true,
              }}
              fullWidth
              variant="filled"
              value={value}
              placeholder={t('description optional')}
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
                <Typography variant="h5">
                  {formatTokenAmount(amount, account.crypto, lang)}
                </Typography>
                <Typography>
                  {formatCurrency(getTokenAmountBalance(amount), currency, lang)}
                </Typography>
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
                type="submit"
              >
                {loading ? <CircularProgress size={themeStyle.spacing(3.5)} /> : t('next')}
              </Button>
            </Box>
          </DialogActions>
        </form>
      ) : (
        <>
          <DialogContent className={classes.dialogContent}>
            <Box justifyContent="center" display="flex" mt={6}>
              {theme === 'light' ? <ImageDefaultLight /> : <ImageDefaultDark />}
            </Box>
            <Box textAlign="center" mt={4}>
              <Typography>{t('no rewards yet')}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {t('delegate your token and get some rewards')}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box justifyContent="center" display="flex" flex={1} mb={6} mt={2}>
              <Button
                variant="contained"
                classes={{ root: classes.button }}
                color="primary"
                onClick={() => {
                  openDelegationDialog()
                  onClose()
                }}
              >
                {t('delegate')}
              </Button>
            </Box>
          </DialogActions>
        </>
      )}
    </>
  )
}

export default SelectValidators
