import { Response } from '@/types/response'
import { TeacherEntity } from './entity'

export interface TeacherRepository {
  listTeachers(page: number, limit: number): Promise<Response<TeacherEntity[]>>
}