import { DateEntity } from '@/modules/date/domain/entity'
import { Response } from '@/types/response'

export interface DateRepository {
  listDates(page: number, limit: number): Promise<Response<DateEntity[]>>
  listDatesByClassId(classId: string): Promise<Response<DateEntity[]>>
}