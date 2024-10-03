import { axiosClient } from '@/api/client'
import { Response } from '@/types/response'
import { UserType } from '@/constants/user_types'
import { TeacherEntity } from '../../domain/entity'
import { TeacherRepository } from '../../domain/repository'

type ListClassesResponse = {
  code: number
  message: string
  data: {
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
  }[]
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

export class AxiosRepository implements TeacherRepository {
  async listTeachers(page: number, limit: number): Promise<Response<TeacherEntity[]>> {
    const response = await axiosClient.get('/teachers', {
      params: {
        page,
        limit
      }
    })
    const body: ListClassesResponse = response.data

    const data: Response<TeacherEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(teacherObtained => {
        const newTeacher: TeacherEntity = {
          id: teacherObtained.id,
          profile: teacherObtained.profile,
          user: {
            id: teacherObtained.user.id,
            name: teacherObtained.user.name,
            lastName1: teacherObtained.user.last_name_1,
            lastName2: teacherObtained.user.last_name_2,
            email: teacherObtained.user.email,
            password: teacherObtained.user.password,
            userType: UserType.TEACHER
          }
        }

        return newTeacher
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
}