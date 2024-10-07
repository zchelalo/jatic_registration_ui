import { axiosClient } from '@/api/client'
import { UtEntity } from '../../domain/entity'
import { UtRepository } from '../../domain/repository'
import { Response } from '@/types/response'

type ListUtsResponse = {
  code: number
  message: string
  data: {
    id: string
    key: string
  }[]
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

type UpdateUtResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

type CreateUtResponse = {
  code: number
  message: string
  data: {
    id: string
    key: string
  }
  meta: null | undefined
}

type DeleteUtResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

export class AxiosRepository implements UtRepository {
  async listUts(page: number, limit: number): Promise<Response<UtEntity[]>> {
    const response = await axiosClient.get('/uts', {
      params: {
        page,
        limit
      }
    })
    const body: ListUtsResponse = response.data

    const data: Response<UtEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(utObtained => {
        const newUt: UtEntity = {
          id: utObtained.id,
          key: utObtained.key
        }

        return newUt
      }),
      meta: {
        page: body.meta.page,
        perPage: body.meta.per_page,
        totalCount: body.meta.total_count,
        pageCount: body.meta.page_count
      }
    }

    return data
  }

  async createUt(key: string): Promise<Response<UtEntity>> {
    const response = await axiosClient.post('/uts', {
      key
    })
    const body: CreateUtResponse = response.data

    const data: Response<UtEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        key: body.data.key
      }
    }

    return data
  }

  async updateUt(utID: string, key: string): Promise<Response<string>> {
    const response = await axiosClient.patch(`/uts/${utID}`, {
      key
    })
    const body: UpdateUtResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }

  async deleteUt(utID: string): Promise<Response<string>> {
    const response = await axiosClient.delete(`/uts/${utID}`)
    const body: DeleteUtResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }
}