import React from 'react'
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  useTheme,
  IconButton,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import keyBy from 'lodash/keyBy'
import last from 'lodash/last'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import RemoveIcon from '../../assets/images/icons/icon_clear.svg'
import TokenAmountInput from '../TokenAmountInput'
import useSendTransaction from '../../misc/useSendTransaction'

interface CreateProposalFormProps {
  account: Account
}

const CreateProposalForm: React.FC<CreateProposalFormProps> = ({ account }) => {
  const { classes } = useGetStyles()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const { accounts, password } = useWalletsContext()

  const iconProps = useIconProps()
  const sendTransaction = useSendTransaction()

  const types = [
    '/cosmos.gov.v1beta1.TextProposal',
    '/cosmos.params.v1beta1.ParameterChangeProposal',
    '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
    '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
  ]

  const [crypto, setCrypto] = React.useState(account.crypto)
  const network = cryptocurrencies[crypto]
  const [type, setType] = React.useState('')

  const [proposalAccount, setProposalAccount] = React.useState<Account>(account)
  const accountsMap = keyBy(accounts, 'address')

  const [description, setDescription] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [info, setInfo] = React.useState('')
  const [recipient, setRecipient] = React.useState('')
  const [amount, setAmount] = React.useState('')

  const [changes, setChanges] = React.useState<
    Array<{ subspace: string; key: string; value: string }>
  >([{ subspace: '', key: '', value: '' }])

  const onNext = async () => {
    try {
      setLoading(true)
      const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
        value: {
          content: {
            typeUrl: type,
            ...(type === '/cosmos.gov.v1beta1.TextProposal' && {
              value: {
                title,
                description,
              },
            }),
            ...(type === '/cosmos.params.v1beta1.ParameterChangeProposal' && {
              value: {
                title,
                description,
                changes: [
                  changes.map((x) => ({
                    subspace: x.subspace,
                    key: x.key,
                    value: x.value,
                  })),
                ],
              },
            }),
            ...(type === '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal' && {
              value: {
                title,
                description,
                plan: {
                  name,
                  // time,
                  height,
                  info,
                  // upgradedClientState: any,
                },
              },
            }),
            ...(type === '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal' && {
              value: {
                title,
                description,
                recipient,
                amount: [
                  {
                    amount: String(Number(amount) * 10 ** 6),
                    denom: network.gasFee.denom,
                  },
                ],
              },
            }),
          },
          initialDeposit: [],
          proposer: proposalAccount.address,
        },
      } as unknown as TransactionMsgSubmitProposal

      await sendTransaction(password, proposalAccount.address, {
        msgs: [msg],
        memo,
      })
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('create proposal')}</Typography>
      </Box>
      <Box pt={3}>
        <Typography variant="button" className={classes.itemButton}>
          {t('address')}
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Autocomplete
            options={accounts.filter((a) => a.crypto === crypto).map(({ address }) => address)}
            getOptionLabel={(option) =>
              `${accountsMap[option].name} ${accountsMap[option].address}`
            }
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) => {
              return options.filter((o) =>
                accountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
              )
            }}
            onChange={(_e, address: string) => {
              setProposalAccount(accountsMap[address])
              setCrypto(accountsMap[address].crypto)
            }}
            renderOption={(address) => (
              <Box display="flex" alignItems="center">
                <Typography>{`${accountsMap[address].name}  ${accountsMap[address].address}`}</Typography>
              </Box>
            )}
            renderInput={({ InputProps, inputProps, ...params }) => (
              <TextField
                {...params}
                variant="filled"
                placeholder={t('select account')}
                inputProps={{
                  ...inputProps,
                  value: `${proposalAccount.name} ${proposalAccount.address}`,
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  ...InputProps,
                  className: classes.input,
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
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="button" className={classes.itemButton}>
              {t('network')}
            </Typography>
            <Box display="flex" alignItems="center">
              <Autocomplete
                options={Object.keys(cryptocurrencies)}
                getOptionLabel={(option) => cryptocurrencies[option].chainName}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options.filter((o) =>
                    cryptocurrencies[o].chainName.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
                onChange={(_e, id: string) => {
                  setCrypto(id)
                  setProposalAccount((a) => (a.crypto === id ? a : null))
                }}
                renderOption={(id) => (
                  <Box display="flex" alignItems="center">
                    <Typography>
                      {cryptocurrencies[id].chainName} - {cryptocurrencies[id].name}
                    </Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select network')}
                    inputProps={{
                      ...inputProps,
                      value: `${cryptocurrencies[crypto].chainName} - ${cryptocurrencies[crypto].name}`,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      ...InputProps,
                      className: classes.input,
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
          </Grid>
          <Grid item xs={6}>
            <Typography variant="button" className={classes.itemButton}>
              {t('type')}
            </Typography>
            <Box display="flex" alignItems="center">
              <Autocomplete
                options={types}
                getOptionLabel={(option) => t(last(option.split('.')))}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options.filter((o) =>
                    t(last(o.split('.')))
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                }
                onChange={(_e, id: string) => setType(id)}
                renderOption={(id) => <Typography>{t(last(id.split('.')))}</Typography>}
                renderInput={({ InputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select type')}
                    InputProps={{
                      ...InputProps,
                      className: classes.input,
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
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="button" className={classes.itemButton}>
            {t('title')}
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            placeholder={t('proposal title')}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="button" className={classes.itemButton}>
            {t('description')}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="filled"
            placeholder={t('proposal description')}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        {type === '/cosmos.params.v1beta1.ParameterChangeProposal' &&
          changes.map((c, i) => (
            <Box mt={3}>
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Typography variant="button" className={classes.itemButton}>
                    {t('subspace')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder={t('proposal subspace')}
                    InputProps={{
                      disableUnderline: true,
                      className: classes.input,
                    }}
                    onChange={(e) => {
                      setChanges((d) =>
                        d.map((a, j) => (j === i ? { ...a, subspace: e.target.value } : a))
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="button" className={classes.itemButton}>
                    {t('key')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder={t('proposal key')}
                    InputProps={{
                      disableUnderline: true,
                      className: classes.input,
                    }}
                    onChange={(e) => {
                      setChanges((d) =>
                        d.map((a, j) => (j === i ? { ...a, key: e.target.value } : a))
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="button" className={classes.itemButton}>
                    {t('value')}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    placeholder={t('proposal value')}
                    InputProps={{
                      disableUnderline: true,
                      className: classes.input,
                    }}
                    onChange={(e) => {
                      setChanges((d) =>
                        d.map((a, j) => (j === i ? { ...a, value: e.target.value } : a))
                      )
                    }}
                  />
                </Grid>
                {changes.length <= 1 ? null : (
                  <Grid item xs={1}>
                    <Box mt={3.5}>
                      <IconButton
                        onClick={() => {
                          setChanges((d) => d.filter((a, j) => j !== i))
                        }}
                      >
                        <RemoveIcon {...iconProps} />
                      </IconButton>
                    </Box>
                  </Grid>
                )}
              </Grid>
              {i === changes.length - 1 ? (
                <Box mt={1}>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setChanges((x) => [...x, { subspace: '', key: '', value: '' }])}
                  >
                    {t('add change')}
                  </Button>
                </Box>
              ) : null}
            </Box>
          ))}

        {type === '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal' && (
          <Box mt={3}>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('name')}
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder={t('proposal name')}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('height')}
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  variant="filled"
                  placeholder={t('proposal height')}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                  }}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('info')}
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder={t('link')}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                  }}
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {type === '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal' && (
          <Box mt={3}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('recipient')}
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder={t('recipient name')}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                  }}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('amount')}
                </Typography>
                <TokenAmountInput
                  value={amount}
                  placeholder="0"
                  denom={crypto}
                  onValueChange={(a) => setAmount(a)}
                  onDenomChange={() => null}
                  availableAmount={{ [crypto]: { amount: 0, price: 0 } }}
                  InputProps={{
                    className: classes.input,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={3}>
          <Typography variant="button" className={classes.itemButton}>
            {t('memo')}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="filled"
            placeholder={t('memo')}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" pt={6}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={
              loading ||
              crypto === undefined ||
              type === undefined ||
              title === '' ||
              description === ''
            }
            onClick={onNext}
          >
            {loading ? <CircularProgress size={theme.spacing(3.5)} /> : t('next')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateProposalForm
