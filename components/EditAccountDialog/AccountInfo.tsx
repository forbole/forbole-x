import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Divider,
} from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useStyles from './styles'

interface AccountInfoProps {
  onEdit(): void
  onRemove(): void
  onSave(moniker): void
  onShare(): void
  onDetail(): void
  account: Account
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  account,
  onEdit,
  onRemove,
  onSave,
  onShare,
  onDetail,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { currency } = useGeneralContext()
  const [moniker, setMoniker] = React.useState(account.name)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(moniker)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box mb={6}>
          <Box mb={4}>
            <Typography className={classes.marginBottom}>{t('moniker')}</Typography>
            <TextField
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              value={moniker}
              onChange={(e) => setMoniker(e.target.value)}
            />
          </Box>
          <Box my={1} display="flex">
            <Box>
              <Typography>{t('address')}</Typography>
              <Typography color="textSecondary">{account.address}</Typography>
            </Box>
            <Box justifyContent="flex-end" display="flex" flex={1} alignItems="center">
              <Button variant="outlined" className={classes.iconButton} onClick={onShare}>
                {t('share')}
              </Button>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Box my={1} display="flex">
            <Box>
              <Typography>
                {t('reward address')}
                <HelpOutline fontSize="small" className={classes.helpOutLine} onClick={onDetail} />
              </Typography>
              <Typography color="textSecondary">{account.address}</Typography>
            </Box>
            <Box justifyContent="flex-end" display="flex" flex={1} alignItems="center">
              <Button variant="outlined" className={classes.iconButton} onClick={onShare}>
                {t('share')}
              </Button>
            </Box>
          </Box>
          <Divider className={classes.divider} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="block" width="100%" mb={2}>
          <Box display="flex">
            <Button
              className={classes.actionButton}
              variant="contained"
              color="secondary"
              onClick={onEdit}
            >
              {t('edit reward address')}
            </Button>
          </Box>
          <Box display="flex">
            <Button
              className={classes.actionButton}
              variant="contained"
              color="primary"
              onClick={onRemove}
            >
              {t('remove account')}
            </Button>
          </Box>
          <Box display="flex">
            <Button className={classes.saveButton} variant="outlined" type="submit">
              {t('save')}
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </form>
  )
}

export default AccountInfo
