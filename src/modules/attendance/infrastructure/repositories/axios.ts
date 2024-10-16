import { axiosClient } from '@/api/client'
import { Response } from '@/types/response'
import { UserType } from '@/constants/user_types'
import { AttendanceRepository } from '@/modules/attendance/domain/repository'
import { AttendanceEntity } from '@/modules/attendance/domain/entity'

type ListAttendancesResponse = {
  code: number
  message: string
  data: {
    id: string
    attendance: boolean
    enrollment: {
      id: string
      can_be_certified: boolean
      paid_at: null | string
      student: {
        id: string
        registration_number: string
        paid_advice: boolean
        user: {
          id: string
          name: string
          last_name_1: string
          last_name_2: string
          email: string
        },
        ut: {
          id: string
          key: string
        },
        career: {
          id: string
          key: string
        }
      }
    }
  }[]
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

type UpdateAttendancesResponse = {
  code: number
  message: string
  data: string
  meta: undefined | null
}

export class AxiosRepository implements AttendanceRepository {
  async listAttendances(classId: string, page: number, limit: number): Promise<Response<AttendanceEntity[]>> {
    const response = await axiosClient.get(`/attendances/${classId}`, {
      params: {
        page,
        limit
      }
    })
    const body: ListAttendancesResponse = response.data

    const data: Response<AttendanceEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(attendance => {
        const newAttendance: AttendanceEntity = {
          id: attendance.id,
          attendance: attendance.attendance,
          student: {
            id: attendance.enrollment.student.id,
            registrationNumber: attendance.enrollment.student.registration_number,
            user: {
              id: attendance.enrollment.student.user.id,
              name: attendance.enrollment.student.user.name,
              lastName1: attendance.enrollment.student.user.last_name_1,
              lastName2: attendance.enrollment.student.user.last_name_2,
              email: attendance.enrollment.student.user.email,
              userType: UserType.STUDENT
            },
            ut: {
              id: attendance.enrollment.student.ut.id,
              key: attendance.enrollment.student.ut.key
            },
            career: {
              id: attendance.enrollment.student.career.id,
              key: attendance.enrollment.student.career.key
            },
            alreadySuscribedToClasses: true
          }
        }

        return newAttendance
      }),
      meta: {
        page: body.meta.page,
        perPage: body.meta.per_page,
        pageCount: body.meta.page_count,
        totalCount: body.meta.total_count
      }
    }

    return data
  }

  async updateAttendances(attendanceIds: string[], attendance: boolean): Promise<Response<string>> {
    const response = await axiosClient.patch('/attendances', {
      attendance_ids: attendanceIds,
      attendance
    })
    const body: UpdateAttendancesResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }
}