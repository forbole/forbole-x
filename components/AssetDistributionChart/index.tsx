/* eslint-disable no-await-in-loop */
import { Box, Card, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import SectoredByButton from './SectoredByButton'
import { SectoredBy, sectoredByTypes } from './types'
import Chart from './Chart'
import EmptyState from './EmptyState'
import fetchAccountBalance from '../../graphql/fetch/fetchAccountBalance'
import { sumTokenAmounts } from '../../misc/utils'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import AssetPopover from './AssetPopover'

const AssetDistributionChart: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const [sectoredBy, setSectoredBy] = React.useState<SectoredBy>(sectoredByTypes[0])
  const [data, setData] = React.useState([])
  const [popoverIndex, setPopoverIndex] = React.useState<number | undefined>()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const fetchData = React.useCallback(async () => {
    try {
      if (sectoredBy === 'by assets') {
        let balances: TokenAmount = {}
        for (let i = 0; i < accounts.length; i += 1) {
          const balance = await fetchAccountBalance(accounts[i].address, accounts[i].crypto)
          balances = sumTokenAmounts([balances, balance])
        }
        const rawData = []
        Object.keys(balances).forEach((denom) => {
          rawData.push({
            name: denom.toUpperCase(),
            value: balances[denom].amount * balances[denom].price,
          })
        })
        const total = rawData.map((d) => d.value).reduce((a, b) => a + b, 0)
        setData(
          rawData.map((d) => ({
            name: d.name,
            image: cryptocurrencies[d.name].image,
            value: d.value === total ? 100 : Math.round((100 * d.value) / total),
          }))
        )
      }
    } catch (err) {
      console.log(err)
    }
  }, [sectoredBy, accounts])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Card className={classes.container}>
      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Typography variant="h1">{t('asset distribution')}</Typography>
        <SectoredByButton sectoredBy={sectoredBy} onChange={setSectoredBy} />
      </Box>
      {data.length > 0 ? (
        <Chart data={data} setAnchorEl={setAnchorEl} setPopoverIndex={setPopoverIndex} />
      ) : (
        <EmptyState />
      )}
      {/* <AssetPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        accountBalance={}
      /> */}
    </Card>
  )
}

export default AssetDistributionChart
