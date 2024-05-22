'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@languist/ui/button'
import { Form } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useI18n } from '@/locales/client'

import { forgotPasswordFormSchema } from './schema'
import type { ForgotPasswordFormValues } from './schema'

export function ForgotPasswordForm() {
  const t = useI18n()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: ForgotPasswordFormValues) {
    // eslint-disable-next-line no-console
    console.log(values)
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
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('auth.forgotPassword.sendResetLink')}
          </Button>
          <div className="mt-4 text-center text-sm">
            <Link className="underline" href="/login">
              {t('auth.forgotPassword.backToLogin')}
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
