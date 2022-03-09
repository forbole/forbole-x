import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { formatPercentage, formatCrypto } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface DiagramProps {
  crypto: Cryptocurrency
  value: number
  title: string
  color: string
  percentage: number
}

const Diagram: React.FC<DiagramProps> = ({ value, title, color, crypto, percentage }) => {
  const { classes } = useGetStyles(color)
  const { t, lang } = useTranslation('common')
  const { hideAmount } = useGeneralContext()

  return (
    <Box m={1} position="relative">
      <Box className={classes.label}>
        <Typography variant="subtitle2" className={classes.title}>
          {`${t(title)} (${formatPercentage(percentage, lang)})`}
        </Typography>
        <Typography variant="subtitle2" className={classes.amount}>
          {formatCrypto(value, { unit: crypto.name, lang, hideAmount })}
        </Typography>
      </Box>
    </Box>
  )
}

export default Diagram
