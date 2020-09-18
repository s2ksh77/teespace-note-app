import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './lang/en.json';
import translationKO from './lang/ko.json';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ko: {
      translation: translationKO,
    },
  },
  initImmediate: false,
  lng: 'ko',
  fallbackLng: 'ko',
  debug: true,
  react: {
    useSuspense: false,
  },
});

export default i18next;
