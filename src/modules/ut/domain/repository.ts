import { UtEntity } from '@/modules/ut/domain/entity'

export interface UtRepository {
  listUts(page: number, limit: number): Promise<UtEntity[]>
}