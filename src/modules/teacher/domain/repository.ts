import { Response } from '@/types/response'
import { TeacherEntity } from './entity'

export interface TeacherRepository {
  listTeachers(page: number, limit: number): Promise<Response<TeacherEntity[]>>
  createTeacher(profile: string, name: string, lastName1: string, email: string, password: string, lastName2?: string): Promise<Response<TeacherEntity>>
  updateTeacher(teacherID: string, profile: string, password?: string): Promise<Response<string>>
  deleteTeacher(teacherID: string): Promise<Response<string>>
}