import { TextField, InputAdornment, Box, FormHelperText } from '@material-ui/core'
import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import keyBy from 'lodash/keyBy'
import useTranslation from 'next-translate/useTranslation'
import useIconProps from '../../misc/useIconProps'
import { useGeneralContext } from '../../contexts/GeneralContext'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import AccountAvatar from '../AccountAvatar'
import { isAddressValid } from '../../misc/utils'

interface AddressInputProps {
  prefix: string
  value: string
  onChange(value: string): void
}

const AddressInput: React.FC<AddressInputProps> = ({ prefix, value, onChange }) => {
  const iconProps = useIconProps()
  const { t } = useTranslation()
  const { favAddresses } = useGeneralContext()
  const addressesMap = keyBy(
    favAddresses.filter((a) => isAddressValid(prefix, a.address)),
    'address'
  )

  const error = value && !isAddressValid(prefix, value)

  return (
    <Box flex={1}>
      <Autocomplete
        options={Object.keys(addressesMap)}
        inputValue={value}
        onInputChange={(e, address: string) => onChange(address)}
        freeSolo
        getOptionLabel={(option) => option}
        openOnFocus
        fullWidth
        filterOptions={(options: string[], { inputValue }: any) =>
          options
            .filter((o) =>
              (
                addressesMap[o].moniker.toLowerCase() +
                addressesMap[o].note.toLowerCase() +
                addressesMap[o].address.toLowerCase()
              ).includes(inputValue.toLowerCase())
            )
            .slice(0, 10)
        }
        renderOption={(address) => (
          <AccountAvatar address={addressesMap[address]} size="small" disableCopyAddress />
        )}
        renderInput={({ InputProps, inputProps, ...params }) => (
          <TextField
            {...params}
            variant="filled"
            placeholder={`${prefix}...`}
            inputProps={{
              ...inputProps,
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              ...InputProps,
              className: '',
              disableUnderline: true,
              error,
              endAdornment: (
                <InputAdornment position="end">
                  <DropDownIcon {...iconProps} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {error ? (
        <FormHelperText variant="filled" error>
          {t('invalid address')}
        </FormHelperText>
      ) : null}
    </Box>
  )
}

export default AddressInput
