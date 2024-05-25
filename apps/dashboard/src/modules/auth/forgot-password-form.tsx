'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useResetPassword } from '@languist/auth'
import { AuthError } from '@languist/supabase/auth'
import { Alert, AlertDescription, AlertTitle } from '@languist/ui/alert'
import { Button } from '@languist/ui/button'
import { Form, FormError } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useI18n } from '@/locales/client'

import { forgotPasswordFormSchema } from './schema'
import type { ForgotPasswordFormValues } from './schema'
import { CheckCircleBulk } from '@languist/icons'

const { origin } = window.location

export function ForgotPasswordForm() {
  const t = useI18n()
  const [{ isResolved }, submit] = useResetPassword()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      await submit(values, {
        redirectTo: `${origin!}/auth/update-password`,
      })
      toast.success(t('auth.forgotPassword.success.toastTitle'), {
        description: t('auth.forgotPassword.success.toastDescription'),
      })
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
            label={t('auth.forgotPassword.email')}
            name="email"
          />
          <FormError />
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('auth.forgotPassword.sendResetLink')}
          </Button>
        </form>
      </Form>
    )
  }

  function renderSuccess() {
    return (
      <Alert variant="success">
        <CheckCircleBulk />
        <AlertTitle>{t('auth.forgotPassword.success.title')}</AlertTitle>
        <AlertDescription>
          {t('auth.forgotPassword.success.description')}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Logo className="mx-auto" size="lg" spin={form.formState.isSubmitting} />
      <h1 className="text-center text-3xl font-semibold">
        {t('auth.forgotPassword.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.forgotPassword.description')}
      </div>
      {isResolved ? renderSuccess() : renderForm()}
      <div className="text-center text-sm">
        <Link className="underline" href="/auth/login">
          {t('auth.forgotPassword.backToLogin')}
        </Link>
      </div>
    </>
  )
}
