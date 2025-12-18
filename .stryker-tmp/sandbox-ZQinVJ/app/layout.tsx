// @ts-nocheck
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/shared/layout/Header'
import { SideNav } from '@/shared/layout/SideNav'
import { QueryClientProviderWithClient } from '@/app/providers/query-client-provider'
import { MSWProvider } from '@/mocks/msw-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'React Advanced App',
  description: 'A full-stack Next.js application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MSWProvider>
          <QueryClientProviderWithClient>
            <div className="flex min-h-screen bg-background text-foreground">
              <SideNav />
              <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </QueryClientProviderWithClient>
        </MSWProvider>
      </body>
    </html>
  )
}
