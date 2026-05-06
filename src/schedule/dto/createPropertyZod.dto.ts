import { z } from 'zod';

export const createPropertySchema = z
  .object({
    name: z.string(),
    description: z.string().min(2),
    area: z.number().positive(),
  })
  .required();

export type CreatePropertyZodSchema = z.infer<typeof createPropertySchema>;
