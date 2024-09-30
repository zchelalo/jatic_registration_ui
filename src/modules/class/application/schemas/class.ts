import { z } from 'zod'

export const listClassesSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
})

export const suscribeClassSchema = z.object({
  classIds: z.array(z.string())
})