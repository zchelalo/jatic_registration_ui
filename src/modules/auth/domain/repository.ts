import { StudentEntity } from '@/modules/student/domain/entity'

export interface AuthRepository {
  signUpStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string,): Promise<StudentEntity>
}