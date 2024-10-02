import { ClassEntity } from '@/modules/class/domain/entity'

export interface EnrollmentEntity {
  id: string
  canBeCertified: boolean
  paidAt: Date
  class: ClassEntity
}