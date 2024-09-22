import { UserEntity } from '@/modules/user/domain/entity'
import { AuthRepository } from '@/modules/auth/domain/repository'

import { signInSchema, signUpStudentSchema } from '@/modules/auth/application/schemas/auth'

export class AuthUseCase {
  private readonly authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async signUpStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<UserEntity> {
    signUpStudentSchema.parse({ registrationNumber, name, lastName1, email, password, utID, careerID, lastName2 })

    return this.authRepository.signUpStudent(registrationNumber, name, lastName1, email, password, utID, careerID, lastName2)
  }

}