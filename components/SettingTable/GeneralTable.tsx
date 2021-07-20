import {
  Table,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Box,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'

interface GeneralTableProps {
  // accountAddress: string
  // open: boolean
  // onClose(): void
}

const GeneralTable: React.FC<GeneralTableProps> = (
  {
    // accountAddress,
    // open,
    // onClose,
  }
) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { theme, currency } = useGeneralContext()
  const iconProps = useIconProps()
  const [currentCurrency, setCurrentCurrency] = React.useState(currency)
  const [language, setLanguage] = React.useState('ENG')
  const [currentTheme, setCurrentTheme] = React.useState(theme)

  return (
    <Table>
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('currency')}</Typography>
        <Button
          // onClick={() => setAddAddressOpen(true)}
          variant="outlined"
          className={classes.timeRangeButton}
        >
          <Typography>{currentCurrency}</Typography>
          <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
        </Button>
      </Box>
      <Divider />
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('language')}</Typography>
        <Button
          // onClick={() => setAddAddressOpen(true)}
          variant="outlined"
          className={classes.timeRangeButton}
        >
          <Typography>{language}</Typography>
          <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
        </Button>
      </Box>
      <Divider />
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('display mode')}</Typography>
        <Button
          // onClick={() => setAddAddressOpen(true)}
          variant="outlined"
          className={classes.timeRangeButton}
        >
          <Typography>{t(currentTheme)}</Typography>
          <DropDownIcon {...iconProps} style={{ marginTop: '4px' }} />
        </Button>
      </Box>
      <Divider />
      <Box mx={2} my={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="subtitle1">{t('password lock')}</Typography>
        <Button
          variant="outlined"
          className={classes.timeRangeButton}
          style={{ textAlign: 'center' }}
        >
          <Typography>{t('change password')}</Typography>
        </Button>
      </Box>
      <Divider />
    </Table>
  )
}

export default GeneralTable
