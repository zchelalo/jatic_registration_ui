import { axiosClient } from '@/api/client'
import { CareerRepository } from '../../domain/repository'
import { CareerEntity } from '../../domain/entity'
import { Response } from '@/types/response'

export class AxiosRepository implements CareerRepository {
  async listCareers(page: number, limit: number): Promise<Response<CareerEntity[]>> {
    const response = await axiosClient.get('/careers', {
      params: {
        page,
        limit
      }
    })
    const body: Response<CareerEntity[]> = response.data
    return body
  }
}