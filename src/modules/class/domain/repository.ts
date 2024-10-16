import { Response } from '@/types/response'
import { ClassEntity } from './entity'
import { DateType } from '@/types/date'

export interface ClassRepository {
  listClasses(page: number, limit: number): Promise<Response<ClassEntity[]>>
  listAllClasses(page: number, limit: number): Promise<Response<ClassEntity[]>>
  listClassesByTeacher(page: number, limit: number): Promise<Response<ClassEntity[]>>
  suscribeClass(classIds: string[]): Promise<Response<string>>
  createClass(name: string, description: string, teacherId: string, dates: DateType[]): Promise<Response<ClassEntity>>
  updateClass(classId: string, name: string, description: string, teacherId: string): Promise<Response<string>>
  deleteClass(classId: string): Promise<Response<string>>
}