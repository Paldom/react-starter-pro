import { getDashboardMock } from '@/shared/api/generated/dashboard/dashboard.msw'
import {
  getGetUserSettingsMockHandler,
  getUpdateUserSettingsMockHandler,
} from '@/shared/api/generated/settings/settings.msw'
import type { UserSettings } from '@/shared/api/generated/models'

export const handlers = [
  ...getDashboardMock(),
  getGetUserSettingsMockHandler(),
  getUpdateUserSettingsMockHandler(async (info) => {
    const body = (await info.request.json()) as UserSettings
    return body
  }),
]