import { Box, Card, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import SectoredByButton from './SectoredByButton'
import { SectoredBy, sectoredByTypes } from './types'
import Chart from './chart'
import EmptyState from './emptyState'

const AssetDistributionChart: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [sectoredBy, setSectoredBy] = React.useState<SectoredBy>(sectoredByTypes[0])
  // TODO: fetch data from backend
  const rawData = [
    {
      name: 'Forbole',
      value: 35,
    },
    {
      name: 'Binance Staking',
      value: 18,
    },
    {
      name: 'DokiaCapital',
      value: 12,
    },
    {
      name: '🐠stake.fish',
      value: 10,
    },
    {
      name: 'CCN',
      value: 10,
    },
    {
      name: 'Sikka',
      value: 8,
    },
    {
      name: 'Zero Knowledge Validator (ZKV)',
      value: 7,
    },
  ]
  return (
    <Card className={classes.container}>
      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Typography variant="h1">{t('asset distribution')}</Typography>
        <SectoredByButton sectoredBy={sectoredBy} onChange={setSectoredBy} />
      </Box>
      {rawData.length > 0 ? <Chart rawData={rawData} /> : <EmptyState />}
    </Card>
  )
}

export default AssetDistributionChart
