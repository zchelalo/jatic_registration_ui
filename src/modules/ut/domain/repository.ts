import { UtEntity } from '@/modules/ut/domain/entity'
import { Response } from '@/types/response'

export interface UtRepository {
  listUts(page: number, limit: number): Promise<Response<UtEntity[]>>
  createUt(key: string): Promise<Response<UtEntity>>
  updateUt(utID: string, key: string): Promise<Response<string>>
  deleteUt(utID: string): Promise<Response<string>>
}