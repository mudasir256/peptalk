import { initReactI18next } from 'react-i18next';
import enTranslations from '../../../assets/locales/en.json'
import i18next from 'i18next';

export const languageResources = {
    en: {
        translation: enTranslations,
    },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng:'en',
  fallbackLng: 'en',
  resources: languageResources
})

export default i18next;
