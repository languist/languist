'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@languist/ui/button'
import { Form, FormLabel } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useI18n } from '@/locales/client'

import { passwordAuthFormSchema } from './schema'
import type { PasswordAuthFormValues } from './schema'

export function LoginForm() {
  const t = useI18n()

  const form = useForm<PasswordAuthFormValues>({
    resolver: zodResolver(passwordAuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: PasswordAuthFormValues) {
    // eslint-disable-next-line no-console
    console.log(values)
  }

  return (
    <>
      <Logo className="mx-auto" size="lg" spin={form.formState.isSubmitting} />
      <h1 className="text-center text-3xl font-semibold">
        {t('auth.login.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.login.description')}
      </div>
      <Form {...form}>
        <form
          className="space-y-4 px-2 py-4"
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
                  href="/forgot-password"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
            }
          />
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
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="button"
            variant="outline"
          >
            <IconBrandGithub className="mr-2 size-4" />
            {t('auth.login.github')}
          </Button>
          <div className="mt-4 text-center text-sm">
            {t('auth.login.dontHaveAccount')}{' '}
            <Link className="underline" href="/signup">
              {t('auth.login.signUp')}
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
