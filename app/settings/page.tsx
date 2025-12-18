'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from '@/i18n/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'
import { useUserSettingsQuery, useUpdateUserSettingsMutation } from '@/features/settings/hooks/use-settings'

const settingsSchema = z.object({
  name: z.string().min(1, 'settings.validation.nameRequired'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'settings.validation.emailInvalid'),
  notifications: z.boolean(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function SettingsPage() {
  const { t } = useTranslation()

  const settingsQuery = useUserSettingsQuery()
  const updateMutation = useUpdateUserSettingsMutation()
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    mode: 'onSubmit',
  })

  const nameError = errors.name?.message
  const emailError = errors.email?.message

  useEffect(() => {
    if (settingsQuery.data) {
      reset(settingsQuery.data)
    }
  }, [settingsQuery.data, reset])

  const onSubmit = async (data: SettingsFormData) => {
    setSubmissionError(null)

    try {
      await updateMutation.mutateAsync(data)
    } catch (error) {
      console.error('Failed to update settings', error)
      setSubmissionError(t('settings.updateError'))
    }
  }

  if (settingsQuery.isPending) {
    return (
      <section className="p-8">
        <p>{t('settings.loading')}</p>
      </section>
    )
  }

  if (settingsQuery.isError) {
    return (
      <section className="p-8">
        <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
          {t('settings.loadError')}
        </div>
      </section>
    )
  }

  return (
    <section className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </header>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{t('settings.profileSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t('settings.name')}
              </label>
              <Input id="name" {...register('name')} />
              {nameError && (
                <p className="mt-1 text-sm text-destructive">
                  {t(nameError as never)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('settings.email')}
              </label>
              <Input id="email" {...register('email')} />
              {emailError && (
                <p className="mt-1 text-sm text-destructive">
                  {t(emailError as never)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="notifications"
                type="checkbox"
                {...register('notifications')}
                className="h-4 w-4"
              />
              <label htmlFor="notifications" className="text-sm font-medium">
                {t('settings.notifications')}
              </label>
            </div>

            {submissionError && (
              <div
                role="alert"
                className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive"
              >
                {submissionError}
              </div>
            )}

            {updateMutation.isSuccess && (
              <output className="block rounded-md border border-primary bg-primary/10 p-3 text-sm text-primary">
                {t('settings.updateSuccess')}
              </output>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || updateMutation.isPending}
              className="w-full"
            >
              {isSubmitting || updateMutation.isPending ? t('settings.saving') : t('settings.saveChanges')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
