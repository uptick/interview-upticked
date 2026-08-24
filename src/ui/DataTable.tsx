import type { ReactNode } from 'react'

type Column<TRow> = {
  key: string
  header: string
  render: (row: TRow) => ReactNode
}

type DataTableProps<TRow> = {
  caption: string
  columns: readonly Column<TRow>[]
  rows: readonly TRow[]
  getRowKey: (row: TRow) => string
}

const DataTable = <TRow,>({ caption, columns, rows, getRowKey }: DataTableProps<TRow>) => (
  <table className="tw:w-full tw:border-collapse tw:text-left tw:text-sm">
    <caption className="tw:sr-only">{caption}</caption>
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className="tw:border-b tw:border-slate-200 tw:pb-2 tw:pr-4 tw:font-medium tw:text-slate-500"
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={getRowKey(row)} className="tw:border-b tw:border-slate-100 tw:last:border-0">
          {columns.map((column) => (
            <td key={column.key} className="tw:py-2 tw:pr-4 tw:align-top tw:text-slate-800">
              {column.render(row)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export { DataTable }
export type { Column, DataTableProps }
