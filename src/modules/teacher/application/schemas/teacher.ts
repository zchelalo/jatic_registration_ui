import { z } from 'zod'

export const listTeachersSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
})

export const updateTeacherSchema = z.object({
  teacherID: z.string().uuid(),
  profile: z.string().min(1),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).optional()
})