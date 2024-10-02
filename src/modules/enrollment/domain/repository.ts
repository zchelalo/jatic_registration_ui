import { Response } from '@/types/response'
import { EnrollmentEntity } from './entity'

export interface EnrollmentRepository {
  listEnrollments(page: number, limit: number): Promise<Response<EnrollmentEntity[]>>
}