import { z } from 'zod'

export const passwordAuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type PasswordAuthFormValues = z.infer<typeof passwordAuthFormSchema>

export const signUpFormSchema = z.object({
  email: z.string().email(),
})

export type SignUpFormValues = z.infer<typeof signUpFormSchema>

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>

export const updatePasswordFormSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordFormSchema>
