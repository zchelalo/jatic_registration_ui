import { DateRepository } from '@/modules/date/domain/repository'
import { Response } from '@/types/response'
import { DateEntity } from '@/modules/date/domain/entity'
import { listDatesSchema, listDatesByClassIdSchema, createDateSchema, deleteDateSchema } from '@/modules/date/application/schemas/date'

export class DateUseCase {
  private readonly dateRepository: DateRepository

  constructor(dateRepository: DateRepository) {
    this.dateRepository = dateRepository
  }

  async listDates(page: number, limit: number): Promise<Response<DateEntity[]>> {
    listDatesSchema.parse({ page, limit })

    return this.dateRepository.listDates(page, limit)
  }

  async listDatesByClassId(classId: string): Promise<Response<DateEntity[]>> {
    listDatesByClassIdSchema.parse({ classId })

    return this.dateRepository.listDatesByClassId(classId)
  }

  async createDate(classID: string, day: string, startTime: string, endTime: string): Promise<Response<DateEntity>> {
    createDateSchema.parse({ classID, day, startTime, endTime })

    return this.dateRepository.createDate(classID, day, startTime, endTime)
  }

  async deleteDate(classID: string, dateId: string): Promise<Response<string>> {
    deleteDateSchema.parse({ classID, dateId })

    return this.dateRepository.deleteDate(classID, dateId)
  }
}