import React, { useState } from 'react'
import { ValidatorInfo } from './index'

export type Columns = {
  label: string
  display: string | React.ReactNode
  align?: string
  sort?: boolean
}

export interface TableDefaultProps {
  className?: string
  columns: Columns[]
  data: ValidatorInfo[]
  pagination?: {
    rowsPerPage: number | undefined
  }
}

export interface useTableDefaultHookProps {
  rowsPerPageCount?: number
  onRowClick?: (data: ValidatorInfo) => void
  initialActiveSort?: string
  initialSortDirection?: 'asc' | 'desc'
  data: ValidatorInfo[]
}

export const useTableDefaultHook = (options: useTableDefaultHookProps) => {
  const { rowsPerPageCount = 10, initialActiveSort, initialSortDirection, data } = options
  const [state, setState] = useState<any>({
    data,
    page: 0,
    rowsPerPage: rowsPerPageCount,
    activeSort: initialActiveSort,
    sortDirection: initialSortDirection,
  })

  const handleChangePage = React.useCallback(
    (newPage: number) => {
      setState({
        ...state,
        page: newPage,
      })
    },
    [state, setState]
  )

  const handleChangeRowsPerPage = React.useCallback(
    (event: number) => {
      setState({
        ...state,
        page: 0,
        rowsPerPage: event || 10,
      })
    },
    [state, setState]
  )

  const handleSort = React.useCallback(
    (key: string) => () => {
      const { sortDirection, activeSort: currentActiveSort, data: currentData } = state
      const newSortDirection = currentActiveSort === key && sortDirection === 'asc' ? 'desc' : 'asc'
      const sortedData = currentData.sort((a: any, b: any) => {
        let compareA = a[key]
        let compareB = b[key]

        if (compareA && typeof compareA === 'string') {
          compareA = compareA?.toLowerCase() ?? ''
          compareB = compareB?.toLowerCase() ?? ''
        } else if (compareA && typeof compareA === 'object') {
          compareA = compareA?.rawValue ?? null
          compareB = compareB?.rawValue ?? null
        }
        if (newSortDirection === 'desc') {
          return compareA > compareB ? -1 : 1
        }
        return compareA > compareB ? 1 : -1
      })
      setState({
        ...state,
        sortDirection: newSortDirection,
        activeSort: key,
        data: sortedData,
      })
    },
    [state, setState]
  )

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    state,
    handleSort,
  }
}

export const useInfoPopoverHook = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return {
    handlePopoverOpen,
    handlePopoverClose,
    anchorEl,
    open,
  }
}
