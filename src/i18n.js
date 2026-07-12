export const LOCALE_LABELS = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
};

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.download': 'Download',
    'nav.shop': 'Shop',
    'nav.plans': 'Plans',
    'nav.portal': 'Portal',
    'brand.title': 'Thothcraft',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.features': 'الميزات',
    'nav.download': 'تحميل',
    'nav.shop': 'المتجر',
    'nav.plans': 'الخطط',
    'nav.portal': 'المدخل',
    'brand.title': 'ثوثكرافت',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.features': 'Fonctionnalités',
    'nav.download': 'Télécharger',
    'nav.shop': 'Boutique',
    'nav.plans': 'Plans',
    'nav.portal': 'Portail',
    'brand.title': 'Thothcraft',
  },
};

const RTL_LOCALES = ['ar'];

export function useI18n() {
  const locale = localStorage.getItem('locale') || 'en';
  
  function t(key) {
    return translations[locale]?.[key] || translations.en[key] || key;
  }
  
  function setLocale(newLocale) {
    localStorage.setItem('locale', newLocale);
    window.location.reload();
  }
  
  function isRTL() {
    return RTL_LOCALES.includes(locale);
  }
  
  return { locale, t, setLocale, isRTL, LOCALE_LABELS };
}
