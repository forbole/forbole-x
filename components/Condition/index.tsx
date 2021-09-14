import React from 'react'
import { useStyles } from './styles'

const Condition: React.FC<{
  className?: string
}> = ({ className }) => {
  const classes = useStyles()

  return <div className={`${className} ${classes.root}`} />
}

export default Condition
