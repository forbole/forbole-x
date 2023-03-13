import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useTranslation from 'next-translate/useTranslation';
import keyBy from 'lodash/keyBy';
import React from 'react';
import useIconProps from '../../misc/useIconProps';
import useStyles from './styles';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import { useWalletsContext } from '../../contexts/WalletsContext';
import MemoInput from '../MemoInput';

interface SelectAnswerProps {
  crypto: Cryptocurrency;
  onNext(voteAccount: Account, answer: { name: string; id: string }, memo?: string): void;
  proposal: Proposal;
  loading: boolean;
}

const SelectAnswer: React.FC<SelectAnswerProps> = ({ crypto, onNext, proposal, loading }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const { accounts: allAccounts } = useWalletsContext();
  const theme = useTheme();
  const accounts = allAccounts.filter(a => a.crypto === crypto.name);
  const answers = [
    {
      name: t('yes'),
      id: '1',
    },
    {
      name: t('abstain'),
      id: '2',
    },
    {
      name: t('no'),
      id: '3',
    },
    {
      name: t('veto'),
      id: '4',
    },
  ];

  const answersMap = keyBy(answers, 'id');

  const iconProps = useIconProps();

  const accountsMap = keyBy(accounts, 'address');
  const [answer, setAnswer] = React.useState<{ name: string; id: string }>();
  const [memo, setMemo] = React.useState('');
  const [consent, setConsent] = React.useState(true);
  const [voteAccount, setVoteAccount] = React.useState<Account>(accounts[0]);

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onNext(voteAccount, answer, memo);
      }}>
      <DialogContent>
        <Box pb={2}>
          <Box>
            <Typography variant="button" className={classes.button}>
              {t('address')}
            </Typography>
            <Box display="flex" alignItems="center" mb={4}>
              <Autocomplete
                options={accounts.map(({ address }) => address)}
                getOptionLabel={option =>
                  `${accountsMap[option].name} \n ${accountsMap[option].address}`
                }
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) => {
                  return options.filter(o =>
                    accountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase()),
                  );
                }}
                onChange={(_e, address: string) => setVoteAccount(accountsMap[address])}
                value={voteAccount.address}
                renderOption={address => (
                  <Box display="flex" alignItems="center">
                    <Typography>{`${accountsMap[address].name}\n${accountsMap[address].address}`}</Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select account')}
                    inputProps={{
                      ...inputProps,
                      value: `${voteAccount.name} \n ${voteAccount.address}`,
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
            <Box>
              <Typography variant="button" className={classes.button}>
                {`${t('vote proposal')} #${proposal.id}`}
              </Typography>
              <Box display="flex" alignItems="center">
                <Autocomplete
                  options={answers.map(({ id }) => id)}
                  getOptionLabel={option => answersMap[option].name}
                  openOnFocus
                  fullWidth
                  filterOptions={(options: string[], { inputValue }: any) =>
                    options.filter(o =>
                      answersMap[o].name.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                  }
                  onChange={(_e, id: string) => setAnswer(answersMap[id])}
                  renderOption={id => (
                    <Box display="flex" alignItems="center">
                      <Typography>{answersMap[id].name}</Typography>
                    </Box>
                  )}
                  renderInput={({ InputProps, inputProps, ...params }) => (
                    <TextField
                      {...params}
                      variant="filled"
                      placeholder={t('select answer')}
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
            </Box>

            <Box mt={4}>
              <Typography variant="button" className={classes.button}>
                {t('memo')}
              </Typography>
              <MemoInput
                fullWidth
                multiline
                rows={4}
                variant="filled"
                placeholder={t('description optional')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={memo}
                setValue={setMemo}
                consent={consent}
                setConsent={setConsent}
              />
            </Box>
            <Box display="flex" flex={1} pt={12}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                disabled={loading || answer === undefined || !consent}
                type="submit">
                {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </form>
  );
};

export default SelectAnswer;
