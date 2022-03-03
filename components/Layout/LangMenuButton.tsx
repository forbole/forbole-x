import { Button, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import useStyles from './styles'
import LangIcon from '../../assets/images/icons/icon_language.svg'
import useIconProps from '../../misc/useIconProps'

const LangMenuButton: React.FC = () => {
  const { t, lang } = useTranslation('common')
  const { locales, pathname, query } = useRouter()
  const iconProps = useIconProps(3)
  const classes = useStyles({})
  const [anchor, setAnchor] = React.useState<Element>()

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])

  React.useEffect(() => {
    onClose()
  }, [lang])

  return (
    <>
      <Button
        onClick={(e) => setAnchor(e.currentTarget)}
        className={classes.navBarButton}
        startIcon={<LangIcon {...iconProps} />}
      >
        {t(lang)}
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
        {locales
          .filter((l) => l !== lang)
          .map((l) => (
            <div key={l}>
              <Link
                href={{
                  pathname,
                  query,
                }}
                locale={l}
                passHref
              >
                <MenuItem button component="a">
                  {t(l)}
                </MenuItem>
              </Link>
            </div>
          ))}
      </Menu>
    </>
  )
}

export default React.memo(LangMenuButton)
