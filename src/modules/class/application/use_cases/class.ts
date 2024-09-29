import { ClassRepository } from '@/modules/class/domain/repository'
import { Response } from '@/types/response'
import { ClassEntity } from '@/modules/class/domain/entity'
import { listClassesSchema } from '@/modules/class/application/schemas/class'

export class ClassUseCase {
  private readonly classRepository: ClassRepository

  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository
  }

  async listClasses(page: number, limit: number): Promise<Response<ClassEntity[]>> {
    listClassesSchema.parse({ page, limit })

    return this.classRepository.listClasses(page, limit)
  }
}