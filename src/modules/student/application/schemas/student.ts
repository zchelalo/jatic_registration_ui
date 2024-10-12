import { z } from 'zod'

export const listStudentsSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1),
  search: z.string().optional()
})

export const updateStudentSchema = z.object({
  studentID: z.string().uuid(),
  registrationNumber: z.string().min(1),
  paid: z.boolean(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).optional()
})

export const createStudentSchema = z.object({
  registrationNumber: z.string().min(1, { message: 'La matrícula debe ser de al menos 1 caracteres' }),
  name: z.string().min(3, { message: 'El nombre debe ser de al menos 3 caracteres' }),
  lastName1: z.string().min(3, { message: 'El primer apellido debe ser de al menos 3 caracteres' }),
  lastName2: z.string().min(3, { message: 'El segundo apellido debe ser de al menos 3 caracteres' }).optional(),
  email: z.string().email({ message: 'El correo debe ser un correo electrónico válido' }),
  password: z.string().min(8, { message: 'La contraseña debe ser de al menos 8 caracteres' }),
  utID: z.string().uuid(),
  careerID: z.string().uuid()
})

export const deleteStudentSchema = z.object({
  studentID: z.string().uuid()
})

export const getCSVStudentsEnrolledByClassIDSchema = z.object({
  classID: z.string().uuid()
})