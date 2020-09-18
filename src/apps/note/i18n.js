import React from 'react';
import Backend from 'i18next-http-backend';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    initImmediate: false,
    lng: 'kr',
    debug: true,
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/note/{{lng}}.json',
    },
  });

export default i18next;
