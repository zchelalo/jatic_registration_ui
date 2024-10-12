import { Response } from '@/types/response'
import { StudentEntity } from './entity'

export interface StudentRepository {
  listStudents(page: number, limit: number, search?: string): Promise<Response<StudentEntity[]>>
  createStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<Response<StudentEntity>>
  updateStudent(studentID: string, registrationNumber: string, paid: boolean, password?: string): Promise<Response<string>>
  deleteStudent(studentID: string): Promise<Response<string>>
  countStudentsEnrolled(): Promise<Response<number>>
  countStudentsPaid(): Promise<Response<number>>
}