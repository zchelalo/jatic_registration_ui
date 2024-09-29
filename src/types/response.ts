import { Meta } from './meta'

export type Response<T> = {
  code: number
  message: string
  data: T
  meta?: Meta
}