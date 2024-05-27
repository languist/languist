'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { createOrganizationAction } from '@languist/queries'
import { AuthError } from '@languist/supabase/auth'
import { Button } from '@languist/ui/button'
import { Card, CardContent } from '@languist/ui/card'
import { Form, FormError } from '@languist/ui/form'
import { InputFormField } from '@languist/ui/form-field'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useI18n } from '@/locales/client'
import type { ANY } from '@/modules/common/any'
import { slugify } from '@/modules/common/utils/slugify'

import type { CreateWorkspaceFormValues } from '../schema'
import { createWorkspaceFormSchema } from '../schema'

const URL_PREFIX = 'languist.net/'

export function CreateWorkspaceForm() {
  const t = useI18n()
  const router = useRouter()

  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceFormSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  })

  const name = form.watch('name')

  useEffect(() => {
    if (slugify(name)?.length < 32) {
      form.setValue('slug', slugify(name))
    }
  }, [form, name])

  async function onSubmit(values: CreateWorkspaceFormValues) {
    try {
      const result = await createOrganizationAction(values)
      if (result?.slug) {
        router.push(`/${result.slug}`)
        toast.success(t('workspace.create.success.toastTitle'), {
          description: t('workspace.create.success.toastDescription'),
        })
      } else {
        throw new Error(t('common.error'))
      }
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        form.setError('root', { message: error.message })
      } else {
        form.setError('root', {
          message: (error as ANY)?.message || t('common.error'),
        })
      }
    }
  }

  return (
    <>
      <h1 className="animate-in fade-in fill-mode-both text-center text-3xl font-semibold delay-0 duration-1000">
        {t('workspace.create.title')}
      </h1>
      <div className="text-muted-foreground fill-mode-both animate-in fade-in text-pretty text-center delay-100 duration-1000">
        {t('workspace.create.description')}
      </div>
      <Form {...form}>
        <form
          className="flex w-full flex-col space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card className="animate-in fade-in fill-mode-both delay-200 duration-1000">
            <CardContent className="space-y-4 pt-4">
              <InputFormField
                required
                control={form.control}
                label={t('workspace.create.name')}
                name="name"
                inputProps={{
                  autoFocus: true,
                }}
              />
              <InputFormField
                required
                control={form.control}
                label={t('workspace.create.slug')}
                name="slug"
                addon={
                  <div className="text-muted-foreground absolute left-2 top-2 text-sm">
                    {URL_PREFIX}
                  </div>
                }
                inputProps={{
                  className: 'pl-[92px]',
                }}
                rules={{
                  required: true,
                  pattern: /^[a-z0-9-]+$/,
                }}
              />
            </CardContent>
          </Card>
          <FormError />
          <Button
            className="animate-in fade-in fill-mode-both w-full max-w-72 self-center delay-300 duration-1000"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {t('workspace.create.create')}
          </Button>
        </form>
      </Form>
    </>
  )
}
