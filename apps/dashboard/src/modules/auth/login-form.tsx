'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@languist/auth'
import { GithubBulk } from '@languist/icons'
import { AuthError } from '@languist/supabase/auth'
import { Button } from '@languist/ui/button'
import { Form, FormError, FormLabel } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useI18n } from '@/locales/client'

import type { ANY } from '../common/any'

import { ProviderButton } from './provider-button'
import { passwordAuthFormSchema } from './schema'
import type { PasswordAuthFormValues } from './schema'

const getFragmentParams = (fragment?: string) => {
  if (!fragment) {
    return {}
  }
  const params = new URLSearchParams(fragment)
  const entries = Object.fromEntries(params.entries())
  return entries
}

export function LoginForm() {
  const t = useI18n()
  const router = useRouter()

  const [, submit] = useLogin({ action: 'logIn' })

  const form = useForm<PasswordAuthFormValues>({
    resolver: zodResolver(passwordAuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const serverError = getFragmentParams(
      window.location.hash.substring(1),
    )?.error_description
    if (serverError) {
      form.setError('root', { message: serverError })
    }
  }, [form])

  async function onSubmit(values: PasswordAuthFormValues) {
    try {
      await submit(values, {
        redirectTo: process.env.NEXT_PUBLIC_ORIGIN_URL,
      })
      router.replace('/')
      toast.success(t('auth.login.success.toastTitle'), {
        description: t('auth.login.success.toastDescription'),
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

  return (
    <>
      <Logo className="mx-auto" size="lg" spin={form.formState.isSubmitting} />
      <h1 className="animate-in fade-in fill-mode-both text-center text-3xl font-semibold delay-100 duration-1000">
        {t('auth.login.title')}
      </h1>
      <div className="text-muted-foreground animate-in fade-in fill-mode-both text-pretty text-center delay-200 duration-1000">
        {t('auth.login.description')}
      </div>
      <Form {...form}>
        <form
          className="animate-in fade-in fill-mode-both space-y-4 px-2 py-4 delay-300 duration-1000"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputFormField
            required
            control={form.control}
            label={t('auth.login.email')}
            name="email"
          />
          <InputFormField
            required
            control={form.control}
            inputProps={{ type: 'password' }}
            name="password"
            customLabel={
              <div className="flex items-center">
                <FormLabel required>{t('auth.login.password')}</FormLabel>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  href="/auth/forgot-password"
                  tabIndex={-1}
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
            }
          />
          <FormError />
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('auth.login.login')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                {t('auth.login.continueWith')}
              </span>
            </div>
          </div>
          <ProviderButton
            disabled={form.formState.isSubmitting}
            provider="github"
          >
            <GithubBulk className="mr-2 size-5" />
            {t('auth.login.github')}
          </ProviderButton>
        </form>
      </Form>
      <div className="animate-in fade-in fill-mode-both text-center text-sm delay-500 duration-1000">
        {t('auth.login.dontHaveAccount')}{' '}
        <Link className="underline" href="/auth/signup">
          {t('auth.login.signUp')}
        </Link>
      </div>
    </>
  )
}
