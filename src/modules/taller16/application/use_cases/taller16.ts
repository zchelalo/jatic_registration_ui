import { Taller16Repository } from '@/modules/taller16/domain/repository'
import { TallerEntity } from '@/modules/taller16/domain/entity'
import { paginationSchema } from '@/modules/taller16/application/schemas/taller16' 

export class TallerUseCase {
  private readonly Taller16Repository: Taller16Repository

  constructor(Taller16Repository: Taller16Repository) {
    this.Taller16Repository = Taller16Repository
  }

  async listTaller16(page: number, limit: number): Promise<TallerEntity[]> {
    paginationSchema.parse({ page, limit })
    return this.Taller16Repository.listTaller16(page, limit)
  }
} 