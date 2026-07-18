import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation imports
import translationEN from './translations/en.json';
import translationMR from './translations/mr.json';
import translationHi from './translations/hi.json';
import translationTA from './translations/ta.json';

// Language resource object
const resources = {
  en: { translation: translationEN },
  mr: { translation: translationMR },
  hi: { translation: translationHi },
  ta: { translation: translationTA }
};

// Check localStorage for saved language, fallback to 'en'
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,        // <- detect from localStorage
    fallbackLng: "en",         // <- fallback if language not found
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
