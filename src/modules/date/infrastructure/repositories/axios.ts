import { axiosClient } from '@/api/client'
import { DateRepository } from '@/modules/date/domain/repository'
import { Response } from '@/types/response'
import { DateEntity } from '@/modules/date/domain/entity'
import { Meta } from '@/types/meta'

type ListDatesResponse = {
  code: number
  message: string
  data: {
    id: string
    day: Date
    start_time: Date
    end_time: Date
  }[]
  meta: Meta
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
      meta: body.meta
    }

    return data
  }
}