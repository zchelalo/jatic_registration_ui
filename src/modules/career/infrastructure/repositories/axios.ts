import { axiosClient } from '@/api/client'
import { CareerEntity } from '../../domain/entity'
import { CareerRepository } from '../../domain/repository'
import { Response } from '@/types/response'

type ListCareersResponse = {
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

type UpdateCareerResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

type CreateCareerResponse = {
  code: number
  message: string
  data: {
    id: string
    key: string
  }
  meta: null | undefined
}

type DeleteCareerResponse = {
  code: number
  message: string
  data: string
  meta: null | undefined
}

export class AxiosRepository implements CareerRepository {
  async listCareers(page: number, limit: number): Promise<Response<CareerEntity[]>> {
    const response = await axiosClient.get('/careers', {
      params: {
        page,
        limit
      }
    })
    const body: ListCareersResponse = response.data

    const data: Response<CareerEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(careerObtained => {
        const newCareer: CareerEntity = {
          id: careerObtained.id,
          key: careerObtained.key
        }

        return newCareer
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

  async createCareer(key: string): Promise<Response<CareerEntity>> {
    const response = await axiosClient.post('/careers', {
      key
    })
    const body: CreateCareerResponse = response.data

    const data: Response<CareerEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        key: body.data.key
      }
    }

    return data
  }

  async updateCareer(careerID: string, key: string): Promise<Response<string>> {
    const response = await axiosClient.patch(`/careers/${careerID}`, {
      key
    })
    const body: UpdateCareerResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }

  async deleteCareer(careerID: string): Promise<Response<string>> {
    const response = await axiosClient.delete(`/careers/${careerID}`)
    const body: DeleteCareerResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }
}