import { StudentEntity } from '@/modules/student/domain/entity'

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

type UseStudentColumnsProps = {
  setOpenEditModal: (value: boolean) => void
  setOpenDeleteModal: (value: boolean) => void
  setSelectedStudent: (student: StudentEntity) => void
}

function useStudentColumns({
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedStudent
}: UseStudentColumnsProps) {
  const studentColumns: ColumnDef<StudentEntity>[] = [
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
      accessorKey: 'registrationNumber',
      header: 'Matrícula'
    },
    {
      accessorKey: 'user.name',
      header: 'Nombre'
    },
    {
      accessorKey: 'user.lastName1',
      header: 'Primer apellido'
    },
    {
      accessorKey: 'user.lastName2',
      header: 'Segundo apellido'
    },
    {
      accessorKey: 'user.email',
      header: 'Correo'
    },
    {
      accessorKey: 'ut.key',
      header: 'Universidad'
    },
    {
      accessorKey: 'career.key',
      header: 'Carrera'
    },
    {
      accessorKey: 'alreadySuscribedToClasses',
      header: 'Inscrito a talleres',
      cell: ({ getValue }) => {
        return getValue() ? (
          <span className='text-green-500'>Sí</span>
        ) : (
          <span className='text-red-500'>No</span>
        )
      }
    },
    {
      accessorKey: 'classesPaid',
      header: 'Pagó talleres',
      cell: ({ getValue }) => {
        return getValue() ? (
          <span className='text-green-500'>Sí</span>
        ) : (
          <span className='text-red-500'>No</span>
        )
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const student = row.original
  
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
                onClick={() => navigator.clipboard.writeText(student.user.email)}
                className='cursor-pointer'
              >
                Copiar email del maestro
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedStudent(student)
                  setOpenEditModal(true)
                }}
              >
                <HiOutlinePencilSquare className='text-xl mr-1' /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedStudent(student)
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
    studentColumns
  }
}

export { useStudentColumns }