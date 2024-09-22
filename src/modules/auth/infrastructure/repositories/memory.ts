import { AuthRepository } from '@/modules/auth/domain/repository'
import { StudentEntity } from '@/modules/student/domain/entity'

export class MemoryRepository implements AuthRepository {
  async signUpStudent(registrationNumber: string, name: string, lastName1: string, email: string, password: string, utID: string, careerID: string, lastName2?: string): Promise<StudentEntity> {
    throw new Error('Method not implemented.')
  }
}