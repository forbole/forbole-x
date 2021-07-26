import {
  Paper,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
  Typography,
  useTheme,
  Grid,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'

const HelpTable: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const {
    theme,
    currency,
    setCurrency,
    language,
    setLanguage,
    setTheme,
    notification,
    setNotification,
  } = useGeneralContext()
  const themeStyle = useTheme()
  const iconProps = useIconProps()
  const [anchor, setAnchor] = React.useState<Element>()
  const [anchorMode, setAnchorMode] = React.useState<Element>()
  const [anchorLanguage, setAnchorLanguage] = React.useState<Element>()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onClose = React.useCallback(() => {
    setAnchor(undefined)
    setAnchorLanguage(undefined)
    setAnchorMode(undefined)
  }, [setAnchor, setAnchorLanguage, setAnchorMode])

  const onDialogClose = () => {
    setDialogOpen(false)
  }

  // const helpContent = [
  //   {
  //     category: 'transfer and receive',
  //     content: [
  //       {
  //         display: true,
  //         title: 'how can i sent token?',
  //         detail:
  //           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
  //       },
  //       {
  //         display: false,
  //         title: 'how can i sent token?',
  //         detail:
  //           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
  //       },
  //       {
  //         display: false,
  //         title: 'how can i sent token?',
  //         detail:
  //           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
  //       },
  //     ],
  //   },
  //   {
  //     category: 'about staking',
  //     content: [
  //       {
  //         display: false,
  //         title: 'how can i sent token?',
  //         detail:
  //           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
  //       },
  //       {
  //         display: false,
  //         title: 'how can i sent token?',
  //         detail:
  //           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
  //       },
  //       {
  //         display: false,
  //         title: 'how can i sent token?',
  //         detail:
  //           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
  //       },
  //     ],
  //   },
  // ]

  const helpContent = [
    {
      category: 'transfer and receive',

      display: true,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'transfer and receive',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'transfer and receive',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'about staking',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'about staking',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'about staking',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
  ]

  const categories = ['transfer and receive', 'about staking']

  const [listedDetail, setListedDetail] = React.useState(helpContent)

  // const onClick = React.useCallback(
  //   (v: number, i: number) => {
  //     console.log('v, i', v, i)
  //     const updatedListDetail = listedDetail
  //     updatedListDetail[v].content[i].display = !updatedListDetail[v].content[i].display
  //     setListedDetail(updatedListDetail)
  //   },
  //   [listedDetail, setListedDetail]
  // )
  console.log('listedDetail', listedDetail)

  return (
    <>
      {/* <Autocomplete
        options={Object.keys(listedDetail[0].content)}
        getOptionLabel={(option) => cryptocurrencies[option].name}
        openOnFocus
        fullWidth
        filterOptions={(options: string[], { inputValue }: any) =>
          options
            .filter((o) =>
              cryptocurrencies[o].name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 10)
        }
        onChange={(_e, id: string) =>
          setEditedAddress((a) => ({
            ...a,
            crypto: cryptocurrencies[id].name,
          }))
        }
        renderOption={(id) => (
          <Box display="flex" alignItems="center">
            <Avatar
              className={classes.smallAvatar}
              src={cryptocurrencies[id].image}
              alt={cryptocurrencies[id].name}
            />
            <Typography>{cryptocurrencies[id].name}</Typography>
          </Box>
        )}
        renderInput={({ InputProps, inputProps, ...params }) => (
          <TextField
            {...params}
            variant="filled"
            placeholder={t('select network')}
            inputProps={{
              ...inputProps,
              value: `${Object.values(cryptocurrencies)[0].name}`,
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              ...InputProps,
              className: '',
              disableUnderline: true,
              startAdornment: editedAddress.crypto ? (
                <Box mr={-1}>
                  <Avatar
                    className={classes.validatorAvatar}
                    alt={editedAddress.crypto}
                    src={cryptocurrencies[editedAddress.crypto].image}
                  />
                </Box>
              ) : null,
              endAdornment: (
                <InputAdornment position="end">
                  <DropDownIcon {...iconProps} />
                </InputAdornment>
              ),
            }}
          />
        )}
      /> */}
      <Grid container spacing={2} style={{ marginTop: themeStyle.spacing(3) }}>
        <Grid item xs={6}>
          <Box my={2}>
            <Typography variant="h4">{t(categories[0])}</Typography>
          </Box>
          <Divider />
          {listedDetail.map((x, i) => {
            if (x.category === categories[0]) {
              console.log('x.display', x.display)
              return (
                <>
                  <Box
                    my={2}
                    onClick={() => {
                      const updatedListDetail = listedDetail
                      updatedListDetail[i].display = !updatedListDetail[i].display
                      // updatedListDetail[n].content[i].display =
                      //   !updatedListDetail[n].content[i].display
                      setListedDetail(updatedListDetail)
                      console.log('ifClick')
                    }}
                  >
                    <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                      <Typography gutterBottom>{t(x.title)}</Typography>
                      <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
                    </Box>
                    {x.display ? <Typography>{t(x.detail)}</Typography> : null}
                  </Box>
                  <Divider />
                </>
              )
            }
            return null
          })}
        </Grid>
        <Grid item xs={6}>
          <Typography>xs=4</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default HelpTable
