import { DateEntity } from '@/modules/date/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'

export interface ClassEntity {
  id: string
  name: string
  description: string
  teacher: TeacherEntity
  dates: DateEntity[]
}