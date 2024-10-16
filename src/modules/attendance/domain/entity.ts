import { StudentEntity } from '@/modules/student/domain/entity'

export interface AttendanceEntity {
  id: string
  attendance: boolean
  student: StudentEntity
}