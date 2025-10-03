import { useQueryClient } from '@tanstack/react-query'
import {
  useGetUserSettings,
  useUpdateUserSettings,
  getGetUserSettingsQueryKey,
} from '@/shared/api/generated/settings/settings'
import type { UserSettings } from '@/shared/api/generated/models'

export function useUserSettingsQuery() {
  return useGetUserSettings()
}

export function useUpdateUserSettingsMutation() {
  const queryClient = useQueryClient()
  const mutation = useUpdateUserSettings({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getGetUserSettingsQueryKey(),
        })
      },
    },
  })

  return {
    ...mutation,
    mutate: (data: UserSettings) => mutation.mutate({ data }),
    mutateAsync: (data: UserSettings) => mutation.mutateAsync({ data }),
  }
}