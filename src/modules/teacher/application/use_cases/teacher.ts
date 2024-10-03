import { TeacherRepository } from '@/modules/teacher/domain/repository'
import { Response } from '@/types/response'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { listTeachersSchema } from '@/modules/teacher/application/schemas/teacher'

export class TeacherUseCase {
  private readonly teacherRepository: TeacherRepository

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository
  }

  async listTeachers(page: number, limit: number): Promise<Response<TeacherEntity[]>> {
    listTeachersSchema.parse({ page, limit })

    return this.teacherRepository.listTeachers(page, limit)
  }
}