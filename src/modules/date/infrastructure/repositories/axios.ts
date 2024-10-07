import { axiosClient } from '@/api/client'
import { DateRepository } from '@/modules/date/domain/repository'
import { Response } from '@/types/response'
import { DateEntity } from '@/modules/date/domain/entity'

type ListDatesResponse = {
  code: number
  message: string
  data: {
    id: string
    day: Date
    start_time: Date
    end_time: Date
  }[]
  meta: {
    page: number
    per_page: number
    total_count: number
    page_count: number
  }
}

type CreateDateResponse = {
  code: number
  message: string
  data: {
    id: string
    day: Date
    start_time: Date
    end_time: Date
  }
  meta: undefined | null
}

type DeleteDateResponse = {
  code: number
  message: string
  data: string
  meta: undefined | null
}

export class AxiosRepository implements DateRepository {
  async listDates(page: number, limit: number): Promise<Response<DateEntity[]>> {
    const response = await axiosClient.get('/dates', {
      params: {
        page,
        limit
      }
    })
    const body: ListDatesResponse = response.data

    const data: Response<DateEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(date => {
        const newDate: DateEntity = {
          id: date.id,
          day: date.day,
          startTime: date.start_time,
          endTime: date.end_time
        }

        return newDate
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

  async listDatesByClassId(classId: string): Promise<Response<DateEntity[]>> {
    const response = await axiosClient.get(`/dates/${classId}`)
    const body: ListDatesResponse = response.data

    const data: Response<DateEntity[]> = {
      code: body.code,
      message: body.message,
      data: body.data.map(date => {
        const newDate: DateEntity = {
          id: date.id,
          day: date.day,
          startTime: date.start_time,
          endTime: date.end_time
        }

        return newDate
      })
    }

    return data
  }

  async createDate(classID: string, day: string, startTime: string, endTime: string): Promise<Response<DateEntity>> {
    const response = await axiosClient.post(`/dates/${classID}`, {
      day,
      start_time: startTime,
      end_time: endTime
    })
    const body: CreateDateResponse = response.data

    const data: Response<DateEntity> = {
      code: body.code,
      message: body.message,
      data: {
        id: body.data.id,
        day: body.data.day,
        startTime: body.data.start_time,
        endTime: body.data.end_time
      }
    }

    return data
  }

  async deleteDate(classID: string, dateId: string): Promise<Response<string>> {
    const response = await axiosClient.delete(`/dates/${dateId}`, {
      data: {
        class_id: classID
      }
    })
    const body: DeleteDateResponse = response.data

    const data: Response<string> = {
      code: body.code,
      message: body.message,
      data: body.data
    }

    return data
  }
}