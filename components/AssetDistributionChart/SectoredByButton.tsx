import { Button, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'
import { SectoredBy, sectoredByTypes } from './types'

interface SectoredByButtonProps {
  sectoredBy: SectoredBy
  onChange(sectoredBy: SectoredBy): void
}

const SectoredByButton: React.FC<SectoredByButtonProps> = ({ sectoredBy, onChange }) => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps(2)
  const [anchor, setAnchor] = React.useState<Element>()

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])
  const onItemClick = React.useCallback(
    (c) => {
      onChange(c)
      onClose()
    },
    [onChange, onClose]
  )

  return (
    <>
      <Button onClick={(e) => setAnchor(e.currentTarget)} endIcon={<DropDownIcon {...iconProps} />}>
        {t(sectoredBy)}
      </Button>
      <Menu
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={!!anchor}
        onClose={onClose}
      >
        {sectoredByTypes.map((s) => (
          <MenuItem selected={s === sectoredBy} key={s} onClick={() => onItemClick(s)}>
            {t(s)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default React.memo(SectoredByButton)
