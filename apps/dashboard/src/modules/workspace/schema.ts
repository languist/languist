import { z } from 'zod'

export const createWorkspaceFormSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(32),
})

export type CreateWorkspaceFormValues = z.infer<
  typeof createWorkspaceFormSchema
>
