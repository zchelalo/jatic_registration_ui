import { AttendanceEntity } from '@/modules/attendance/domain/entity'

import {
  ColumnDef
} from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

type UseAttendanceColumnsProps = {
  updateAttendance: (attendance: AttendanceEntity, attendanceValue: boolean) => Promise<void>
}

function useAttendanceColumns({
  updateAttendance
}: UseAttendanceColumnsProps) {
  const attendanceColumns: ColumnDef<AttendanceEntity>[] = [
    {
      accessorKey: 'student.registrationNumber',
      header: 'Matrícula'
    },
    {
      accessorKey: 'student.user.name',
      header: 'Nombre'
    },
    {
      accessorKey: 'student.user.lastName1',
      header: 'Primer apellido'
    },
    {
      accessorKey: 'student.user.lastName2',
      header: 'Segundo apellido'
    },
    {
      accessorKey: 'student.ut.key',
      header: 'Universidad'
    },
    {
      accessorKey: 'student.career.key',
      header: 'Carrera'
    },
    {
      header: 'Asistió',
      cell: ({ row }) => {
        const attendance = row.original

        return (
          <Checkbox
            checked={attendance.attendance}
            onCheckedChange={async (value) => {
              await updateAttendance(attendance, !!value)
            }}
            aria-label='Select row'
            className='border border-[var(--color-primary)]'
          />
        )
      }
    }
  ]

  return {
    attendanceColumns
  }
}

export { useAttendanceColumns }