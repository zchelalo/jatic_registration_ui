import { StudentEntity } from '@/modules/student/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { Response } from '@/types/response'

export interface AuthRepository {
  signUpStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<Response<StudentEntity>>
  signInStudent(registrationNumber: string, email: string, password: string): Promise<Response<StudentEntity>>
  signInTeacher(email: string, password: string): Promise<Response<TeacherEntity>>
}