import { Meta } from '@/types/meta'

import { useState } from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  meta: Meta
  getData: (page: number, limit: number) => Promise<void>
}

function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  getData
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: meta.page - 1,
    pageSize: meta.perPage
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    pageCount: meta.pageCount,
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })

  return (
    <>
      <div className='back-secondary rounded-md border'>
        <Table>
  
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
  
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='font-bold'>
                      {header.isPlaceholder ? undefined :
                        flexRender(header.column.columnDef.header, header.getContext())
                      }
                    </TableHead>
                  )
                })}
  
              </TableRow>
            ))}
          </TableHeader>
  
          <TableBody>
            {table.getRowModel().rows?.length ? table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                className={`${row.getIsSelected() ? 'text' : ''}`}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
  
        </Table>
      </div>
      <div className='flex items-center justify-between'>
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {' '}
          {table.getFilteredRowModel().rows.length} filas seleccionadas
        </div>
        <div className='flex items-center justify-end space-x-2 pt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={async () => {
              await getData(meta.page - 1, meta.perPage)
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={async () => {
              await getData(meta.page + 1, meta.perPage)
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <p className='flex items-center justify-start text-sm text-muted-foreground pb-6 sm:pb-10'>
        Página {meta.page} de {meta.pageCount}
      </p>
    </>
  )
}

export { DataTable }