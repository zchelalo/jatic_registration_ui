import { DateRepository } from '@/modules/date/domain/repository'
import { Response } from '@/types/response'
import { DateEntity } from '@/modules/date/domain/entity'
import { listDatesSchema } from '@/modules/date/application/schemas/date'

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
    return this.dateRepository.listDatesByClassId(classId)
  }
}