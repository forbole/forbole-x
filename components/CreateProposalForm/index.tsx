import React from 'react'
import { Box, Button, InputAdornment, TextField, Typography, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import keyBy from 'lodash/keyBy'
import { useRouter } from 'next/router'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import chains from '../../misc/chains'

interface CreateProposalFormProps {
  account: Account
}

const CreateProposalForm: React.FC<CreateProposalFormProps> = ({ account }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const {
    query: { network: defaultNetwork },
  } = useRouter()

  const iconProps = useIconProps()

  const types = [
    {
      name: `${t('Text')}`,
      id: 'Text',
    },
    {
      name: `${t('ParameterChange')}`,
      id: 'ParameterChange',
    },
    {
      name: `${t('SoftwareUpgrade')}`,
      id: 'SoftwareUpgrade',
    },
    {
      name: `${t('CommunityPoolSpend')}`,
      id: 'CommunityPoolSpend',
    },
  ]

  const [networkKey, setNetworkKey] = React.useState(String(defaultNetwork))
  const network = chains[networkKey]

  const [type, setType] = React.useState<{ name: string; id: string }>()

  const [proposalAccount, setProposalAccount] = React.useState<Account>(account)
  const accountsMap = keyBy(accounts, 'address')
  const typesMap = keyBy(types, 'id')

  const [description, setDescription] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [memo, setMemo] = React.useState('')

  // TODO
  const onNext = () => null

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
            options={accounts.map(({ address }) => address)}
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
            onChange={(_e, address: string) => setProposalAccount(accountsMap[address])}
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
                options={Object.values(chains).map(({ chainId }) => chainId)}
                getOptionLabel={(option) => chains[option].name}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options.filter((o) =>
                    chains[o].name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
                onChange={(_e, id: string) => setNetworkKey(id)}
                renderOption={(id) => (
                  <Box display="flex" alignItems="center">
                    <Typography>
                      {chains[id].name} - {chains[id].crypto}
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
                      value: `${network.name} - ${network.crypto}`,
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
                options={types.map(({ id }) => id)}
                getOptionLabel={(option) => typesMap[option].name}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options.filter((o) =>
                    typesMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
                onChange={(_e, id: string) => setType(typesMap[id])}
                renderOption={(id) => <Typography>{typesMap[id].name}</Typography>}
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
              !!(network === undefined || type === undefined || title === '' || description === '')
            }
            onClick={onNext}
          >
            {t('next')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateProposalForm
