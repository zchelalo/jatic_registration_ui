import { AttendanceEntity } from '@/modules/attendance/domain/entity'
import { AttendanceRepository } from '@/modules/attendance/domain/repository'

import { Response } from '@/types/response'

import { listAttendancesSchema, updateAttendancesSchema } from '@/modules/attendance/application/schemas/attendance'

export class AttendanceUseCase {
  private readonly attendanceRepository: AttendanceRepository

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository
  }

  async listAttendances(classId: string, page: number, limit: number): Promise<Response<AttendanceEntity[]>> {
    listAttendancesSchema.parse({ classId, page, limit })
    return this.attendanceRepository.listAttendances(classId, page, limit)
  }

  async updateAttendances(attendancesIds: string[], attendance: boolean): Promise<Response<string>> {
    updateAttendancesSchema.parse({ attendancesIds, attendance })
    return this.attendanceRepository.updateAttendances(attendancesIds, attendance)
  }
} 