import React, { useState } from 'react'

export type Columns = {
  label: string
  display: string | React.ReactNode
  align?: string
  sort?: boolean
}

export interface TableDefaultProps {
  className?: string
  columns: Columns[]
  data: Validator[]
  pagination?: {
    rowsPerPage: number | undefined
  }
}

export interface useTableDefaultHookProps {
  rowsPerPageCount?: number
  onRowClick?: (data: Validator) => void
  initialActiveSort?: string
  initialSortDirection?: 'asc' | 'desc'
  data: Validator[]
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
    (key?: string, newData?: any) => () => {
      setState((currentState) => {
        const { sortDirection, activeSort: currentActiveSort, data: currentData } = currentState
        // eslint-disable-next-line no-nested-ternary
        const newSortDirection = key
          ? currentActiveSort === key && sortDirection === 'asc'
            ? 'desc'
            : 'asc'
          : sortDirection
        const sortedData = (newData || currentData).sort((a: any, b: any) => {
          let compareA = a[key || currentActiveSort]
          let compareB = b[key || currentActiveSort]

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
        return {
          ...currentState,
          sortDirection: newSortDirection,
          activeSort: key || currentActiveSort,
          data: sortedData,
        }
      })
    },
    [setState]
  )

  React.useEffect(() => {
    handleSort(undefined, data)()
  }, [data])

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
