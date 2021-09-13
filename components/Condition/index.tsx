import React from 'react'
import { useGetStyles } from './styles'

const Condition: React.FC<{
  className?: string
}> = ({ className }) => {
  const { classes } = useGetStyles()

  return <div className={`${className} ${classes.root}`} />
}

export default Condition
