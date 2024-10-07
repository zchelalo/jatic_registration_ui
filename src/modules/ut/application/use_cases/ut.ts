import { UtRepository } from '@/modules/ut/domain/repository'
import { UtEntity } from '@/modules/ut/domain/entity'
import { createUtSchema, deleteUtSchema, paginationSchema, updateUtSchema } from '@/modules/ut/application/schemas/ut' 
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

  async createUt(key: string): Promise<Response<UtEntity>> {
    createUtSchema.parse({ key })

    return this.utRepository.createUt(key)
  }

  async updateUt(utID: string, key: string): Promise<Response<string>> {
    updateUtSchema.parse({ utID, key })

    return this.utRepository.updateUt(utID, key)
  }

  async deleteUt(utID: string): Promise<Response<string>> {
    deleteUtSchema.parse({ utID })

    return this.utRepository.deleteUt(utID)
  }
} 