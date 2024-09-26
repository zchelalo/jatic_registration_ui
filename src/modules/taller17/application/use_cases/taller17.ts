import {  Taller17Repository } from '@/modules/taller17/domain/repository'
import { TallerEntity } from '@/modules/taller17/domain/entity'
import { paginationSchema } from '@/modules/taller17/application/schemas/taller17'

export class TallerUseCase {
  private readonly Taller17Repository: Taller17Repository

  constructor(Taller17Repository: Taller17Repository) {
    this.Taller17Repository = Taller17Repository
  }

  async listTaller17(page: number, limit: number): Promise<TallerEntity[]> {
    paginationSchema.parse({ page, limit })
    return this.Taller17Repository.listTaller17(page, limit)
  }
} 