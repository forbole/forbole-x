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
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import ReactJson from 'react-json-view'
import keyBy from 'lodash/keyBy'
import invoke from 'lodash/invoke'
import last from 'lodash/last'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'

interface CreateProposalFormProps {
  account: Account
}

const CreateProposalForm: React.FC<CreateProposalFormProps> = ({ account }) => {
  const { classes } = useGetStyles()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const { accounts, password } = useWalletsContext()

  const iconProps = useIconProps()

  const types = [
    '/cosmos.gov.v1beta1.TextProposal',
    '/cosmos.params.v1beta1.ParameterChangeProposal',
    '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
    '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
  ]

  const [crypto, setCrypto] = React.useState(account.crypto)
  const [type, setType] = React.useState('')

  const [proposalAccount, setProposalAccount] = React.useState<Account>(account)
  const accountsMap = keyBy(accounts, 'address')

  const [description, setDescription] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [subspace, setSubspace] = React.useState('')
  const [key, setKey] = React.useState('')
  const [value, setValue] = React.useState({})

  //  setDelegation in /components/DelegationDialog/SelectValidators.tsx
  //  value is JSON object so the text field needs to be JSON formatted
  const [changes, setChanges] = React.useState<
    Array<{ subspace: string; key: string; value: any; showSlider: boolean }>
  >([{ subspace: subspace.toString(), key: key.toString(), value: {}, showSlider: false }])

  // const getParamsChangeJson = () => {}
  console.log('value', value)

  React.useMemo(() => {
    setChanges((c) =>
      c.map((x, i) =>
        i < changes.length - 1
          ? {
              ...x,
              subspace: x.subspace,
              value: x.value,
              showSlider: false,
            }
          : {
              ...x,
              subspace: x.subspace,
              value: x.value,
              showSlider: false,
            }
      )
    )
  }, [changes.length])

  const onNext = async () => {
    try {
      setLoading(true)
      const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
        value: {
          content: {
            typeUrl: type,
            value: {
              title,
              description,
            },
          },
          initialDeposit: [],
          proposer: proposalAccount.address,
        },
      }
      await invoke(window, 'forboleX.sendTransaction', password, proposalAccount.address, {
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
      <Box pt={4}>
        <Typography variant="button" className={classes.itemButton}>
          {t('address')}
        </Typography>
        <Box display="flex" alignItems="center" ml={0} mb={4}>
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="button" className={classes.itemButton}>
              {t('network')}
            </Typography>
            <Box display="flex" alignItems="center" mr={4}>
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

        <Box mt={4}>
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

        <Box mt={4}>
          <Typography variant="button" className={classes.itemButton}>
            {t('description')}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
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
        {type === '/cosmos.params.v1beta1.ParameterChangeProposal' && (
          <Box mt={4}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('subspace')}
                </Typography>
                <TextField
                  fullWidth
                  // multiline
                  // rows={10}
                  variant="filled"
                  placeholder={t('proposal subspace')}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                  }}
                  value={subspace}
                  onChange={(e) => setSubspace(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('key')}
                </Typography>
                <TextField
                  fullWidth
                  // multiline
                  // rows={10}
                  variant="filled"
                  placeholder={t('proposal key')}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                  }}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="button" className={classes.itemButton}>
                  {t('value')}
                </Typography>
                <ReactJson
                  theme="monokai"
                  style={{
                    padding: '0',
                    backgroundColor: 'rgb(59, 59, 59))',
                    width: '100%',
                    // backgroundColor: ' -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59))',
                  }}
                  onEdit={(e) => {
                    console.log('json', e)
                    // if (e.updated_src) {
                    //   setValue(e.updated_src)
                    // }
                  }}
                  onAdd={(e) => {
                    console.log('add callback', e)
                    // e.updated_src.push(e.existing_src[0])
                    // setValue(e.updated_src)
                    // if (e.updated_src) {
                    //   setValue(e.updated_src)
                    //   return
                    // }
                  }}
                  onDelete={(e) => {
                    console.log('delete callback', e)
                  }}
                  src={{}}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={4}>
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
