import { TallerEntity } from '@/modules/taller16/domain/entity'

export interface Taller16Repository {
  listTaller16(page: number, limit: number): Promise<TallerEntity[]>
}