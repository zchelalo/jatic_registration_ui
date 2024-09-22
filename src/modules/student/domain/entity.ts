import { UserEntity } from '@/modules/user/domain/entity'

export interface StudentEntity extends UserEntity {
  registrationNumber: string
  utKey: string
  careerKey: string
}