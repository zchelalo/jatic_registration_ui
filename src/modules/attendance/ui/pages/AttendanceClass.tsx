import { AttendanceEntity } from '@/modules/attendance/domain/entity'
import { AxiosRepository } from '@/modules/attendance/infrastructure/repositories/axios'
import { AttendanceUseCase } from '@/modules/attendance/application/use_cases/attendance'

import { Meta } from '@/types/meta'

import { toast } from 'sonner'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAttendanceColumns } from '@/modules/attendance/ui/hooks/useAttendanceColumns'

import { DataTable } from '@/components/DataTable'

const attendanceRepository = new AxiosRepository()
const attendanceUseCase = new AttendanceUseCase(attendanceRepository)

function AttendanceClass() {
  const { classId } = useParams()
  const [attendances, setAttendances] = useState<AttendanceEntity[]>()
  const [meta, setMeta] = useState<Meta>()

  useEffect(() => {
    (async() => {
      await getAttendances(1, 100)
    })()
  }, [])

  const getAttendances = async (page: number, limit: number) => {
    if (!classId) return
    const attendancesObtained = await attendanceUseCase.listAttendances(classId, page, limit)
    setAttendances(attendancesObtained.data)
    setMeta(attendancesObtained.meta)
  }

  const updateAttendance = async (attendanceObtained: AttendanceEntity, attendanceValue: boolean) => {
    try {
      if (!attendances) return

      await attendanceUseCase.updateAttendances([attendanceObtained.id], attendanceValue)

      const attendanceIndex = attendances.findIndex(attendance => attendance.id === attendanceObtained.id)
      attendances[attendanceIndex] = {
        ...attendances[attendanceIndex],
        attendance: attendanceValue
      }
      setAttendances([...attendances])
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al actualizar la asistencia')
    }
  }

  const { attendanceColumns } = useAttendanceColumns({
    updateAttendance
  })

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Lista de asistencia
      </h1>
      {attendances && meta ? (
        <DataTable
          columns={attendanceColumns}
          data={attendances}
          meta={meta}
          getData={getAttendances}
          searchInput={false}
        />
      ) : undefined}
    </section>
  )
}

export { AttendanceClass }