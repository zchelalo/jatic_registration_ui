import { CareerEntity } from '@/modules/career/domain/entity'
import { UserEntity } from '@/modules/user/domain/entity'
import { UtEntity } from '@/modules/ut/domain/entity'

export interface StudentEntity {
  id?: string
  registrationNumber: string
  user: UserEntity
  ut: UtEntity
  career: CareerEntity
  alreadySuscribedToClasses: boolean
}