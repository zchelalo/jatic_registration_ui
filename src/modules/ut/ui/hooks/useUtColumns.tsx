import { UtEntity } from '@/modules/ut/domain/entity'

import {
  ColumnDef
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'

import { MoreHorizontal } from 'lucide-react'
import {
  HiOutlinePencilSquare,
  HiOutlineTrash
} from 'react-icons/hi2'

type UseUtColumnsProps = {
  setOpenEditModal: (value: boolean) => void
  setOpenDeleteModal: (value: boolean) => void
  setSelectedUt: (ut: UtEntity) => void
}

function useUtColumns({
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedUt
}: UseUtColumnsProps) {
  const utColumns: ColumnDef<UtEntity>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'key',
      header: 'Nombre'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const ut = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Acciones</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align='end'
              className='back-secondary'
            >
              <DropdownMenuLabel>
                Acciones
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(ut.key)}
                className='cursor-pointer'
              >
                Copiar nombre
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedUt(ut)
                  setOpenEditModal(true)
                }}
              >
                <HiOutlinePencilSquare className='text-xl mr-1' /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedUt(ut)
                  setOpenDeleteModal(true)
                }}
              >
                <HiOutlineTrash className='text-xl mr-1' /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return {
    utColumns
  }
}

export { useUtColumns }