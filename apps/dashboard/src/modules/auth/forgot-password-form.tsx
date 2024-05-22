"use client"

import { Logo } from "@languist/ui/logo";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormValues, forgotPasswordFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@languist/ui/form";
import { InputFormField } from "@languist/ui/form-field";
import { Button } from "@languist/ui/button";
import Link from "next/link";
import { useI18n } from "@/locales/client";

export function ForgotPasswordForm() {
  const t = useI18n()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: ForgotPasswordFormValues) {
    console.log(values)
  }

  return (
    <>
      <Logo className="mx-auto" size='lg' spin={form.formState.isSubmitting} />
      <h1 className="text-center text-3xl font-semibold">
        {t('auth.forgotPassword.title')}
      </h1>
      <div className="text-muted-foreground text-pretty text-center">
        {t('auth.forgotPassword.description')}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-2">
          <InputFormField
            name="email"
            label={t('auth.forgotPassword.email')}
            control={form.control}
            required
          />
          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            {t('auth.forgotPassword.sendResetLink')}
          </Button>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              {t('auth.forgotPassword.backToLogin')}
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
