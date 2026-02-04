import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app/App'
import i18n from './i18n'
import './index.css'
import type { SetupWorker } from 'msw/browser'

type BrowserMocksModule = { worker: SetupWorker }

async function enableMocks() {
  if (!import.meta.env.DEV) {
    return
  }

  const enableMocksFlag = import.meta.env.VITE_ENABLE_MOCKS
  const shouldEnableMocks =
    enableMocksFlag === undefined ? true : enableMocksFlag === 'true'

  if (!shouldEnableMocks) {
    return
  }

  const mocksModule = (await import('@/mocks/browser')) as BrowserMocksModule
  await mocksModule.worker.start({ onUnhandledRequest: 'bypass' })
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

await enableMocks()

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>{i18n.t('common.loadingTranslations')}</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
)
