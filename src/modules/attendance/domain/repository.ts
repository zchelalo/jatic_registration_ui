import { AttendanceEntity } from '@/modules/attendance/domain/entity'

import { Response } from '@/types/response'

export interface AttendanceRepository {
  listAttendances(classId: string, page: number, limit: number): Promise<Response<AttendanceEntity[]>>
  updateAttendances(attendanceIds: string[], attendance: boolean): Promise<Response<string>>
}