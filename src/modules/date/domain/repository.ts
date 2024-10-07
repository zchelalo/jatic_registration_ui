import { DateEntity } from '@/modules/date/domain/entity'
import { Response } from '@/types/response'

export interface DateRepository {
  listDates(page: number, limit: number): Promise<Response<DateEntity[]>>
  listDatesByClassId(classId: string): Promise<Response<DateEntity[]>>
  createDate(classID: string, day: string, startTime: string, endTime: string): Promise<Response<DateEntity>>
  deleteDate(classID: string, dateId: string): Promise<Response<string>>
}