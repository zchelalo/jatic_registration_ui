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

export const createTeacherSchema = z.object({
  profile: z.string().min(3, { message: 'Profile must be at least 3 characters long' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  lastName1: z.string().min(3, { message: 'Last name must be at least 3 characters long' }),
  lastName2: z.string().min(3, { message: 'Last name must be at least 3 characters long' }).optional(),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})