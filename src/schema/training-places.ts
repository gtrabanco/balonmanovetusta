import { z } from 'astro:schema';

export const scheduleSchema = z.object({
  weekDays: z.array(z.number().min(0).max(7)),
  start: z.string(),
  end: z.string(),
});

export const trainingPlaceSchema = z.object({
  id: z.string(),
  place: z.string(),
  address: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  schedules: z.array(scheduleSchema),
});
