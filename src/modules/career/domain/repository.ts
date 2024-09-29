import { CareerEntity } from '@/modules/career/domain/entity'
import { Response } from '@/types/response'

export interface CareerRepository {
  listCareers(page: number, limit: number): Promise<Response<CareerEntity[]>>
}