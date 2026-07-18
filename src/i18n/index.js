import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./translations/en.json";
import translationMR from "./translations/mr.json";
import translationHI from "./translations/hi.json";
import translationGU from "./translations/gu.json";

const resources = {
  en: {
    translation: translationEN,
  },
  mr: {
    translation: translationMR,
  },
  hi: {
    translation: translationHI,
  },
  gu: {
    translation: translationGU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
