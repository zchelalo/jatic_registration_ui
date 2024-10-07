import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1),
})

export const createCareerSchema = z.object({
  key: z.string().min(1).max(255),
})

export const updateCareerSchema = z.object({
  careerID: z.string().uuid(),
  key: z.string().min(1).max(255),
})

export const deleteCareerSchema = z.object({
  careerID: z.string().uuid(),
})