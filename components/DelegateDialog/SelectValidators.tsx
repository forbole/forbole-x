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
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface SelectValidatorsProps {
  onConfirm(
    delegations: Array<{ amount: number; validator: { name: string; image: string } }>,
    memo: string
  ): void
  account: Account
  amount: number
  denom: string
}

const mockValidators = {
  Forbole: {
    image:
      'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
    name: 'Forbole',
  },
  'Forbole 2': {
    image:
      'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
    name: 'Forbole 2',
  },
  'Forbole 3': {
    image:
      'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
    name: 'Forbole 3',
  },
}

const SelectValidators: React.FC<SelectValidatorsProps> = ({
  account,
  amount,
  denom,
  onConfirm,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { currency } = useGeneralContext()
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: string; validator: string; percentage: string }>
  >([{ amount: amount.toString(), validator: '', percentage: '100' }])
  const [memo, setMemo] = React.useState('')
  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box ml={4} minHeight={360} maxHeight={600}>
          <Typography className={classes.marginBottom}>
            {t('total delegated amount')}{' '}
            <b className={classes.marginLeft}>{formatCrypto(amount, denom, lang)}</b>
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
                    <IconButton onClick={() => setDelegations((d) => d.filter((a, j) => j !== i))}>
                      <RemoveIcon {...iconProps} />
                    </IconButton>
                  )}
                  <Autocomplete
                    options={Object.keys(mockValidators)}
                    openOnFocus
                    fullWidth
                    value={v.validator}
                    onChange={(e, val) =>
                      setDelegations((d) =>
                        d.map((a, j) => (j === i ? { ...a, validator: val } : a))
                      )
                    }
                    renderOption={(option) => (
                      <Box display="flex" alignItems="center">
                        <Avatar
                          className={classes.validatorAvatar}
                          alt={mockValidators[option].name}
                          src={mockValidators[option].image}
                        />
                        <Typography>{mockValidators[option].name}</Typography>
                      </Box>
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
                    setDelegations((d) => [...d, { validator: '', amount: '', percentage: '' }])
                  }
                >
                  {t('add validator')}
                </Button>
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
              {delegations.map((v, i) => (
                <Box key={i.toString()} display="flex" alignItems="center" mt={i === 0 ? 0 : 1}>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder="0"
                    type="number"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">{account.crypto}</InputAdornment>
                      ),
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
                  <TextField
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
            <Typography variant="h5">{formatCrypto(amount, account.crypto, lang)}</Typography>
            <Typography>{formatCurrency(amount, currency, lang)}</Typography>
          </Box>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!delegations.filter((v) => v.validator && Number(v.amount)).length}
            onClick={() =>
              onConfirm(
                delegations
                  .filter((v) => v.validator && Number(v.amount))
                  .map((v) => ({
                    validator: mockValidators[v.validator],
                    amount: Number(v.amount),
                  })),
                memo
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
