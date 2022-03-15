import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Box,
  Typography,
  Menu,
  MenuItem,
  Paper,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useGeneralContext } from '../../contexts/GeneralContext'
import IOSSwitch from '../IOSSwitch'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import currencies from '../../misc/currencies'

interface SetPreferenceProps {
  onConfirm(): void
}

const SetPreference: React.FC<SetPreferenceProps> = ({ onConfirm }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const {
    theme,
    currency,
    setCurrency,
    setTheme,
    alwaysRequirePassword,
    setAlwaysRequirePassword,
  } = useGeneralContext()
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlwaysRequirePassword(event.target.checked)
  }
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? 'dark' : 'light')
  }
  const { locales, pathname, query } = useRouter()
  const themeStyle = useTheme()
  const iconProps = useIconProps()
  const [anchor, setAnchor] = React.useState<Element>()
  const [anchorMode, setAnchorMode] = React.useState<Element>()
  const [anchorLanguage, setAnchorLanguage] = React.useState<Element>()
  const onClose = React.useCallback(() => {
    setAnchor(undefined)
    setAnchorLanguage(undefined)
    setAnchorMode(undefined)
  }, [setAnchor, setAnchorLanguage, setAnchorMode])

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm()
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('your preference description')}</DialogContentText>
        <Paper style={{ paddingLeft: themeStyle.spacing(1), paddingRight: themeStyle.spacing(1) }}>
          <Box px={2} py={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{t('dark mode')}</Typography>
            <IOSSwitch
              sx={{ m: 1 }}
              checked={theme === 'dark'}
              onChange={(e) => handleModeChange(e)}
            />
          </Box>
          <Divider />
          <Box px={2} py={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{t('currency')}</Typography>
            <Button
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
                  <div>
                    <MenuItem
                      className={classes.menuItem}
                      key={i}
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
                  </div>
                )
              })}
            </Menu>
          </Box>
          <Divider />
          <Box px={2} py={2} display="flex" alignItems="center" justifyContent="space-between">
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
          <Box px={2} py={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{t('require password after minutes')}</Typography>
            <IOSSwitch
              sx={{ m: 1 }}
              checked={alwaysRequirePassword}
              onChange={(e) => handlePasswordChange(e)}
            />
          </Box>
        </Paper>
        <Box pt={1}>
          <Typography variant="body2" color="textSecondary">
            {t('require password reminder')}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button className={classes.button} variant="contained" color="primary" type="submit">
            {t('start now')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default SetPreference
