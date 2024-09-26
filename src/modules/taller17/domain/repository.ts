import { TallerEntity } from '@/modules/taller17/domain/entity'

export interface Taller17Repository {
  listTaller17(page: number, limit: number): Promise<TallerEntity[]>
}