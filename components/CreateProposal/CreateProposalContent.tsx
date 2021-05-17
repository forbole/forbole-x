import React from 'react'
import {
  Box,
  Card,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Grid,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import keyBy from 'lodash/keyBy'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import Active from './Active'
import InActive from './InActive'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'

interface Proposal {
  no: string
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  content: string
  votingTime: string
  duration?: string
  isActive: boolean
  tag: string
}

interface CreateProposalContentProps {
  accounts: Account[]
  onNext(
    proposalAccount: Account,
    network: { name: string; id: string },
    type: { name: string; id: string },
    title: string,
    description: string
  ): void
}

const CreateProposalContent: React.FC<CreateProposalContentProps> = ({ accounts, onNext }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  const iconProps = useIconProps()
  const networks = [
    {
      name: 'Cosmoshub - ATOM',
      id: '01',
    },
    {
      name: 'Desmoshub - DSM',
      id: '02',
    },
  ]

  const types = [
    {
      name: 'Text Proposal',
      id: '01',
    },
    {
      name: 'Other Proposal',
      id: '02',
    },
  ]

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

  const [network, setNetwork] = React.useState<{ name: string; id: string }>()

  const [type, setType] = React.useState<{ name: string; id: string }>()

  const [proposalAccount, setProposalAccount] = React.useState<Account>(testAccount[0])

  const accountsMap = keyBy(testAccount, 'address')

  const networksMap = keyBy(networks, 'id')

  const typesMap = keyBy(types, 'id')

  const [description, setDescription] = React.useState('')

  const [title, setTitle] = React.useState('')

  const [memo, setMemo] = React.useState('')

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h1">{t('create proposal')}</Typography>
      </Box>
      <Box pt={4}>
        <Typography variant="button" className={classes.button}>
          {t('address')}
        </Typography>
        <Box display="flex" alignItems="center" ml={0} mb={4}>
          <Autocomplete
            options={testAccount.map(({ address }) => address)}
            getOptionLabel={(option) =>
              `${accountsMap[option].name} ${accountsMap[option].address}`
            }
            openOnFocus
            fullWidth
            filterOptions={(options: string[], { inputValue }: any) => {
              return options
                .filter((o) => accountsMap[o].name.toLowerCase().includes(inputValue.toLowerCase()))
                .slice(0, 10)
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="button" className={classes.button}>
              {t('network')}
            </Typography>
            <Box display="flex" alignItems="center" mr={4}>
              <Autocomplete
                options={networks.map(({ id }) => id)}
                getOptionLabel={(option) => networksMap[option].name}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options
                    .filter((o) =>
                      networksMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .slice(0, 10)
                }
                onChange={(_e, id: string) => setNetwork(networksMap[id])}
                renderOption={(id) => (
                  <Box display="flex" alignItems="center">
                    <Typography>{networksMap[id].name}</Typography>
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
          </Grid>

          <Grid item xs={6}>
            <Typography variant="button" className={classes.button}>
              {t('type')}
            </Typography>
            <Box display="flex" alignItems="center">
              <Autocomplete
                options={types.map(({ id }) => id)}
                getOptionLabel={(option) => typesMap[option].name}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options
                    .filter((o) =>
                      typesMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .slice(0, 10)
                }
                onChange={(_e, id: string) => setType(typesMap[id])}
                renderOption={(id) => (
                  <Box display="flex" alignItems="center">
                    <Typography>{typesMap[id].name}</Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select type')}
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
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="button" className={classes.button}>
            {t('title')}
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            placeholder={t('proposal title')}
            InputProps={{
              disableUnderline: true,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box mt={4}>
          <Typography variant="button" className={classes.button}>
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
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box mt={4}>
          <Typography variant="button" className={classes.button}>
            {t('memo')}
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            placeholder={t('memo')}
            InputProps={{
              disableUnderline: true,
            }}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" pt={12}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={
              !!(network === undefined || type === undefined || title === '' || description === '')
            }
            onClick={() => onNext(proposalAccount, network, type, title, description)}
          >
            {t('next')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateProposalContent
