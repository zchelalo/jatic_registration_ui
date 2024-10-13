import { axiosClient } from '@/api/client'
import { Response } from '@/types/response'
import { UserType } from '@/constants/user_types'
import { StudentEntity } from '../../domain/entity'
import { StudentRepository } from '../../domain/repository'
import { UtEntity } from '@/modules/ut/domain/entity'
import { CareerEntity } from '@/modules/career/domain/entity'

type ListStudentsResponse = {
  code: number
  message: string
  data: {
    student: {
      id: string
      registration_number: string
      ut: UtEntity
      career: CareerEntity
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
    already_suscribed_to_classes: boolean
    classes_paid: boolean
  }[]
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

type UpdateStudentResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

type CreateStudentResponse = {
  code: number
  message: string
  data: {
    id: string
    registration_number: string
    ut: UtEntity
    career: CareerEntity
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

type DeleteStudentResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

type CountStudentsEnrolledPaidResponse = {
  code: number
  message: string
  data: number
  meta: null | undefined
}

type SendEmailsToStudentsPaidResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

export class AxiosRepository implements StudentRepository {
  async listStudents(page: number, limit: number, search?: string): Promise<Response<StudentEntity[]>> {
    const response = await axiosClient.get('/students', {
      params: {
        page,
        limit,
        search
      }
    })
    const body: ListStudentsResponse = response.data

    const data: Response<StudentEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(studentObtained => {
        const newStudent: StudentEntity = {
          id: studentObtained.student.id,
          registrationNumber: studentObtained.student.registration_number,
          ut: studentObtained.student.ut,
          career: studentObtained.student.career,
          alreadySuscribedToClasses: studentObtained.already_suscribed_to_classes,
          classesPaid: studentObtained.classes_paid,
          user: {
            id: studentObtained.student.user.id,
            name: studentObtained.student.user.name,
            lastName1: studentObtained.student.user.last_name_1,
            lastName2: studentObtained.student.user.last_name_2,
            email: studentObtained.student.user.email,
            password: studentObtained.student.user.password,
            userType: UserType.STUDENT
          }
        }

        return newStudent
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

  async getCSVStudentsEnrolledByClassID(classID: string): Promise<Response<string>> {
    const response = await axiosClient.get(`/students/csv/${classID}`, {
      responseType: 'blob'
    })

    const csvBlob = new Blob([response.data], { type: 'text/csv' })
    const csvUrl = window.URL.createObjectURL(csvBlob)

    return {
      code: 200,
      message: 'CSV created successfully',
      data: csvUrl
    }
  }

  async createStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<Response<StudentEntity>> {
    const response = await axiosClient.post('/students', {
      registration_number: registrationNumber,
      name,
      last_name_1: lastName1,
      last_name_2: lastName2,
      email,
      password,
      ut_id: utID,
      career_id: careerID
    })
    const body: CreateStudentResponse = response.data

    const data: Response<StudentEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        registrationNumber: body.data.registration_number,
        ut: body.data.ut,
        career: body.data.career,
        alreadySuscribedToClasses: false,
        user: {
          id: body.data.user.id,
          name: body.data.user.name,
          lastName1: body.data.user.last_name_1,
          lastName2: body.data.user.last_name_2,
          email: body.data.user.email,
          password: body.data.user.password,
          userType: UserType.STUDENT
        }
      }
    }

    return data
  }

  async updateStudent(studentID: string, registrationNumber: string, paid: boolean, password?: string): Promise<Response<string>> {
    const response = await axiosClient.patch(`/students/${studentID}`, {
      registration_number: registrationNumber,
      password,
      paid
    })
    const body: UpdateStudentResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }

  async deleteStudent(studentID: string): Promise<Response<string>> {
    const response = await axiosClient.delete(`/students/${studentID}`)
    const body: DeleteStudentResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }

  async countStudentsEnrolled(): Promise<Response<number>> {
    const response = await axiosClient.get('/students/count/enrolled')
    const body: CountStudentsEnrolledPaidResponse = response.data

    const data: Response<number> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }

  async countStudentsPaid(): Promise<Response<number>> {
    const response = await axiosClient.get('/students/count/paid')
    const body: CountStudentsEnrolledPaidResponse = response.data

    const data: Response<number> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }

  async sendEmailsToStudentsPaid(): Promise<Response<string>> {
    const response = await axiosClient.post('/students/email')
    const body: SendEmailsToStudentsPaidResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }
}