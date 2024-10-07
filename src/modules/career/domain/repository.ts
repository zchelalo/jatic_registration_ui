import { CareerEntity } from '@/modules/career/domain/entity'
import { Response } from '@/types/response'

export interface CareerRepository {
  listCareers(page: number, limit: number): Promise<Response<CareerEntity[]>>
  createCareer(key: string): Promise<Response<CareerEntity>>
  updateCareer(careerID: string, key: string): Promise<Response<string>>
  deleteCareer(careerID: string): Promise<Response<string>>
}