import { axiosClient } from '@/api/client'
import { Response } from '@/types/response'
import { EnrollmentEntity } from '@/modules/enrollment/domain/entity'
import { EnrollmentRepository } from '@/modules/enrollment/domain/repository'
import { Meta } from '@/types/meta'
import { UserType } from '@/constants/user_types'

type ListEnrollmentsResponse = {
  code: number
  message: string
  data: {
    id: string
    can_be_certified: boolean
    paid_at: Date
    class: {
      id: string
      name: string
      description: string
      teacher: {
        id: string
        profile: string
        user: {
          id: string
          name: string
          last_name_1: string
          last_name_2: string
          email: string
        }
      }
      dates: {
        id: string
        day: Date
        start_time: Date
        end_time: Date
      }[]
    }
  }[]
  meta: Meta
}

export class AxiosRepository implements EnrollmentRepository {
  async listEnrollments(page: number, limit: number): Promise<Response<EnrollmentEntity[]>> {
    const response = await axiosClient.get('/enrollments', {
      params: {
        page,
        limit
      }
    })
    const body: ListEnrollmentsResponse = response.data

    const data: Response<EnrollmentEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(enrollment => {
        const newEnrollment: EnrollmentEntity = {
          id: enrollment.id,
          canBeCertified: enrollment.can_be_certified,
          paidAt: enrollment.paid_at,
          class: {
            id: enrollment.class.id,
            name: enrollment.class.name,
            description: enrollment.class.description,
            teacher: {
              id: enrollment.class.teacher.id,
              profile: enrollment.class.teacher.profile,
              user: {
                id: enrollment.class.teacher.user.id,
                name: enrollment.class.teacher.user.name,
                lastName1: enrollment.class.teacher.user.last_name_1,
                lastName2: enrollment.class.teacher.user.last_name_2,
                email: enrollment.class.teacher.user.email,
                userType: UserType.TEACHER
              }
            },
            dates: enrollment.class.dates.map(date => ({
              id: date.id,
              day: date.day,
              startTime: date.start_time,
              endTime: date.end_time
            }))
          }
        }

        return newEnrollment
      }),
      meta: body.meta
    }

    return data
  }
}