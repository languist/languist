import { z } from "zod";

export const passwordAuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type PasswordAuthFormValues = z.infer<typeof passwordAuthFormSchema>

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>
