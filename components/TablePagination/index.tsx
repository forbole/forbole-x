import { Box, Button } from '@material-ui/core'
import React from 'react'
import times from 'lodash/times'
import ToFirstPageIcon from '../../assets/images/icons/double_arrow_left.svg'
import ToLastPageIcon from '../../assets/images/icons/double_arrow_right.svg'
import PrevIcon from '../../assets/images/icons/arrow_left.svg'
import NextIcon from '../../assets/images/icons/arrow_right.svg'
import useIconProps from '../../misc/useIconProps'
import useStyles from './styles'

const PAGE_BUTTONS_COUNT = 5

interface TablePaginationProps {
  page: number
  rowsCount: number
  rowsPerPage: number
  onPageChange(page: number): void
  onRowsPerPageChange(rowsPerPage: number): void
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  rowsCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const iconProps = useIconProps()
  const classes = useStyles()

  const lastPage = Math.ceil(rowsCount / rowsPerPage) - 1
  const numPagesToDisplay = Math.min(PAGE_BUTTONS_COUNT, lastPage + 1)
  const startFrom = Math.min(
    Math.max(page - (numPagesToDisplay - 1) / 2, 0),
    lastPage - numPagesToDisplay + 1
  )

  return (
    <Box mt={3} display="flex" justifyContent="flex-end" alignItems="center">
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
    </Box>
  )
}

export default TablePagination
