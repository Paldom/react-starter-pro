'use client'

import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import { type Locale, defaultLocale, locales } from './config'

const runsOnServerSide = typeof window === 'undefined'

void i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng: undefined,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns: 'common',
    preload: runsOnServerSide ? locales : [],
    interpolation: {
      escapeValue: false,
    },
  })

type Namespace = Parameters<typeof useTranslationOrg>[0]

export function useTranslation(lng: Locale = defaultLocale, ns: Namespace = 'common') {
  const ret = useTranslationOrg(ns)
  const { i18n } = ret
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return
    setActiveLng(i18n.resolvedLanguage)
  }, [activeLng, i18n.resolvedLanguage])

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    void i18n.changeLanguage(lng)
  }, [lng, i18n])

  return ret
}
