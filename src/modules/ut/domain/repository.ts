import { UtEntity } from '@/modules/ut/domain/entity'
import { Response } from '@/types/response'

export interface UtRepository {
  listUts(page: number, limit: number): Promise<Response<UtEntity[]>>
}