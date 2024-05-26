'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdatePassword } from '@languist/auth'
import { CheckCircleBulk } from '@languist/icons'
import { AuthError } from '@languist/supabase/auth'
import { Alert, AlertDescription, AlertTitle } from '@languist/ui/alert'
import { Button } from '@languist/ui/button'
import { Form, FormError } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useI18n } from '@/locales/client'

import { updatePasswordFormSchema } from './schema'
import type { UpdatePasswordFormValues } from './schema'

export function UpdatePasswordForm() {
  const t = useI18n()
  const router = useRouter()

  const [{ isResolved }, submit] = useUpdatePassword()

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: UpdatePasswordFormValues) {
    try {
      await submit(values, {
        redirectTo: process.env.NEXT_PUBLIC_ORIGIN_URL,
      })
      setTimeout(() => router.replace('/'), 2000)
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        form.setError('root', { message: error.message })
      } else {
        form.setError('root', { message: t('auth.login.error') })
      }
    }
  }

  function renderForm() {
    return (
      <Form {...form}>
        <form
          className="space-y-4 px-2 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputFormField
            required
            control={form.control}
            inputProps={{ type: 'password' }}
            label={t('auth.updatePassword.password')}
            name="password"
          />
          <InputFormField
            required
            control={form.control}
            inputProps={{ type: 'password' }}
            label={t('auth.updatePassword.confirmPassword')}
            name="confirmPassword"
          />
          <FormError />
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('auth.updatePassword.updatePassword')}
          </Button>
        </form>
      </Form>
    )
  }

  function renderSuccess() {
    return (
      <Alert variant="success">
        <CheckCircleBulk />
        <AlertTitle>{t('auth.updatePassword.success.title')}</AlertTitle>
        <AlertDescription>
          {t('auth.updatePassword.success.description')}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Logo className="mx-auto" size="lg" spin={form.formState.isSubmitting} />
      <h1 className="text-center text-3xl font-semibold">
        {t('auth.updatePassword.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.updatePassword.description')}
      </div>
      {isResolved ? renderSuccess() : renderForm()}
    </>
  )
}
