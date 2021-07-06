import React from 'react'
import { Popover, Paper } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { useInfoPopoverHook } from './hooks'
import { useGetStyles } from './styles'

export interface InfoPopoverProps {
  detail: string
  className?: string
}

const InfoPopover = (props: InfoPopoverProps) => {
  const { detail } = props

  const { handlePopoverOpen, handlePopoverClose, anchorEl, open } = useInfoPopoverHook()
  const { classes } = useGetStyles()

  return (
    <span
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      className={classes.helpOutLintContainer}
    >
      <HelpOutline fontSize="small" className={classes.helpOutLine} />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Paper className={classes.popoverContainer} elevation={0}>
          {detail}
        </Paper>
      </Popover>
    </span>
  )
}

export default InfoPopover
