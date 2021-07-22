import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { Autocomplete } from '@material-ui/lab'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useStyles from './styles'
import chains from '../../misc/chains'
import useIconProps from '../../misc/useIconProps'

interface AddChannelProps {
  onConfirm(params: { chainId: string; channel: string }): void
}

const AddChannel: React.FC<AddChannelProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [chainId, setChainId] = React.useState('')
  const [channel, setChannel] = React.useState('')

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm({ chainId, channel: `channel-${channel}` })
      }}
    >
      <Box mb={-2}>
        <DialogContentText color="error">{t('add channel warning')}</DialogContentText>
      </Box>
      <DialogContent className={classes.dialogContent}>
        <Box mb={4}>
          <Typography>{t('destination chain')}</Typography>
          <Autocomplete
            options={Object.values(chains).map((chain) => chain.chainId)}
            getOptionLabel={(option) => chains[option].name}
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) =>
              options.filter((o) =>
                `${get(chains, `${o}.name`, '')}${get(chains, `${o}.chainId`, '')}`
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
              )
            }
            onChange={(e, id) => setChainId(id)}
            renderOption={(o) => (
              <Box display="flex" alignItems="center">
                <Avatar
                  className={classes.largeAvatar}
                  alt={get(chains, `${o}.name`, '')}
                  src={get(chains, `${o}.image`, '')}
                />
                <Typography>{get(chains, `${o}.name`, '')}</Typography>
              </Box>
            )}
            renderInput={({ InputProps, inputProps, ...params }) => (
              <TextField
                {...params}
                variant="filled"
                placeholder={t('select chain')}
                inputProps={{
                  ...inputProps,
                  value: get(chains, `${chainId}.name`, ''),
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  ...InputProps,
                  className: '',
                  disableUnderline: true,
                  startAdornment: chainId ? (
                    <Avatar
                      className={classes.avatar}
                      alt={get(chains, `${chainId}.name`, '')}
                      src={get(chains, `${chainId}.image`, '')}
                    />
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
        <Box mb={13}>
          <Typography>{t('channel id')}</Typography>
          <TextField
            variant="filled"
            placeholder={t('destination chain channel id')}
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            fullWidth
            InputProps={{ disableUnderline: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.fullWidthButton }}
          disabled={!chainId || !channel}
          type="submit"
        >
          {t('save')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddChannel
