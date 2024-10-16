import { z } from 'zod'

export const listAttendancesSchema = z.object({
  classId: z.string().uuid(),
  page: z.number().min(1),
  limit: z.number().min(1)
})

export const updateAttendancesSchema = z.object({
  attendancesIds: z.array(z.string().uuid()),
  attendance: z.boolean()
})