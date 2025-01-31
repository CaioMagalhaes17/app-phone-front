import React from 'react'

import { DataTableProps } from 'mantine-datatable'
import { MantineDataTable } from './mantine-datatable'

type BasicTableInterface<DataTableType> = {
  title?: string
  children?: React.ReactNode
  query?: string
  handleOnChangeQuery?: (value: string) => void
  needSearch?: boolean
  step?:
  | 'TOUR_PERIOD'
  | 'TOUR_SIDEBAR'
  | 'TOUR_ACCESS_CONTROL'
  | 'TOUR_REQUEST_TRANSFER'
  | 'TOUR_TRANSFER_LIST'
  | 'TOUR_USER_LIST_TRANSFER'
} & DataTableProps<DataTableType>
export function BasicTable<T = unknown>({
  title,
  children,
  handleOnChangeQuery = () => { },
  query = '',
  step,
  needSearch,
  ...rest
}: BasicTableInterface<T>) {
  return (
    <div className="panel">
      <h5 className="flex flex-row gap-5 font-semibold text-lg dark:text-white-light mb-5">
        <span className="text-3xl font-extrabold text-white" id="title">{title}</span>
      </h5>
      <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
        <div className="flex items-center flex-wrap">{children}</div>
        {needSearch ||
          (step &&
            !step?.includes('TOUR_PERIOD') &&
            !step?.includes('TOUR_USER_LIST_TRANSFER')) ? (
          <input
            id="search2"
            type="text"
            className="form-input w-auto"
            placeholder="Procurar..."
            value={query}
            onChange={(event) => handleOnChangeQuery(event.target.value)}
          ></input>
        ) : (
          <></>
        )}
      </div>
      <MantineDataTable {...rest} />
    </div>
  )
}

