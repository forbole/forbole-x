import {
  Paper,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
  Typography,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import currencies from '../../misc/currencies'
import ChangeUnlockPasswordDialog from './ChangeUnlockPasswordDialog'

const themes = ['light', 'dark'] as const

const GeneralTable: React.FC = () => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { theme, currency, setCurrency, setTheme } = useGeneralContext()
  const { locales, pathname, query } = useRouter()
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

  return (
    <Paper style={{ padding: themeStyle.spacing(1), paddingRight: themeStyle.spacing(1) }}>
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('currency')}</Typography>
        <Button
          // style={{ background: 'red' }}
          // onClick={() => setAddAddressOpen(true)}
          onClick={(e) => {
            setAnchor(e.currentTarget)
          }}
          variant="outlined"
          className={classes.timeRangeButton}
        >
          <Typography>{currency}</Typography>
          <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
        </Button>
        <Menu
          anchorEl={anchor}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          open={!!anchor}
          onClose={onClose}
        >
          {currencies.map((x, i) => {
            return (
              <>
                <MenuItem
                  className={classes.menuItem}
                  button
                  onClick={() => {
                    setCurrency(x)
                    onClose()
                  }}
                >
                  {x}
                </MenuItem>
                {i + 1 === currencies.length ? null : (
                  <Divider style={{ margin: themeStyle.spacing(1) }} />
                )}
              </>
            )
          })}
        </Menu>
      </Box>
      <Divider />
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('language')}</Typography>
        <Button
          onClick={(e) => {
            setAnchorLanguage(e.currentTarget)
          }}
          variant="outlined"
          className={classes.timeRangeButton}
        >
          <Typography>{t(lang)}</Typography>
          <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
        </Button>
        <Menu
          anchorEl={anchorLanguage}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          open={!!anchorLanguage}
          onClose={onClose}
        >
          {locales.map((l, i) => {
            return (
              <div key={l}>
                <Link
                  href={{
                    pathname,
                    query,
                  }}
                  locale={l}
                  passHref
                >
                  <MenuItem className={classes.menuItem} button component="a">
                    {t(l)}
                  </MenuItem>
                </Link>
                {i + 1 === locales.length ? null : (
                  <Divider style={{ margin: themeStyle.spacing(1) }} />
                )}
              </div>
            )
          })}
        </Menu>
      </Box>
      <Divider />
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('display mode')}</Typography>
        <Button
          variant="outlined"
          className={classes.timeRangeButton}
          onClick={(e) => {
            setAnchorMode(e.currentTarget)
          }}
        >
          <Typography>{t(theme)}</Typography>
          <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
        </Button>
        <Menu
          anchorEl={anchorMode}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          open={!!anchorMode}
          onClose={onClose}
        >
          {themes.map((x, i) => {
            return (
              <>
                <MenuItem
                  className={classes.menuItem}
                  button
                  onClick={() => {
                    setTheme(x)
                    onClose()
                  }}
                >
                  {t(x)}
                </MenuItem>
                {i + 1 === themes.length ? null : (
                  <Divider style={{ margin: themeStyle.spacing(1) }} />
                )}
              </>
            )
          })}
        </Menu>
      </Box>
      <Divider />
      {/* <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('notification')}</Typography>
        <Switch
          onChange={() => setNotification(!notification)}
          checked={notification}
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.switchRoot,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          {...iconProps}
        />
      </Box>
      <Divider /> */}
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('password lock')}</Typography>
        <Button
          variant="outlined"
          className={classes.timeRangeButton}
          style={{ textAlign: 'center' }}
          onClick={() => setDialogOpen(true)}
        >
          <Typography>{t('change password')}</Typography>
        </Button>
      </Box>
      <ChangeUnlockPasswordDialog open={dialogOpen} onClose={onDialogClose} />
    </Paper>
  )
}

export default GeneralTable
