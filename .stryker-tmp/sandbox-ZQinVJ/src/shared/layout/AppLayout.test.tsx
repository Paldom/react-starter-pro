// @ts-nocheck
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './AppLayout'

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Test Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('AppLayout', () => {
  it('renders header', () => {
    renderWithRouter()
    expect(screen.getByText('React Advanced App')).toBeInTheDocument()
  })

  it('renders sidebar navigation', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('renders child routes via Outlet', () => {
    renderWithRouter()
    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })
})