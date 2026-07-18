import { i18n } from './index';

describe('translation', () => {
  beforeEach(() => {
    // Reset language before each test to avoid state leakage
    i18n.changeLanguage('en');
  });

  it('should get default translations', () => {
    i18n.changeLanguage('mr');
    expect(i18n.t('Welcome to React')).toBe('React मध्ये आपले स्वागत आहे');
  });

  it('should add new resources', () => {
    i18n.addResources('mr', 'translation', { municipality: 'abc' });
    i18n.changeLanguage('mr');

    expect(i18n.t('municipality')).toBe('abc');
    expect(i18n.t('Welcome to React')).toBe('React मध्ये आपले स्वागत आहे');
  });
});
