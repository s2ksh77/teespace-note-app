import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ko, en } from './index';

const resources = {
    ko: { translation: ko },
    en: { translation: en },
};

const initI18n = (lang = 'ko') => {
    return i18n.use(initReactI18next).init({
        resources,
        lng: lang,
        keySeparator: false,
        interpolation: { escapeValue: false },
    });
};

export { initI18n };