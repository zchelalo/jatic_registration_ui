import { ClassEntity } from '@/modules/class/domain/entity'

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

type UseClassColumnsProps = {
  setOpenEditModal: (value: boolean) => void
  setOpenDeleteModal: (value: boolean) => void
  setOpenDatesModal: (value: boolean) => void
  setSelectedClass: (selectedClass: ClassEntity) => void
}

function useClassColumns({
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenDatesModal,
  setSelectedClass
}: UseClassColumnsProps) {
  const classColumns: ColumnDef<ClassEntity>[] = [
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
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      accessorKey: 'description',
      header: 'Descripción'
    },
    {
      accessorKey: 'teacher',
      header: 'Profesor',
      cell: ({ row }) => {
        const classRow = row.original
        return `${classRow.teacher.user.name} ${classRow.teacher.user.lastName1}${classRow.teacher.user.lastName2 ? ` ${classRow.teacher.user.lastName2}` : ''}`
      }
    },
    {
      accessorKey: 'dates',
      header: 'Fechas',
      cell: ({ row }) => {
        const classRow = row.original
        return (
          <Button
            type='button'
            variant='ghost'
            className='btn-quaternary'
            onClick={() => {
              setOpenDatesModal(true)
              setSelectedClass(classRow)
            }}
          >
            Ver fechas
          </Button>
        )
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const classRow = row.original
  
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
                onClick={() => navigator.clipboard.writeText(classRow.name)}
                className='cursor-pointer'
              >
                Copiar nombre
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedClass(classRow)
                  setOpenEditModal(true)
                }}
              >
                <HiOutlinePencilSquare className='text-xl mr-1' /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedClass(classRow)
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
    classColumns
  }
}

export { useClassColumns }