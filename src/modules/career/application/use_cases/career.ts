import { CareerRepository } from '@/modules/career/domain/repository'
import { CareerEntity } from '@/modules/career/domain/entity'
import { createCareerSchema, deleteCareerSchema, paginationSchema, updateCareerSchema } from '@/modules/career/application/schemas/career' 
import { Response } from '@/types/response'

export class CareerUseCase {
  private readonly careerRepository: CareerRepository

  constructor(careerRepository: CareerRepository) {
    this.careerRepository = careerRepository
  }

  async listCareers(page: number, limit: number): Promise<Response<CareerEntity[]>> {
    paginationSchema.parse({ page, limit })
    return this.careerRepository.listCareers(page, limit)
  }

  async createCareer(key: string): Promise<Response<CareerEntity>> {
    createCareerSchema.parse({ key })

    return this.careerRepository.createCareer(key)
  }

  async updateCareer(careerID: string, key: string): Promise<Response<string>> {
    updateCareerSchema.parse({ careerID, key })

    return this.careerRepository.updateCareer(careerID, key)
  }

  async deleteCareer(careerID: string): Promise<Response<string>> {
    deleteCareerSchema.parse({ careerID })

    return this.careerRepository.deleteCareer(careerID)
  }
} 