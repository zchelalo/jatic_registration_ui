import { TeacherEntity } from '@/modules/teacher/domain/entity'

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

type UseTeacherColumnsProps = {
  setOpenEditModal: (value: boolean) => void
  setOpenDeleteModal: (value: boolean) => void
  setSelectedTeacher: (teacher: TeacherEntity) => void
}

function useTeacherColumns({
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedTeacher
}: UseTeacherColumnsProps) {
  const teacherColumns: ColumnDef<TeacherEntity>[] = [
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
      accessorKey: 'profile',
      header: 'Perfil'
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
      id: 'actions',
      cell: ({ row }) => {
        const teacher = row.original
  
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
                onClick={() => navigator.clipboard.writeText(teacher.user.email)}
                className='cursor-pointer'
              >
                Copiar email del maestro
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedTeacher(teacher)
                  setOpenEditModal(true)
                }}
              >
                <HiOutlinePencilSquare className='text-xl mr-1' /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center cursor-pointer'
                onClick={() => {
                  setSelectedTeacher(teacher)
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
    teacherColumns
  }
}

export { useTeacherColumns }