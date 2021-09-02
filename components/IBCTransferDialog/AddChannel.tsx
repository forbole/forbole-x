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
import keyBy from 'lodash/keyBy'
import { Autocomplete } from '@material-ui/lab'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'

interface AddChannelProps {
  onConfirm(params: { chainId: string; channel: string }): void
  crypto: Cryptocurrency
}

const AddChannel: React.FC<AddChannelProps> = ({ onConfirm, crypto }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [chainId, setChainId] = React.useState('')
  const [channel, setChannel] = React.useState('')

  const chainMap = keyBy(crypto.ibcChains, 'chainId')

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
            options={crypto.ibcChains.map((chain) => chain.chainId)}
            getOptionLabel={(option) => chainMap[option].name}
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) =>
              options.filter((o) =>
                `${get(chainMap, `${o}.name`, '')}${get(chainMap, `${o}.chainId`, '')}`
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
              )
            }
            onChange={(e, id) => setChainId(id)}
            renderOption={(o) => (
              <Box display="flex" alignItems="center">
                <Avatar
                  className={classes.largeAvatar}
                  alt={get(chainMap, `${o}.name`, '') as string}
                  src={get(chainMap, `${o}.image`, '') as string}
                />
                <Typography>{get(chainMap, `${o}.name`, '')}</Typography>
              </Box>
            )}
            renderInput={({ InputProps, inputProps, ...params }) => (
              <TextField
                {...params}
                variant="filled"
                placeholder={t('select chain')}
                inputProps={{
                  ...inputProps,
                  value: get(chainMap, `${chainId}.name`, ''),
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  ...InputProps,
                  className: '',
                  disableUnderline: true,
                  startAdornment: chainId ? (
                    <Avatar
                      className={classes.avatar}
                      alt={get(chainMap, `${chainId}.name`, '') as string}
                      src={get(chainMap, `${chainId}.image`, '') as string}
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
