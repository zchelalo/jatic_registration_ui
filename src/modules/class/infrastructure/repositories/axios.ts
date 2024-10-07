import { axiosClient } from '@/api/client'
import { ClassRepository } from '@/modules/class/domain/repository'
import { Response } from '@/types/response'
import { ClassEntity } from '@/modules/class/domain/entity'
import { Meta } from '@/types/meta'
import { UserType } from '@/constants/user_types'

type ListClassesResponse = {
  code: number
  message: string
  data: {
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
        password: string
        user_type: string
      }
    },
    dates: {
      id: string
      day: Date
      start_time: Date
      end_time: Date
    }[]
  }[]
  meta: Meta
}

export class AxiosRepository implements ClassRepository {
  async listClasses(page: number, limit: number): Promise<Response<ClassEntity[]>> {
    const response = await axiosClient.get('/classes-available', {
      params: {
        page,
        limit
      }
    })
    const body: ListClassesResponse = response.data

    const data: Response<ClassEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(classObtained => {
        const newClass: ClassEntity = {
          id: classObtained.id,
          name: classObtained.name,
          description: classObtained.description,
          teacher: {
            id: classObtained.teacher.id,
            profile: classObtained.teacher.profile,
            user: {
              id: classObtained.teacher.user.id,
              name: classObtained.teacher.user.name,
              lastName1: classObtained.teacher.user.last_name_1,
              lastName2: classObtained.teacher.user.last_name_2,
              email: classObtained.teacher.user.email,
              password: classObtained.teacher.user.password,
              userType: UserType.TEACHER
            }
          },
          dates: classObtained.dates.map(date => (
            {
              id: date.id,
              day: date.day,
              startTime: date.start_time,
              endTime: date.end_time
            }
          ))
        }

        return newClass
      }),
      meta: body.meta
    }

    return data
  }

  async suscribeClass(classIds: string[]): Promise<Response<string>> {
    const response = await axiosClient.post('/enrollments', {
      class_date_ids: classIds
    })
    const body: Response<string> = response.data

    return body
  }
}