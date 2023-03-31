import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import { Autocomplete } from '@material-ui/lab';
import AddIcon from '../../assets/images/icons/icon_add.svg';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';

interface SelectChainProps {
  onConfirm(params: { chainId: string; channel: string }): void;
  onAddChannelClick(): void;
  crypto: Cryptocurrency;
}

const SelectChain: React.FC<SelectChainProps> = ({ crypto, onConfirm, onAddChannelClick }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const theme = useTheme();
  const [chainId, setChainId] = React.useState('');
  const [channel, setChannel] = React.useState('');

  const chainMap = keyBy(crypto.ibcChains, 'chainId');

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onConfirm({ chainId, channel });
      }}>
      <Box mt={-1} mb={-3}>
        <DialogContentText>{t('select ibc chain')}</DialogContentText>
      </Box>
      <DialogContent className={classes.dialogContent}>
        <Box mb={30}>
          <Typography>{t('destination chain')}</Typography>
          <Autocomplete
            classes={{
              option: classes.listItem,
            }}
            options={crypto.ibcChains.map(chain => chain.chainId)}
            getOptionLabel={option => get(chainMap, `${option}.name`, '') as string}
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) =>
              options.filter(
                o =>
                  o === '' ||
                  `${get(chainMap, `${o}.name`, '')}${get(chainMap, `${o}.chainId`, '')}${get(
                    chainMap,
                    `${o}.channel`,
                    '',
                  )}`
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()),
              )
            }
            onChange={(e, id) => {
              setChainId(id);
              setChannel(get(chainMap, `${id}.channel`, '') as string);
            }}
            renderOption={o => (
              <Box display="flex" alignItems="center">
                <Avatar
                  className={classes.largeAvatar}
                  alt={get(chainMap, `${o}.name`, '') as string}
                  src={get(chainMap, `${o}.image`, '') as string}
                />
                <Box>
                  <Typography>{get(chainMap, `${o}.name`, '')}</Typography>
                  <Typography color="textSecondary" variant="body2">
                    {get(chainMap, `${o}.channel`, '')}
                  </Typography>
                </Box>
              </Box>
            )}
            ListboxComponent={({ children, ...props }) => (
              <ul {...props}>
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={2}
                  pb={1}>
                  <Typography>{t('select chain')}</Typography>
                  <Button
                    color="primary"
                    startIcon={<AddIcon {...iconProps} fill={theme.palette.primary.main} />}
                    onClick={() => onAddChannelClick()}>
                    {t('add new ibc channel')}
                  </Button>
                </Box>
                <Box px={2}>
                  <Divider />
                </Box>
                {children}
              </ul>
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
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.fullWidthButton }}
          disabled={!chainId}
          type="submit">
          {t('next')}
        </Button>
      </DialogActions>
    </form>
  );
};

export default SelectChain;
