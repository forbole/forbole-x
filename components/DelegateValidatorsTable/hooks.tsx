import React, { useState } from 'react'
// import { useTableDefaultHookProps, Data } from './types'

export type Columns = {
  label: string
  display: string | React.ReactNode
  align?: string
  sort?: boolean
}

// export type Data = {
//   [key: string]: {
//     className?: string
//     rawValue: string | number
//     display: string | React.ReactNode | number
//   }
// }

interface ValidatorInfo extends Validator {
  location: {
    name: string
    image: string
  }
  selfRatio: number
  status: string
  isActive: boolean
}

export interface TableDefaultProps {
  className?: string
  columns: Columns[]
  data: ValidatorInfo[]
  // onRowClick?: (data: Data) => void
  // initialActiveSort?: string
  pagination?: {
    rowsPerPage: number | undefined
  }
}

export interface useTableDefaultHookProps {
  rowsPerPageCount?: number
  onRowClick?: (data: ValidatorInfo) => void
  initialActiveSort?: string
  // data: Data[]
  data: ValidatorInfo[]
}

export const useTableDefaultHook = (options: useTableDefaultHookProps) => {
  const { rowsPerPageCount = 10, onRowClick, initialActiveSort, data } = options
  const [state, setState] = useState<any>({
    data,
    page: 0,
    rowsPerPage: rowsPerPageCount,
    activeSort: initialActiveSort,
    sortDirection: 'asc',
  })
  console.log('data')

  // const handleChangePage = (
  //   _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  //   newPage: number
  // ) => {
  //   setState({
  //     ...state,
  //     page: newPage,
  //   })
  // }

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setState({
  //     ...state,
  //     page: 0,
  //     rowsPerPage: parseInt(event?.target?.value ?? 0, 10),
  //   })
  // }

  const handleRowClick = (selectedData: ValidatorInfo) => {
    console.log('click', selectedData)
    console.log('onRowClick', onRowClick)

    if (onRowClick) {
      console.log('click', selectedData)
      onRowClick(selectedData)
    }
  }

  const handleSort = (key: string) => () => {
    console.log('key', key)
    const { sortDirection, activeSort: currentActiveSort, data: currentData } = state
    console.log('currentData', currentData)
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
    console.log('sortedData', sortedData)
    setState({
      ...state,
      sortDirection: newSortDirection,
      activeSort: key,
      data: sortedData,
    })
  }

  return {
    // handleChangePage,
    // handleChangeRowsPerPage,
    state,
    handleSort,
    handleRowClick,
  }
}
