import { TeacherRepository } from '@/modules/teacher/domain/repository'
import { Response } from '@/types/response'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { listTeachersSchema, updateTeacherSchema, createTeacherSchema, deleteTeacherSchema } from '@/modules/teacher/application/schemas/teacher'

export class TeacherUseCase {
  private readonly teacherRepository: TeacherRepository

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository
  }

  async listTeachers(page: number, limit: number): Promise<Response<TeacherEntity[]>> {
    listTeachersSchema.parse({ page, limit })

    return this.teacherRepository.listTeachers(page, limit)
  }

  async createTeacher(profile: string, name: string, lastName1: string, email: string, password: string, lastName2?: string): Promise<Response<TeacherEntity>> {
    createTeacherSchema.parse({ profile, name, lastName1, email, password, lastName2 })

    return this.teacherRepository.createTeacher(profile, name, lastName1, email, password, lastName2)
  }

  async updateTeacher(teacherID: string, profile: string, password?: string): Promise<Response<string>> {
    updateTeacherSchema.parse({ teacherID, profile, password })

    return this.teacherRepository.updateTeacher(teacherID, profile, password)
  }

  async deleteTeacher(teacherID: string): Promise<Response<string>> {
    deleteTeacherSchema.parse({ teacherID })

    return this.teacherRepository.deleteTeacher(teacherID)
  }
}