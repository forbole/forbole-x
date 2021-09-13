import { Box, Card, Tabs, Tab, Typography, Link } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import SuccessIcon from '../../assets/images/icons/icon_status_success.svg'
import FailIcon from '../../assets/images/icons/icon_status_reject.svg'
import TablePagination from '../TablePagination'
import { useGetStyles } from './styles'
import Row from './Row'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

interface ActivitiesTableProps {
  address?: FavAddress
  activities: Activity[]
  account?: Account
  crypto: Cryptocurrency
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
  activities,
  crypto,
  account,
  address,
}) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  const { theme } = useGeneralContext()

  const tabs = [
    { label: 'all', rows: activities },
    { label: 'transfer', rows: activities.filter((x) => x.tab === 'transfer') },
    { label: 'staking', rows: activities.filter((x) => x.tab === 'staking') },
    { label: 'distribution', rows: activities.filter((x) => x.tab === 'distribution') },
    { label: 'governance', rows: activities.filter((x) => x.tab === 'governance') },
    { label: 'slashing', rows: activities.filter((x) => x.tab === 'slashing') },
  ]

  return (
    <Card>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{
            indicator: classes.tabIndicator,
          }}
          onChange={(e, v) => setCurrentTab(v)}
          textColor={theme === 'light' ? 'primary' : 'inherit'}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.rows.length})`} />
          ))}
        </Tabs>
        <Box className={classes.table} mt={2}>
          {tabs[currentTab].rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((a, i) => (
            <Box key={`${a.ref}-${i}`}>
              <Box
                className={classes.rowHeader}
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems={isMobile ? 'flex-start' : 'center'}
              >
                <Link
                  href={`${crypto.blockExplorerBaseUrl}/transactions/${a.ref.replace('#', '')}`}
                  color="textSecondary"
                  variant="body2"
                  className={classes.wrapText}
                  target="_blank"
                >
                  {a.ref}
                </Link>

                <Typography>
                  {a.date}
                  {a.success ? (
                    <SuccessIcon className={classes.checkIcon} {...iconProps} />
                  ) : (
                    <FailIcon className={classes.checkIcon} {...iconProps} />
                  )}
                </Typography>
              </Box>
              <Box className={classes.row}>
                <Row activity={a} account={account} crypto={crypto} address={address} />
              </Box>
            </Box>
          ))}
        </Box>
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          rowsCount={tabs[currentTab].rows.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Card>
  )
}

export default ActivitiesTable
