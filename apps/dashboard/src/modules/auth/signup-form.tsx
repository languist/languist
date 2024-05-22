'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@languist/ui/button'
import { Form } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { Logo } from '@languist/ui/logo'
import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useI18n } from '@/locales/client'

import { passwordAuthFormSchema } from './schema'
import type { PasswordAuthFormValues } from './schema'

export function SignUpForm() {
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
        {t('auth.signup.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.signup.description')}
      </div>
      <Form {...form}>
        <form
          className="space-y-4 px-2 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputFormField
            required
            control={form.control}
            label={t('auth.signup.email')}
            name="email"
          />
          <InputFormField
            required
            control={form.control}
            inputProps={{ type: 'password' }}
            label={t('auth.signup.password')}
            name="password"
          />
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('auth.signup.signUp')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                {t('auth.signup.continueWith')}
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
            {t('auth.signup.github')}
          </Button>
          <div className="mt-4 text-center text-sm">
            {t('auth.signup.haveAccount')}{' '}
            <Link className="underline" href="/login">
              {t('auth.signup.signIn')}
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
