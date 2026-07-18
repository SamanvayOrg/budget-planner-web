import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import translationEN from './translations/en.json';
import translationMR from './translations/mr.json';
import translationHI from './translations/hi.json';
import translationGU from './translations/gu.json';
import translationTA from './translations/ta.json';
import translationBN from './translations/bn.json';
import translationKN from './translations/kn.json';
import translationTE from './translations/te.json';


const resources = {
  en: { translation: translationEN },
  mr: { translation: translationMR },
  hi: { translation: translationHI },
  gu: { translation: translationGU },
  ta: { translation: translationTA },
  bn: { translation: translationBN },
  kn: { translation: translationKN },
  te: { translation: translationTE }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export { i18n };
