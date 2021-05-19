import {
  Box,
  Button,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import keyBy from 'lodash/keyBy'
import React from 'react'
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import { Proposal } from './index'

interface SelectAnswerProps {
  accounts: Account[]
  onNext(voteAccount: Account, answer: { name: string; id: string }, memo?: string): void
  proposal: Proposal
}

const SelectAnswer: React.FC<SelectAnswerProps> = ({ accounts, onNext, proposal }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const answers = [
    {
      name: 'Yes',
      id: '01',
    },
    {
      name: 'No',
      id: '02',
    },
    {
      name: 'Veto',
      id: '03',
    },
    {
      name: 'Abstain',
      id: '04',
    },
  ]

  const answersMap = keyBy(answers, 'id')

  const iconProps = useIconProps()
  const testAccount = [
    ...accounts,
    {
      walletId: '1111',
      address: 'desmos111111',
      createdAt: 111111,
      crypto: 'DSM',
      fav: false,
      index: 0,
      name: 'DSM',
      displayName: '',
      id: '',
      rpDisplayName: '',
    },
  ]

  const accountsMap = keyBy(testAccount, 'address')
  const [answer, setAnswer] = React.useState<{ name: string; id: string }>()
  const [memo, setMemo] = React.useState('')
  const [voteAccount, setVoteAccount] = React.useState<Account>(testAccount[0])
  return (
    <>
      <DialogContent>
        <Box pb={2}>
          <Box>
            <Typography variant="button" className={classes.button}>
              {t('address')}
            </Typography>
            <Box display="flex" alignItems="center" mb={4}>
              <Autocomplete
                options={testAccount.map(({ address }) => address)}
                getOptionLabel={(option) =>
                  `${accountsMap[option].name} \n ${accountsMap[option].address}`
                }
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) => {
                  return options
                    .filter((o) =>
                      accountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .slice(0, 10)
                }}
                onChange={(_e, address: string) => setVoteAccount(accountsMap[address])}
                renderOption={(address) => (
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
                {`${t('vote proposal')} #${proposal.no}`}
              </Typography>
              <Box display="flex" alignItems="center">
                <Autocomplete
                  options={answers.map(({ id }) => id)}
                  getOptionLabel={(option) => answersMap[option].name}
                  openOnFocus
                  fullWidth
                  filterOptions={(options: string[], { inputValue }: any) =>
                    options
                      .filter((o) =>
                        answersMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                      )
                      .slice(0, 10)
                  }
                  onChange={(_e, id: string) => setAnswer(answersMap[id])}
                  renderOption={(id) => (
                    <Box display="flex" alignItems="center">
                      <Typography>{answersMap[id].name}</Typography>
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
            </Box>

            <Box mt={4}>
              <Typography variant="button" className={classes.button}>
                {t('memo')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="filled"
                placeholder={t('description optional')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Box>
            <Box display="flex" flex={1} pt={12}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                disabled={!!(answer === undefined)}
                onClick={() => onNext(voteAccount, answer, memo)}
              >
                {t('next')}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </>
  )
}

export default SelectAnswer
