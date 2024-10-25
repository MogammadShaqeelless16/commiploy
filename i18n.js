// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your language JSON files
import en from './languages/en.json';
import afri from './languages/afri.json';
import zu from './languages/zu.json';
import xh from './languages/xh.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      af: { translation: afri },
      zu: { translation: zu },
      xh: { translation: xh },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language in case the selected one is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
