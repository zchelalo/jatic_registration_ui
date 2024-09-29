import { UtRepository } from '@/modules/ut/domain/repository'
import { UtEntity } from '@/modules/ut/domain/entity'
import { paginationSchema } from '@/modules/ut/application/schemas/ut' 
import { Response } from '@/types/response'

export class UtUseCase {
  private readonly utRepository: UtRepository

  constructor(utRepository: UtRepository) {
    this.utRepository = utRepository
  }

  async listUts(page: number, limit: number): Promise<Response<UtEntity[]>> {
    paginationSchema.parse({ page, limit })
    return this.utRepository.listUts(page, limit)
  }
} 