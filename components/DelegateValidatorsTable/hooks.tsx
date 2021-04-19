import React, { useState } from 'react'
import { ValidatorInfo } from './index'
import { useGeneralContext } from '../../contexts/GeneralContext'

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
  data: ValidatorInfo[]
}

export interface useValidatorTableHookProps {
  data?: ValidatorInfo[]
  toggledValidator?: boolean
}

export const useTableDefaultHook = (options: useTableDefaultHookProps) => {
  const { rowsPerPageCount = 10, initialActiveSort, data } = options
  const [state, setState] = useState<any>({
    data,
    page: 0,
    rowsPerPage: rowsPerPageCount,
    activeSort: initialActiveSort,
    sortDirection: 'asc',
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

export const useValidatorTableHook = (props: useValidatorTableHookProps) => {
  const { favValidators } = useGeneralContext()
  const { data } = props

  data.forEach((x: ValidatorInfo, i) => {
    if (favValidators.findIndex((address) => address === x.address) !== -1) {
      data[i].fav = true
    } else {
      data[i].fav = false
    }
  })

  const mappedFavData: any = []
  data.forEach((x: ValidatorInfo) => {
    if (x.fav) {
      mappedFavData.push(x)
    }
  })

  const mappedData: any = []
  data.forEach((x: ValidatorInfo) => {
    const type = x.isActive ? 'active' : 'nonActive'
    if (mappedData[type]) {
      mappedData[type].push(x)
    } else {
      mappedData[type] = [x]
    }
  })
  return { mappedData, mappedFavData }
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
