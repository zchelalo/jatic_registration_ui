import { Response } from '@/types/response'
import { EnrollmentEntity } from '@/modules/enrollment/domain/entity'
import { EnrollmentRepository } from '@/modules/enrollment/domain/repository'
import { listEnrollmentsSchema } from '@/modules/enrollment/application/schemas/enrollment'

export class EnrollmentUseCase {
  private readonly enrollmentRepository: EnrollmentRepository

  constructor(enrollmentRepository: EnrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository
  }

  async listEnrollments(page: number, limit: number): Promise<Response<EnrollmentEntity[]>> {
    listEnrollmentsSchema.parse({ page, limit })

    return this.enrollmentRepository.listEnrollments(page, limit)
  }
}