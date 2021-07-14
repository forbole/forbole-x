import { Box, IconButton, TextField, Typography, InputAdornment } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import keyBy from 'lodash/keyBy'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import useIconProps from '../../misc/useIconProps'
import { useGeneralContext } from '../../contexts/GeneralContext'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'

interface AutoCompleteAddressesProps {
  recipients: Array<{ amount: string; denom: string; address: string }>
  setRecipients: (a) => void
}

const AutoCompleteAddresses: React.FC<AutoCompleteAddressesProps> = ({
  recipients,
  setRecipients,
}) => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()

  const { favAddresses } = useGeneralContext()

  const addressesMap = keyBy(favAddresses, 'address')

  return (
    <>
      {recipients.map((v, i) => (
        <Box
          key={i.toString()}
          display="flex"
          alignItems="center"
          ml={recipients.length <= 1 ? 0 : -5}
          mt={i === 0 ? 0 : 1}
        >
          {recipients.length <= 1 ? null : (
            <IconButton onClick={() => setRecipients((d) => d.filter((a, j) => j !== i))}>
              <RemoveIcon {...iconProps} />
            </IconButton>
          )}
          <Autocomplete
            options={Object.keys(addressesMap)}
            getOptionLabel={(option) => addressesMap[option].address}
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) =>
              options
                .filter((o) =>
                  addressesMap[o].moniker.toLowerCase().includes(inputValue.toLowerCase())
                )
                .slice(0, 10)
            }
            onChange={(e, id: string) => {
              // eslint-disable-next-line no-unused-expressions
              id
                ? setRecipients(
                    (d) =>
                      d.map((a, j) => (j === i ? { ...a, address: addressesMap[id].address } : a))
                    // )
                  )
                : null
            }}
            renderOption={(id) => (
              <Box display="flex" alignItems="center">
                <Typography>{`${addressesMap[id].moniker} ${addressesMap[id].address}`}</Typography>
              </Box>
            )}
            renderInput={({ InputProps, inputProps, ...params }) => (
              <TextField
                {...params}
                variant="filled"
                placeholder={t('select network')}
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
        </Box>
      ))}
    </>
  )
}

export default AutoCompleteAddresses
