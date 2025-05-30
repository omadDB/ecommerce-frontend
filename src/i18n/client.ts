'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations directly
import uzHome from '../../locales/uz-CYRL/home.json';
import ruHome from '../../locales/ru/home.json';
import enHome from '../../locales/en/home.json';

const resources = {
  'uz-CYRL': {
    home: uzHome,
  },
  'uz-Cyrl': {
    home: uzHome,
  },
  uz: {
    home: uzHome,
  },
  ru: {
    home: ruHome,
  },
  en: {
    home: enHome,
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: 'uz-CYRL',
  fallbackLng: ['uz-CYRL', 'uz'],
  supportedLngs: ['uz-CYRL', 'uz-Cyrl', 'uz', 'ru', 'en'],
  defaultNS: 'home',
  fallbackNS: 'home',
  ns: ['home'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  load: 'all',
  preload: ['uz-CYRL', 'uz-Cyrl', 'uz', 'ru', 'en'],
  keySeparator: false,
  nsSeparator: false,
  returnNull: false,
  returnEmptyString: false,
  returnObjects: true,
  partialBundledLanguages: true,
  debug: true,
  saveMissing: true,
  missingKeyHandler: (lng, ns, key) => {
    console.warn(`Missing translation key: ${key} for language: ${lng}`);
  },
});

export default i18n;
