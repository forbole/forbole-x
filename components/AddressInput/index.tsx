import { TextField, InputAdornment } from '@material-ui/core'
import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import keyBy from 'lodash/keyBy'
import useIconProps from '../../misc/useIconProps'
import { useGeneralContext } from '../../contexts/GeneralContext'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import AccountAvatar from '../AccountAvatar'
import cryptocurrencies from '../../misc/cryptocurrencies'

interface AddressInputProps {
  crypto: string
  value: string
  onChange(value: string): void
}

const AddressInput: React.FC<AddressInputProps> = ({ crypto, value, onChange }) => {
  const iconProps = useIconProps()
  const { favAddresses } = useGeneralContext()
  const addressesMap = keyBy(
    favAddresses.filter((a) => a.crypto === crypto),
    'address'
  )
  const cryptocurrency = cryptocurrencies[crypto] || {}

  return (
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
              addressesMap[o]?.moniker?.toLowerCase() +
              addressesMap[o]?.note?.toLowerCase() +
              addressesMap[o]?.address?.toLowerCase()
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
          placeholder={`${cryptocurrency.prefix}...`}
          inputProps={{
            ...inputProps,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
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
  )
}

export default AddressInput
