import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import zh from './lang/zh.json'

export const resources = {
  en: { translation: en },
  zh: { translation: zh },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
