import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import React from 'react'
import times from 'lodash/times'
import useTranslation from 'next-translate/useTranslation'
import ToFirstPageIcon from '../../assets/images/icons/double_arrow_left.svg'
import ToLastPageIcon from '../../assets/images/icons/double_arrow_right.svg'
import PrevIcon from '../../assets/images/icons/arrow_left.svg'
import NextIcon from '../../assets/images/icons/arrow_right.svg'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'

const PAGE_BUTTONS_COUNT = 5
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100]

interface TablePaginationProps {
  page: number
  rowsCount: number
  rowsPerPage: number
  onPageChange(page: number): void
  onRowsPerPageChange(rowsPerPage: number): void
  className?: string
  hideFooter?: boolean
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  rowsCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  className,
  hideFooter,
}) => {
  const iconProps = useIconProps()
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [rowsPerPageButtonAnchor, setRowsPerPageButtonAnchor] = React.useState<Element>()

  const lastPage = Math.ceil(rowsCount / rowsPerPage) - 1
  const numPagesToDisplay = Math.min(PAGE_BUTTONS_COUNT, lastPage + 1)
  const startFrom = Math.min(
    Math.max(page - (numPagesToDisplay - 1) / 2, 0),
    lastPage - numPagesToDisplay + 1
  )

  return (
    <Box mt={3} display="flex" justifyContent="flex-end" alignItems="center" className={className}>
      <Button
        onClick={() => onPageChange(0)}
        disabled={page <= 0}
        className={classes.lightGreyButton}
        variant="contained"
      >
        <ToFirstPageIcon {...iconProps} />
      </Button>
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 0}
        className={classes.lightGreyButton}
        variant="contained"
      >
        <PrevIcon {...iconProps} />
      </Button>
      {times(numPagesToDisplay).map((i) => (
        <Button
          variant={page === startFrom + i ? 'contained' : 'text'}
          color={page === startFrom + i ? 'primary' : 'default'}
          className={classes.pageButton}
          key={i}
          onClick={() => onPageChange(startFrom + i)}
        >
          {startFrom + i + 1}
        </Button>
      ))}
      <Button
        disabled={page >= lastPage}
        onClick={() => onPageChange(page + 1)}
        className={classes.lightGreyButton}
        variant="contained"
      >
        <NextIcon {...iconProps} />
      </Button>
      <Button
        disabled={page >= lastPage}
        onClick={() => onPageChange(lastPage)}
        className={classes.lightGreyButton}
        variant="contained"
      >
        <ToLastPageIcon {...iconProps} />
      </Button>
      <Button
        variant="contained"
        className={classes.selectButton}
        endIcon={<DropDownIcon {...iconProps} />}
        onClick={(e) => setRowsPerPageButtonAnchor(e.currentTarget)}
      >
        {rowsPerPage}
      </Button>
      <Typography
        style={{
          display: hideFooter ? 'none' : 'inherit',
        }}
      >
        {t('table footer', {
          range: `${page * rowsPerPage + 1} - ${Math.min((page + 1) * rowsPerPage, rowsCount)}`,
          total: rowsCount,
        })}
      </Typography>
      <Menu
        anchorEl={rowsPerPageButtonAnchor}
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
        open={!!rowsPerPageButtonAnchor}
        onClose={() => setRowsPerPageButtonAnchor(undefined)}
      >
        {ROWS_PER_PAGE_OPTIONS.map((o) => (
          <MenuItem
            button
            key={o}
            onClick={() => {
              onRowsPerPageChange(o)
              setRowsPerPageButtonAnchor(undefined)
            }}
          >
            {o}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default TablePagination
