import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
})

export const createUtSchema = z.object({
  key: z.string().min(1).max(255)
})

export const updateUtSchema = z.object({
  utID: z.string().uuid(),
  key: z.string().min(1).max(255)
})

export const deleteUtSchema = z.object({
  utID: z.string().uuid()
})