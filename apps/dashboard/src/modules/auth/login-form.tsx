"use client"

import { Logo } from "@languist/ui/logo";
import { useForm } from "react-hook-form";
import { PasswordAuthFormValues, passwordAuthFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormLabel } from "@languist/ui/form";
import { InputFormField } from "@languist/ui/form-field";
import { Button } from "@languist/ui/button";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { useI18n } from "@/locales/client";

export function LoginForm() {
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
        {t('auth.login.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.login.description')}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-2">
          <InputFormField
            name="email"
            label={t('auth.login.email')}
            control={form.control}
            required
          />
          <InputFormField
            name="password"
            control={form.control}
            required
            inputProps={{ type: 'password' }}
            customLabel={
              <div className="flex items-center">
                <FormLabel required>
                  {t('auth.login.password')}
                </FormLabel>
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
            }
          />
          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            {t('auth.login.login')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('auth.login.continueWith')}
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" className="w-full" disabled={form.formState.isSubmitting}>
            <IconBrandGithub className="mr-2 size-4" />
            {t('auth.login.github')}
          </Button>
          <div className="mt-4 text-center text-sm">
            {t('auth.login.dontHaveAccount')}{" "}
            <Link href="/signup" className="underline">
              {t('auth.login.signUp')}
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
