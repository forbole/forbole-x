import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  useTheme,
  Slider,
  Card,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { gql, useQuery } from '@apollo/client'
import get from 'lodash/get'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import keyBy from 'lodash/keyBy'
import shuffle from 'lodash/shuffle'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import {
  formatCrypto,
  formatCurrency,
  getValidatorCondition,
  getValidatorConditionClass,
} from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIsMobile from '../../misc/useIsMobile'
import ValidatorAvatar from '../ValidatorAvatar'
import { getSlashingParams } from '../../graphql/queries/validators'
import Condition from '../Condition'
import MemoInput from '../MemoInput'

interface SelectValidatorsProps {
  onConfirm(delegations: Array<{ amount: number; validator: Validator }>, memo: string): void
  delegations: Array<{ amount: number; validator: Validator }>
  price: number
  crypto: Cryptocurrency
  validators: Validator[]
  amount: number
  denom: string
  loading: boolean
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  crypto,
  validators,
  delegations: defaultDelegations,
  price,
  amount,
  denom,
  onConfirm,
  loading,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { currency, currencyRate, hideAmount } = useGeneralContext()
  const isMobile = useIsMobile()
  const theme = useTheme()
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: string; validator: any; percentage: string; showSlider: boolean }>
  >(
    defaultDelegations
      ? defaultDelegations.map((d) => ({
          amount: d.amount.toString(),
          validator: d.validator,
          percentage: ((100 * d.amount) / amount).toFixed(2),
          showSlider: false,
        }))
      : [{ amount: amount.toString(), validator: {}, percentage: '100', showSlider: false }]
  )
  const [memo, setMemo] = React.useState('')
  const [consent, setConsent] = React.useState(true)

  const validatorsMap = keyBy(validators, 'address')
  const randomizedValidators = React.useMemo(() => shuffle(validators), [])

  const { data: paramsData } = useQuery(
    gql`
      ${getSlashingParams(get(crypto, 'name', ''))}
    `
  )
  const slashingParams = get(paramsData, ['slashing_params', 0, 'params'], {
    signed_blocks_window: 0,
  })
  const signedBlockWindow = slashingParams.signed_blocks_window
  React.useMemo(() => {
    setDelegations((d) =>
      d.map((a, j) =>
        j < delegations.length - 1
          ? {
              ...a,
              percentage: String(((1 / delegations.length) * 100).toFixed(2)) || '',
              amount: String(amount * (1 / delegations.length)),
            }
          : {
              ...a,
              percentage:
                String(
                  (100 - (1 / delegations.length) * (delegations.length - 1) * 100).toFixed(2)
                ) || '',
              amount: String(amount * (1 - (1 / delegations.length) * (delegations.length - 1))),
            }
      )
    )
  }, [delegations.length])

  const totalAmount = React.useMemo(
    () => delegations.map((v) => Number(v.amount)).reduce((a, b) => a + b, 0),
    [delegations]
  )

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(
          delegations
            .filter((v) => v.validator.name && Number(v.amount))
            .map((v) => ({
              validator: v.validator,
              amount: Number(v.amount),
            })),
          memo
        )
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('target delegation amount')}{' '}
            <b className={classes.marginLeft}>
              {formatCrypto(amount, { unit: denom, lang, hideAmount })}
            </b>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('delegate to')}</Typography>
              {delegations.map((v, i) => (
                <Box
                  key={i.toString()}
                  display="flex"
                  alignItems="center"
                  ml={delegations.length <= 1 ? 0 : -5}
                  mt={i === 0 ? 0 : 1}
                >
                  {delegations.length <= 1 ? null : (
                    <IconButton
                      onClick={() => {
                        setDelegations((d) => d.filter((a, j) => j !== i))
                      }}
                    >
                      <RemoveIcon {...iconProps} />
                    </IconButton>
                  )}
                  <Autocomplete
                    options={randomizedValidators.map(({ address }) => address)}
                    getOptionLabel={(option) => validatorsMap[option].name}
                    openOnFocus
                    fullWidth
                    filterOptions={(options: string[], { inputValue }: any) =>
                      options.filter((o) =>
                        (validatorsMap[o].name || '')
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      )
                    }
                    onChange={(e, address) => {
                      setDelegations((d) =>
                        d.map((a, j) =>
                          j === i ? { ...a, validator: validatorsMap[address] || {} } : a
                        )
                      )
                    }}
                    renderOption={(address) => {
                      const missedBlockCounter = get(
                        validatorsMap,
                        [address, 'missedBlockCounter'],
                        0
                      )
                      const conditionClass = getValidatorCondition(
                        signedBlockWindow,
                        missedBlockCounter
                      )
                      const condition =
                        validatorsMap[address].status === 'active'
                          ? getValidatorConditionClass(conditionClass)
                          : undefined
                      return (
                        <Box
                          display="flex"
                          alignItems="center"
                          flexDirection="row"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <ValidatorAvatar
                            crypto={crypto}
                            validator={validatorsMap[address]}
                            size="small"
                            withoutLink
                          />
                          <Condition className={condition} />
                        </Box>
                      )
                    }}
                    renderInput={({ InputProps, inputProps, ...params }) => (
                      <TextField
                        {...params}
                        variant="filled"
                        placeholder={t('select validator')}
                        inputProps={{
                          ...inputProps,
                          value: v.validator.name,
                        }}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        InputProps={{
                          ...InputProps,
                          className: '',
                          disableUnderline: true,
                          startAdornment: v.validator.name ? (
                            <Box mr={-1}>
                              <Avatar
                                className={classes.validatorAvatar}
                                alt={v.validator.name}
                                src={v.validator.image}
                              />
                            </Box>
                          ) : null,
                          endAdornment: (
                            <InputAdornment position="end">
                              <DropDownIcon {...iconProps} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              ))}
              <Box mt={1}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() =>
                    setDelegations((d) => [
                      ...d,
                      { validator: '', amount: '', percentage: '', showSlider: false },
                    ])
                  }
                >
                  {t('add validator')}
                </Button>
              </Box>
              <Box mt={2}>
                <Typography gutterBottom>{t('memo')}</Typography>
                <MemoInput
                  fullWidth
                  multiline
                  rows={3}
                  placeholder={t('description optional')}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={memo}
                  setValue={setMemo}
                  consent={consent}
                  setConsent={setConsent}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('amount')}</Typography>
              {delegations.map((v, i) => (
                <Box position="relative">
                  <Box key={i.toString()} display="flex" alignItems="center" mt={i === 0 ? 0 : 1}>
                    <TextField
                      fullWidth
                      variant="filled"
                      placeholder="0"
                      type="number"
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: <InputAdornment position="end">{denom}</InputAdornment>,
                      }}
                      value={v.amount}
                      onChange={(e) =>
                        setDelegations((d) =>
                          d.map((a, j) =>
                            j === i
                              ? {
                                  ...a,
                                  amount: e.target.value,
                                  percentage: ((100 * Number(e.target.value)) / amount).toFixed(2),
                                }
                              : a
                          )
                        )
                      }
                    />
                    {isMobile ? null : (
                      <TextField
                        onFocus={() => {
                          setDelegations((d) =>
                            d.map((a, j) =>
                              j === i
                                ? {
                                    ...a,
                                    showSlider: true,
                                  }
                                : a
                            )
                          )
                          const closeSlider = (e) => {
                            if (!e.target.className.includes('MuiSlider')) {
                              window.removeEventListener('click', closeSlider)
                              setDelegations((d) =>
                                d.map((a, j) => ({
                                  ...a,
                                  showSlider: false,
                                }))
                              )
                            }
                          }
                          setTimeout(() => window.addEventListener('click', closeSlider), 100)
                        }}
                        className={classes.percentageTextField}
                        variant="filled"
                        placeholder="0"
                        type="number"
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        inputProps={{
                          className: classes.numberInput,
                        }}
                        value={v.percentage}
                        onChange={(e) =>
                          setDelegations((d) =>
                            d.map((a, j) =>
                              j === i
                                ? {
                                    ...a,
                                    percentage: e.target.value,
                                    amount: ((amount * Number(e.target.value)) / 100).toFixed(2),
                                  }
                                : a
                            )
                          )
                        }
                      />
                    )}
                  </Box>
                  {v.showSlider ? (
                    <Card className={classes.card}>
                      <Slider
                        value={Number(v.percentage) / 100}
                        defaultValue={0.25}
                        aria-labelledby="input-slider"
                        step={0.25}
                        marks
                        min={0}
                        max={1}
                        onChange={(_event, newValue) => {
                          setDelegations((d) =>
                            d.map((a, j) =>
                              j === i
                                ? {
                                    ...a,
                                    percentage: String(
                                      typeof newValue === 'number' ? newValue * 100 : ''
                                    ),
                                    amount: String((amount * Number(newValue || '') * 100) / 100),
                                  }
                                : a
                            )
                          )
                        }}
                      />
                    </Card>
                  ) : null}
                </Box>
              ))}
            </Grid>
          </Grid>
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
            <Typography variant="h5">
              {formatCrypto(totalAmount, { unit: denom, lang, hideAmount })}
            </Typography>
            <Typography>
              {formatCurrency(totalAmount * price * currencyRate, { currency, lang, hideAmount })}
            </Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={
              loading ||
              !delegations.filter((v) => v.validator.name && Number(v.amount)).length ||
              totalAmount > amount ||
              delegations.filter((v) => v.validator === '').length !== 0 ||
              !consent
            }
            type="submit"
          >
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default SelectValidators
