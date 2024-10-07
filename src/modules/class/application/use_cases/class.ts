import { ClassRepository } from '@/modules/class/domain/repository'
import { Response } from '@/types/response'
import { ClassEntity } from '@/modules/class/domain/entity'
import { listClassesSchema, suscribeClassSchema, createClassSchema, updateClassSchema, deleteClassSchema } from '@/modules/class/application/schemas/class'
import { DateType } from '@/types/date'

export class ClassUseCase {
  private readonly classRepository: ClassRepository

  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository
  }

  async listClasses(page: number, limit: number): Promise<Response<ClassEntity[]>> {
    listClassesSchema.parse({ page, limit })

    return this.classRepository.listClasses(page, limit)
  }

  async listAllClasses(page: number, limit: number): Promise<Response<ClassEntity[]>> {
    listClassesSchema.parse({ page, limit })

    return this.classRepository.listAllClasses(page, limit)
  }

  async suscribeClass(classIds: string[]): Promise<Response<string>> {
    suscribeClassSchema.parse({ classIds })

    return this.classRepository.suscribeClass(classIds)
  }

  async createClass(name: string, description: string, teacherId: string, dates: DateType[]): Promise<Response<ClassEntity>> {
    createClassSchema.parse({ name, description, teacherId, dates })

    return this.classRepository.createClass(name, description, teacherId, dates)
  }

  async updateClass(classId: string, name: string, description: string, teacherId: string): Promise<Response<string>> {
    updateClassSchema.parse({ classId, name, description, teacherId })

    return this.classRepository.updateClass(classId, name, description, teacherId)
  }

  async deleteClass(classId: string): Promise<Response<string>> {
    deleteClassSchema.parse({ classId })

    return this.classRepository.deleteClass(classId)
  }
}