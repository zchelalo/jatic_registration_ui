import { Response } from '@/types/response'
import { ClassEntity } from './entity'

export interface ClassRepository {
  listClasses(page: number, limit: number): Promise<Response<ClassEntity[]>>
  suscribeClass(classIds: string[]): Promise<Response<string>>
}