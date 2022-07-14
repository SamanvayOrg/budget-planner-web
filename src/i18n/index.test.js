import {t} from "i18next";
import {i18n} from "./index";

describe('translation', () => {

	it('should get default translations', () => {
		i18n.changeLanguage('mr');

		expect(t('Welcome to React')).toBe('React मध्ये आपले स्वागत आहे');
	});

	it('should add new resources', () => {
		i18n.addResources('mr', 'translation', {municipality: 'abc'});
		i18n.changeLanguage('mr');

		expect(t('municipality')).toBe('abc');
		expect(t('Welcome to React')).toBe('React मध्ये आपले स्वागत आहे');
	});
});