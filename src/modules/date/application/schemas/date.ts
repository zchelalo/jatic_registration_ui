import { z } from 'zod'

export const listDatesSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
})

export const listDatesByClassIdSchema = z.object({
  classId: z.string()
})

export const createDateSchema = z.object({
  classID: z.string(),
  day: z.string(),
  startTime: z.string(),
  endTime: z.string()
})

export const deleteDateSchema = z.object({
  classID: z.string(),
  dateId: z.string()
})