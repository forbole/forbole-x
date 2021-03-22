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
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'

interface SelectValidatorsProps {
  onConfirm(delegations: Array<{ amount: number; validator: string }>): void
  account: Account
  amount: number
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

const SelectValidators: React.FC<SelectValidatorsProps> = ({ account, amount, onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: string; validator: string }>
  >([{ amount: '', validator: '' }])
  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box mb={24}>
          <Typography className={classes.marginBottom}>
            {t('total delegated amount')}{' '}
            <b className={classes.marginLeft}>1.1107 {account.crypto}</b>
          </Typography>
          <Typography>{t('delegate to')}</Typography>
          {delegations.map((v, i) => (
            <Box key={i.toString()} display="flex" alignItems="center">
              <IconButton>
                <RemoveIcon {...iconProps} />
              </IconButton>
              <Autocomplete
                options={Object.keys(mockValidators)}
                openOnFocus
                // value={v.validator}
                // onChange={() => setDelegations(d => )}
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
                    fullWidth
                    variant="filled"
                    // TODO
                    InputProps={{
                      ...InputProps,
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
              {amount} {account.crypto}
            </Typography>
            <Typography>${amount} USD</Typography>
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
                  .map((v) => ({ ...v, amount: Number(v.amount) }))
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
