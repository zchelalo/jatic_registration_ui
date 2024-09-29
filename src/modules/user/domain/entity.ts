import { UserType } from '@/constants/user_types'

export interface UserEntity {
  id?: string
  name: string
  lastName1: string
  lastName2?: string
  email: string
  password?: string
  userType: UserType
}