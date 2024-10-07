import { axiosClient } from '@/api/client'
import { ClassRepository } from '@/modules/class/domain/repository'
import { Response } from '@/types/response'
import { ClassEntity } from '@/modules/class/domain/entity'
import { UserType } from '@/constants/user_types'
import { DateType } from '@/types/date'

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
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

type ListAllClassesResponse = {
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
    }
  }[]
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

type CreateClassResponse = {
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
    }
  }
  meta: undefined | null
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
      meta: {
        page: body.meta.page,
        perPage: body.meta.per_page,
        totalCount: body.meta.total_count,
        pageCount: body.meta.page_count
      }
    }

    return data
  }

  async listAllClasses(page: number, limit: number): Promise<Response<ClassEntity[]>> {
    const response = await axiosClient.get('/classes', {
      params: {
        page,
        limit
      }
    })
    const body: ListAllClassesResponse = response.data

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
          dates: []
        }

        return newClass
      }),
      meta: {
        page: body.meta.page,
        perPage: body.meta.per_page,
        totalCount: body.meta.total_count,
        pageCount: body.meta.page_count
      }
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

  async createClass(name: string, description: string, teacherId: string, dates: DateType[]): Promise<Response<ClassEntity>> {
    const response = await axiosClient.post('/classes', {
      name,
      description,
      teacher_id: teacherId,
      dates: dates.map(date => ({
        day: date.day,
        start_time: date.startTime,
        end_time: date.endTime
      }))
    })
    const body: CreateClassResponse = response.data

    const data: Response<ClassEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        name: body.data.name,
        description: body.data.description,
        teacher: {
          id: body.data.teacher.id,
          profile: body.data.teacher.profile,
          user: {
            id: body.data.teacher.user.id,
            name: body.data.teacher.user.name,
            lastName1: body.data.teacher.user.last_name_1,
            lastName2: body.data.teacher.user.last_name_2,
            email: body.data.teacher.user.email,
            password: body.data.teacher.user.password,
            userType: UserType.TEACHER
          }
        },
        dates: []
      }
    }

    return data
  }

  async updateClass(classId: string, name: string, description: string, teacherId: string): Promise<Response<string>> {
    const response = await axiosClient.patch(`/classes/${classId}`, {
      name,
      description,
      teacher_id: teacherId
    })
    const body: Response<string> = response.data

    return body
  }

  async deleteClass(classId: string): Promise<Response<string>> {
    const response = await axiosClient.delete(`/classes/${classId}`)
    const body: Response<string> = response.data

    return body
  }
}