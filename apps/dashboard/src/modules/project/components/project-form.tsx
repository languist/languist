import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentUser } from '@languist/auth'
import { useCreateProject } from '@languist/queries'
import { Button } from '@languist/ui/button'
import { Form, FormError } from '@languist/ui/form'
import { InputFormField, SelectFormField } from '@languist/ui/form-field'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useI18n } from '@/locales/client'
import type { ANY } from '@/modules/common/any'

import { projectFormSchema } from '../schema'
import type { ProjectFormValues } from '../schema'
import { languages } from '@/modules/common/languages'

export function ProjectForm({
  organizationId,
  onCompleted,
}: {
  organizationId: string
  onCompleted?: () => void
}) {
  const t = useI18n()

  const { mutateAsync } = useCreateProject()
  const user = useCurrentUser()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      sourceLanguage: 'en',
    },
  })

  async function onSubmit(values: ProjectFormValues) {
    try {
      const result = await mutateAsync({
        name: values.name,
        source_language: values.sourceLanguage,
        organization_id: organizationId,
        user_id: user?.id!,
      })
      if (result?.id) {
        toast.success(t('project.create.success.toastTitle'), {
          description: t('project.create.success.toastDescription'),
        })
        form.reset()
        onCompleted?.()
      } else {
        throw new Error(t('common.error'))
      }
    } catch (error: unknown) {
      form.setError('root', {
        message: (error as ANY)?.message || t('common.error'),
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputFormField
          required
          control={form.control}
          label={t('project.create.name')}
          name="name"
        />
        <SelectFormField
          required
          control={form.control}
          label={t('project.create.sourceLanguage')}
          name="sourceLanguage"
          options={languages.map((language) => ({
            value: language.code,
            label: language.name,
          }))}
        />
        <FormError />
        <Button
          className="self-end"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {t('project.create.create')}
        </Button>
      </form>
    </Form>
  )
}
