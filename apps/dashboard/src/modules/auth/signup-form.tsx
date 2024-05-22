"use client"

import { Logo } from "@languist/ui/logo";
import { useForm } from "react-hook-form";
import { PasswordAuthFormValues, passwordAuthFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@languist/ui/form";
import { InputFormField } from "@languist/ui/form-field";
import { Button } from "@languist/ui/button";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { useI18n } from "@/locales/client";

export function SignUpForm() {
  const t = useI18n()

  const form = useForm<PasswordAuthFormValues>({
    resolver: zodResolver(passwordAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: PasswordAuthFormValues) {
    console.log(values)
  }

  return (
    <>
      <Logo className="mx-auto" size='lg' spin={form.formState.isSubmitting} />
      <h1 className="text-center text-3xl font-semibold">
        {t('auth.signup.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.signup.description')}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-2">
          <InputFormField
            name="email"
            label={t('auth.signup.email')}
            control={form.control}
            required
          />
          <InputFormField
            name="password"
            label={t('auth.signup.password')}
            control={form.control}
            required
            inputProps={{ type: 'password' }}
          />
          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            {t('auth.signup.signUp')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('auth.signup.continueWith')}
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" className="w-full" disabled={form.formState.isSubmitting}>
            <IconBrandGithub className="mr-2 size-4" />
            {t('auth.signup.github')}
          </Button>
          <div className="mt-4 text-center text-sm">
            {t('auth.signup.haveAccount')}{' '}
            <Link href="/login" className="underline">
              {t('auth.signup.signIn')}
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
