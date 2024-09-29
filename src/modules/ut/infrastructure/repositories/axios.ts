import { axiosClient } from '@/api/client'
import { UtEntity } from '../../domain/entity'
import { UtRepository } from '../../domain/repository'
import { Response } from '@/types/response'

export class AxiosRepository implements UtRepository {
  async listUts(page: number, limit: number): Promise<Response<UtEntity[]>> {
    const response = await axiosClient.get('/uts', {
      params: {
        page,
        limit
      }
    })
    const body: Response<UtEntity[]> = response.data
    return body
  }
}