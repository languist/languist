'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@languist/auth'
import { CheckCircleBulk, GithubBulk } from '@languist/icons'
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

import type { ANY } from '../common/any'

import { ProviderButton } from './provider-button'
import { passwordAuthFormSchema } from './schema'
import type { PasswordAuthFormValues } from './schema'

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
        redirectTo: process.env.NEXT_PUBLIC_ORIGIN_URL,
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
          className="animate-in fade-in fill-mode-both space-y-4 px-2 py-4 delay-300 duration-1000"
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
            <GithubBulk className="mr-2 size-5" />
            {t('auth.signUp.github')}
          </ProviderButton>
        </form>
      </Form>
    )
  }

  function renderSuccess() {
    return (
      <Alert
        className="animate-in fade-in fill-mode-both duration-1000"
        variant="success"
      >
        <CheckCircleBulk />
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
      <h1 className="animate-in fade-in fill-mode-both text-center text-3xl font-semibold delay-100 duration-1000">
        {t('auth.signUp.title')}
      </h1>
      <div className="text-muted-foreground animate-in fade-in fill-mode-both text-pretty text-center delay-200 duration-1000">
        {t('auth.signUp.description')}
      </div>
      {isResolved && data ? renderSuccess() : renderForm()}
      <div className="animate-in fade-in fill-mode-both text-center text-sm delay-500 duration-1000">
        {t('auth.signUp.haveAccount')}{' '}
        <Link className="underline" href="/auth/login">
          {t('auth.signUp.signIn')}
        </Link>
      </div>
    </>
  )
}
