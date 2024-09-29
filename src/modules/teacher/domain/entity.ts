import { UserEntity } from '@/modules/user/domain/entity'

export interface TeacherEntity {
  id?: string
  profile: string
  user: UserEntity
}