import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import translationEN from './translations/en.json';
import translationMR from './translations/mr.json';

const resources = {
	en: {
		translation: translationEN
	},
	mr: {
		translation: translationMR
	}
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: "en",
		keySeparator: false,
		interpolation: {
			escapeValue: false
		}
	});

export {i18n};