import {
  Table,
  TableBody,
  TableHead,
  DialogContent,
  TableRow,
  TableCell,
  Typography,
  Button,
  Box,
  Avatar,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import format from 'date-fns/format'
import LogoLight from '../../assets/images/image_default_light.svg'
import LogoDark from '../../assets/images/image_default_dark.svg'
import useStyles from './styles'
import connectableChains from '../../misc/connectableChains'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface StartProps {
  onConnectClick(): void
  connections: ChainConnection[]
}

const Start: React.FC<StartProps> = ({ onConnectClick, connections }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { theme } = useGeneralContext()
  const themeStyle = useTheme()

  return (
    <DialogContent className={classes.dialogContent}>
      {connections.length ? (
        <Table style={{ position: 'relative' }}>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>{t('chain account')}</TableCell>
              <TableCell className={classes.tableCell}>{t('creation time')}</TableCell>
              <TableCell className={classes.tableCell}>{t('manage')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {connections.map(({ creationTime, externalAddress, chainName }, i) => (
              <TableRow key={externalAddress} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  <Box display="flex">
                    <Avatar
                      src={connectableChains[chainName].image}
                      alt={connectableChains[chainName].name}
                    />
                    <Box>
                      <Typography>{connectableChains[chainName].name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {externalAddress}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {format(creationTime, 'dd MMM yyyy, HH:mm:ss')}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Button>{t('disconnect')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mt={2} mb={6}>
          {theme === 'dark' ? (
            <LogoDark width={themeStyle.spacing(30)} />
          ) : (
            <LogoLight width={themeStyle.spacing(30)} />
          )}
          <Box mt={3} mb={2}>
            <Typography>{t('connect chain description')}</Typography>
          </Box>

          <Button onClick={onConnectClick} variant="contained" color="primary">
            {t('connect chain')}
          </Button>
        </Box>
      )}
    </DialogContent>
  )
}

export default Start
