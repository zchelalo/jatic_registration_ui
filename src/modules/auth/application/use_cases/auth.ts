import { StudentEntity } from '@/modules/student/domain/entity'
import { UserEntity } from '@/modules/user/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { AuthRepository } from '@/modules/auth/domain/repository'

import { Response } from '@/types/response'

import { signUpStudentSchema, signInStudentSchema, signInSchema } from '@/modules/auth/application/schemas/auth'

export class AuthUseCase {
  private readonly authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async signUpStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<Response<StudentEntity>> {
    signUpStudentSchema.parse({ registrationNumber, name, lastName1, email, password, utID, careerID, lastName2 })

    return this.authRepository.signUpStudent(registrationNumber, name, lastName1, email, password, utID, careerID, lastName2)
  }

  async signInStudent(registrationNumber: string, email: string, password: string): Promise<Response<StudentEntity>> {
    signInStudentSchema.parse({ registrationNumber, email, password })

    return this.authRepository.signInStudent(registrationNumber, email, password)
  }

  async signInTeacher(email: string, password: string): Promise<Response<TeacherEntity>> {
    signInSchema.parse({ email, password })

    return this.authRepository.signInTeacher(email, password)
  }

  async signInAdmin(email: string, password: string): Promise<Response<UserEntity>> {
    signInSchema.parse({ email, password })

    return this.authRepository.signInAdmin(email, password)
  }

  async signOut(): Promise<void> {
    return this.authRepository.signOut()
  }
}