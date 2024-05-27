import { z } from 'zod'

export const projectFormSchema = z.object({
  name: z.string().min(3).max(50),
  sourceLanguage: z.string().min(0),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
