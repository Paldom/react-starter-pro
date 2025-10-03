import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

void i18n
  .use(HttpBackend) // load /locales/{{lng}}/{{ns}}.json over HTTP
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // bind i18next to React
  .init({
    // what languages you actually ship:
    supportedLngs: ['en', 'hu'],
    fallbackLng: 'en',

    // where JSON files live
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // reduce 404s like /en-US/... if you only serve plain 'en' or 'hu'
    load: 'languageOnly',

    // default namespace
    ns: ['common'],
    defaultNS: 'common',

    // useful while wiring things up
    debug: import.meta.env.MODE === 'development',

    // not needed for React; it already escapes
    interpolation: { escapeValue: false },
  })

// Export for TypeScript
export const defaultNS = 'common'
export const resources = {
  en: {
    common: {
      app: { title: '' },
      nav: { dashboard: '', settings: '' },
      dashboard: {
        title: '',
        subtitle: '',
        loading: '',
        error: '',
        totalRevenue: '',
        subscriptions: '',
        sales: '',
        activeUsers: '',
        monthlyOverview: '',
      },
      settings: {
        title: '',
        subtitle: '',
        loading: '',
        loadError: '',
        profileSettings: '',
        name: '',
        email: '',
        notifications: '',
        validation: {
          nameRequired: '',
          emailInvalid: '',
        },
        updateSuccess: '',
        updateError: '',
        saveChanges: '',
        saving: '',
      },
      common: {
        loading: '',
        error: '',
      },
    },
  },
} as const

export { default } from 'i18next'
