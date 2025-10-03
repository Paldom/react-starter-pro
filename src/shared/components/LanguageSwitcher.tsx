import { useTranslation } from 'react-i18next'
import { Button } from './Button'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hu', label: 'Magyar' },
  ]

  return (
    <div className="flex gap-2">
      {languages.map(({ code, label }) => (
        <Button
          key={code}
          variant={i18n.resolvedLanguage === code ? 'default' : 'secondary'}
          size="sm"
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
