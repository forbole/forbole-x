import { FilledTextFieldProps, IconButton, InputAdornment, TextField } from '@material-ui/core'
import HidePasswordIcon from '../../assets/images/icons/icon_hide.svg'
import ShowPasswordIcon from '../../assets/images/icons/icon_show.svg'
import React from 'react'
import useIconProps from '../../misc/useIconProps'

interface PasswordInputProps extends Partial<FilledTextFieldProps> {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const iconProps = useIconProps()
  const [isShowingPassword, setIsShowingPassword] = React.useState(false)
  return (
    <TextField
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setIsShowingPassword((prev) => !prev)}>
              {isShowingPassword ? (
                <ShowPasswordIcon {...iconProps} />
              ) : (
                <HidePasswordIcon {...iconProps} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      type={isShowingPassword ? 'text' : 'password'}
      variant="filled"
      {...props}
    />
  )
}

export default PasswordInput
