import { StudentRepository } from '@/modules/student/domain/repository'
import { Response } from '@/types/response'
import { StudentEntity } from '@/modules/student/domain/entity'
import { listStudentsSchema, updateStudentSchema, createStudentSchema, deleteStudentSchema, getCSVStudentsEnrolledByClassIDSchema } from '@/modules/student/application/schemas/student'

export class StudentUseCase {
  private readonly studentRepository: StudentRepository

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository
  }

  async listStudents(page: number, limit: number, search?: string): Promise<Response<StudentEntity[]>> {
    listStudentsSchema.parse({ page, limit, search })

    return this.studentRepository.listStudents(page, limit, search)
  }

  async getCSVStudentsEnrolledByClassID(classID: string): Promise<Response<string>> {
    getCSVStudentsEnrolledByClassIDSchema.parse({ classID })

    return this.studentRepository.getCSVStudentsEnrolledByClassID(classID)
  }

  async createStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<Response<StudentEntity>> {
    createStudentSchema.parse({ registrationNumber, name, lastName1, email, password, utID, careerID, lastName2 })

    return this.studentRepository.createStudent(registrationNumber, name, lastName1, email, password, utID, careerID, lastName2)
  }

  async updateStudent(studentID: string, registrationNumber: string, paid: boolean, password?: string): Promise<Response<string>> {
    updateStudentSchema.parse({ studentID, registrationNumber, paid, password })

    return this.studentRepository.updateStudent(studentID, registrationNumber, paid, password)
  }

  async deleteStudent(studentID: string): Promise<Response<string>> {
    deleteStudentSchema.parse({ studentID })

    return this.studentRepository.deleteStudent(studentID)
  }

  async countStudentsEnrolled(): Promise<Response<number>> {
    return this.studentRepository.countStudentsEnrolled()
  }

  async countStudentsPaid(): Promise<Response<number>> {
    return this.studentRepository.countStudentsPaid()
  }

  async sendEmailsToStudentsPaid(): Promise<Response<string>> {
    return this.studentRepository.sendEmailsToStudentsPaid()
  }
}