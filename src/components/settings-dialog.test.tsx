import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { SettingsDialog } from './settings-dialog'
import { resetUIStore } from '@/test/utils'

describe('SettingsDialog', () => {
  beforeEach(() => {
    resetUIStore({ settingsDialogOpen: true })
  })

  it('renders the general section by default', () => {
    render(<SettingsDialog />)

    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'General' })).toBeInTheDocument()
    expect(screen.getByText('Theme')).toBeInTheDocument()
  })

  it('switches between sections via the nav', async () => {
    const user = userEvent.setup()
    render(<SettingsDialog />)

    await user.click(screen.getByRole('button', { name: /profile/i }))
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /notifications/i }))
    expect(
      screen.getByRole('heading', { name: 'Notifications' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument()
  })
})
