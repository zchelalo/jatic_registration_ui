import { axiosClient } from '@/api/client'
import { Response } from '@/types/response'
import { UserType } from '@/constants/user_types'
import { TeacherEntity } from '../../domain/entity'
import { TeacherRepository } from '../../domain/repository'

type ListTeachersResponse = {
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

type UpdateTeacherResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

type CreateTeacherResponse = {
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
  }
  meta: null | undefined
}

export class AxiosRepository implements TeacherRepository {
  async listTeachers(page: number, limit: number): Promise<Response<TeacherEntity[]>> {
    const response = await axiosClient.get('/teachers', {
      params: {
        page,
        limit
      }
    })
    const body: ListTeachersResponse = response.data

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

  async createTeacher(profile: string, name: string, lastName1: string, email: string, password: string, lastName2?: string): Promise<Response<TeacherEntity>> {
    const response = await axiosClient.post('/teachers', {
      profile,
      name,
      last_name_1: lastName1,
      last_name_2: lastName2,
      email,
      password
    })
    const body: CreateTeacherResponse = response.data

    const data: Response<TeacherEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        profile: body.data.profile,
        user: {
          id: body.data.user.id,
          name: body.data.user.name,
          lastName1: body.data.user.last_name_1,
          lastName2: body.data.user.last_name_2,
          email: body.data.user.email,
          password: body.data.user.password,
          userType: UserType.TEACHER
        }
      }
    }

    return data
  }

  async updateTeacher(teacherID: string, profile: string, password?: string): Promise<Response<string>> {
    const response = await axiosClient.patch(`/teachers/${teacherID}`, {
      profile,
      password
    })
    const body: UpdateTeacherResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }
}