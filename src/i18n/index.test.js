import {t} from "i18next";
import i18next from "./index";

describe('translation', () => {

	it('should get default translations', () => {
		i18next.changeLanguage('mr');

		expect(t('Welcome to React')).toBe('Marathi translation');
	});

	it('should add new resources', () => {

		i18next.addResources('mr', 'translation', {municipality: 'abc'});
		i18next.changeLanguage('mr');

		expect(t('municipality')).toBe('abc');
		expect(t('Welcome to React')).toBe('Marathi translation');
	});
});