import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const signInStudentSchema = signInSchema.extend({
  registrationNumber: z.string().min(1)
})

export const signUpStudentSchema = signInSchema.extend({
  registrationNumber: z.string().min(1),
  name: z.string().min(3),
  lastName1: z.string().min(3),
  lastName2: z.string().min(3).optional(),
  utID: z.string().min(1),
  careerID: z.string().min(1)
})