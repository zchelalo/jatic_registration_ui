import { CareerEntity } from '@/modules/career/domain/entity'

export interface CareerRepository {
  listCareers(page: number, limit: number): Promise<CareerEntity[]>
}