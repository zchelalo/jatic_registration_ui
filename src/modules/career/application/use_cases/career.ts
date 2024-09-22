import { CareerRepository } from '@/modules/career/domain/repository'
import { CareerEntity } from '@/modules/career/domain/entity'
import { paginationSchema } from '@/modules/career/application/schemas/career' 

export class CareerUseCase {
  private readonly careerRepository: CareerRepository

  constructor(careerRepository: CareerRepository) {
    this.careerRepository = careerRepository
  }

  async listCareers(page: number, limit: number): Promise<CareerEntity[]> {
    paginationSchema.parse({ page, limit })
    return this.careerRepository.listCareers(page, limit)
  }
} 