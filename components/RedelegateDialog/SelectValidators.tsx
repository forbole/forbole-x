import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  useTheme,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import keyBy from 'lodash/keyBy'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'
import ValidatorAvatar from '../ValidatorAvatar'

interface SelectValidatorsProps {
  onConfirm(toValidator: Validator, memo: string): void
  validators: Validator[]
  amount: number
  denom: string
  crypto: Cryptocurrency
  loading: boolean
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  validators,
  amount,
  denom,
  onConfirm,
  crypto,
  loading,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { currency } = useGeneralContext()
  const theme = useTheme()
  const [toValidator, setToValidator] = React.useState<Validator>()
  const [memo, setMemo] = React.useState('')

  const validatorsMap = keyBy(validators, 'address')

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(toValidator, memo)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('total delegated amount')}{' '}
            <b className={classes.marginLeft}>{formatCrypto(amount, denom, lang)}</b>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('redelegate to')}</Typography>
              <Box display="flex" alignItems="center">
                <Autocomplete
                  options={validators.map(({ address }) => address)}
                  getOptionLabel={(option) => validatorsMap[option].name}
                  openOnFocus
                  fullWidth
                  filterOptions={(options: string[], { inputValue }: any) =>
                    options
                      .filter((o) =>
                        validatorsMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                      )
                      .slice(0, 10)
                  }
                  onChange={(e, address) => setToValidator(validatorsMap[address])}
                  renderOption={(address) => (
                    <ValidatorAvatar
                      crypto={crypto}
                      validator={validatorsMap[address]}
                      size="small"
                      withoutLink
                    />
                  )}
                  renderInput={({ InputProps, ...params }) => (
                    <TextField
                      {...params}
                      variant="filled"
                      placeholder={t('select validator')}
                      InputProps={{
                        ...InputProps,
                        className: '',
                        disableUnderline: true,
                        startAdornment: toValidator ? (
                          <Box mr={-1}>
                            <Avatar
                              className={classes.validatorAvatar}
                              alt={toValidator.name}
                              src={toValidator.image}
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
              <Box mt={2}>
                <Typography gutterBottom>{t('memo')}</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="filled"
                  placeholder={t('description optional')}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t('amount')}</Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="0"
                  type="number"
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: <InputAdornment position="end">{denom}</InputAdornment>,
                  }}
                  value={amount}
                  contentEditable={false}
                />
              </Box>
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
            <Typography variant="h5">{formatCrypto(amount, denom, lang)}</Typography>
            <Typography>{formatCurrency(amount, currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={loading || !toValidator}
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
