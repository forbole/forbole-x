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
import ConnectIcon from '../../assets/images/icons/icon_connect.svg'
import useStyles from './styles'
import connectableChains from '../../misc/connectableChains'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import useSendTransaction from '../../misc/tx/useSendTransaction'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface StartProps {
  account: Account
  onConnectClick(): void
  onClose(): void
  connections: ChainConnection[]
}

const Start: React.FC<StartProps> = ({ onConnectClick, connections, account, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { theme } = useGeneralContext()
  const themeStyle = useTheme()
  const sendTransaction = useSendTransaction()
  const { password } = useWalletsContext()
  const iconProps = useIconProps(undefined, themeStyle.palette.primary.main)

  return (
    <DialogContent className={classes.dialogContent}>
      {connections.length ? (
        <>
          <Table className={classes.borderedTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>{t('chain account')}</TableCell>
                <TableCell className={classes.tableCell}>{t('creation time')}</TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {t('manage')}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {connections.map(({ creationTime, externalAddress, chainName }, i) => {
                const chain = connectableChains[chainName]
                return (
                  <TableRow key={chainName + externalAddress} className={classes.borderedTableRow}>
                    <TableCell className={classes.tableCell}>
                      <Box display="flex">
                        <Avatar
                          src={chain ? chain.image : undefined}
                          alt={chain ? chain.name : chainName}
                        />
                        <Box ml={1}>
                          <Typography>{chain ? chain.name : chainName}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {externalAddress}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {format(creationTime, 'dd MMM yyyy, HH:mm:ss')}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <Button
                        color="primary"
                        onClick={async () => {
                          await sendTransaction(password, account.address, {
                            msgs: [
                              {
                                typeUrl: '/desmos.profiles.v1beta1.MsgUnlinkChainAccount',
                                value: {
                                  chainName,
                                  owner: account.address,
                                  target: externalAddress,
                                },
                              },
                            ],
                            memo: '',
                          })
                          onClose()
                        }}
                      >
                        {t('disconnect')}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Box m={2} display="flex" justifyContent="flex-end">
            <Button
              startIcon={<ConnectIcon {...iconProps} />}
              onClick={onConnectClick}
              color="primary"
            >
              {t('connect chain')}
            </Button>
          </Box>
        </>
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
