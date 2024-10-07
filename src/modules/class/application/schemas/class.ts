import { z } from 'zod'

export const listClassesSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
})

export const suscribeClassSchema = z.object({
  classIds: z.array(z.string())
})

export const createClassSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  teacherId: z.string(),
  dates: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string()
  }))
})

export const updateClassSchema = z.object({
  classId: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  teacherId: z.string()
})

export const deleteClassSchema = z.object({
  classId: z.string()
})