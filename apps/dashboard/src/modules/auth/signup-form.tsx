'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@languist/auth'
import { AuthError } from '@languist/supabase/auth'
import { Alert, AlertDescription, AlertTitle } from '@languist/ui/alert'
import { BrandIcons } from '@languist/ui/brand-icons'
import { Button } from '@languist/ui/button'
import { Form, FormError } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import { IconCircleCheck } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useI18n } from '@/locales/client'

import type { ANY } from '../common/any'

import { ProviderButton } from './provider-button'
import { passwordAuthFormSchema } from './schema'
import type { PasswordAuthFormValues } from './schema'

const { origin } = window.location

export function SignUpForm() {
  const t = useI18n()

  const [{ isResolved, data }, submit] = useLogin({
    action: 'signUp',
  })

  const form = useForm<PasswordAuthFormValues>({
    resolver: zodResolver(passwordAuthFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: PasswordAuthFormValues) {
    try {
      await submit(values, {
        redirectTo: origin!,
      })
      toast.success(t('auth.signUp.success.toastTitle'), {
        description: t('auth.signUp.success.toastDescription'),
      })
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        form.setError('root', { message: error.message })
      } else {
        form.setError('root', {
          message: (error as ANY)?.message || t('auth.login.error'),
        })
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
            label={t('auth.signUp.email')}
            name="email"
          />
          <InputFormField
            required
            control={form.control}
            inputProps={{ type: 'password' }}
            label={t('auth.signUp.password')}
            name="password"
          />
          <FormError />
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('auth.signUp.signUp')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                {t('auth.signUp.continueWith')}
              </span>
            </div>
          </div>
          <ProviderButton
            disabled={form.formState.isSubmitting}
            provider="github"
          >
            <BrandIcons.GitHub className="mr-2 size-4" />
            {t('auth.signUp.github')}
          </ProviderButton>
        </form>
      </Form>
    )
  }

  function renderSuccess() {
    return (
      <Alert variant="success">
        <IconCircleCheck className="size-5" />
        <AlertTitle>{t('auth.signUp.success.title')}</AlertTitle>
        <AlertDescription>
          {t('auth.signUp.success.description')}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Logo className="mx-auto" size="lg" spin={form.formState.isSubmitting} />
      <h1 className="text-center text-3xl font-semibold">
        {t('auth.signUp.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.signUp.description')}
      </div>
      {isResolved && data ? renderSuccess() : renderForm()}
      <div className="text-center text-sm">
        {t('auth.signUp.haveAccount')}{' '}
        <Link className="underline" href="/auth/login">
          {t('auth.signUp.signIn')}
        </Link>
      </div>
    </>
  )
}
