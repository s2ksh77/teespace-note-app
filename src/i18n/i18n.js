import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './ko/translation';
import en from './en/translation';

const resources = {
    ko: { translation: ko },
    en: { translation: en },
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
    debug: true,
    resources,
    lng: 'ko',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    keySeparator: false,
    interpolation: { escapeValue: false },
    react: {
        useSuspense: false,
    },

});

export default i18n;