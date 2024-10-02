import { AuthRepository } from '@/modules/auth/domain/repository'
import { StudentEntity } from '@/modules/student/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { UserEntity } from '@/modules/user/domain/entity'

import { UserType } from '@/constants/user_types'
import { Response } from '@/types/response'

import { axiosClient } from '@/api/client'

type SignUpInStudentResponse = {
  code: number
  message: string
  data: {
    student: {
      id: string
      registration_number: string
      user: {
        id: string
        name: string
        last_name_1: string
        last_name_2: string
        email: string
        password: string
        user_type: string
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
    already_suscribed_to_classes: boolean
  }
}

type SignInTeacherResponse = {
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
}

type SignInAdminResponse = {
  code: number
  message: string
  data: {
    id: string
    name: string
    last_name_1: string
    last_name_2: string
    email: string
    password: string
    user_type: string
  }
}

export class AxiosRepository implements AuthRepository {
  async signUpStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<Response<StudentEntity>> {
    const response = await axiosClient.post('/auth/student/sign-up', {
      registration_number: registrationNumber,
      name: name,
      last_name_1: lastName1,
      last_name_2: lastName2,
      email: email,
      password: password,
      ut_id: utID,
      career_id: careerID
    })
    const body: SignUpInStudentResponse = response.data

    const data: Response<StudentEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.student.id,
        registrationNumber: body.data.student.registration_number,
        user: {
          id: body.data.student.user.id,
          name: body.data.student.user.name,
          lastName1: body.data.student.user.last_name_1,
          lastName2: body.data.student.user.last_name_2,
          email: body.data.student.user.email,
          password: body.data.student.user.password,
          userType: UserType.STUDENT
        },
        ut: {
          id: body.data.student.ut.id,
          key: body.data.student.ut.key
        },
        career: {
          id: body.data.student.career.id,
          key: body.data.student.career.key
        },
        alreadySuscribedToClasses: body.data.already_suscribed_to_classes
      }
    }
    return data
  }

  async signInStudent(registrationNumber: string, email: string, password: string): Promise<Response<StudentEntity>> {
    const response = await axiosClient.post('/auth/student/sign-in', {
      registration_number: registrationNumber,
      email: email,
      password: password
    })
    const body: SignUpInStudentResponse = response.data

    const data: Response<StudentEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.student.id,
        registrationNumber: body.data.student.registration_number,
        user: {
          id: body.data.student.user.id,
          name: body.data.student.user.name,
          lastName1: body.data.student.user.last_name_1,
          lastName2: body.data.student.user.last_name_2,
          email: body.data.student.user.email,
          password: body.data.student.user.password,
          userType: UserType.STUDENT
        },
        ut: {
          id: body.data.student.ut.id,
          key: body.data.student.ut.key
        },
        career: {
          id: body.data.student.career.id,
          key: body.data.student.career.key
        },
        alreadySuscribedToClasses: body.data.already_suscribed_to_classes
      }
    }
    return data
  }

  async signInTeacher(email: string, password: string): Promise<Response<TeacherEntity>> {
    const response = await axiosClient.post('/auth/teacher/sign-in', {
      email: email,
      password: password
    })
    const body: SignInTeacherResponse = response.data

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

  async signInAdmin(email: string, password: string): Promise<Response<UserEntity>> {
    const response = await axiosClient.post('/auth/admin/sign-in', {
      email: email,
      password: password
    })
    const body: SignInAdminResponse = response.data

    const data: Response<UserEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        name: body.data.name,
        lastName1: body.data.last_name_1,
        lastName2: body.data.last_name_2,
        email: body.data.email,
        password: body.data.password,
        userType: UserType.ADMIN
      }
    }

    return data
  }

  async signOut(): Promise<void> {
    await axiosClient.post('/auth/sign-out')
  }
}