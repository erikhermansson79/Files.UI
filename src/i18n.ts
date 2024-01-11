import { createInstance } from 'i18next';

const i18n = createInstance({
  fallbackLng: 'en',
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  resources: {
    en: {
      translation: {
        "previous": "Previous",
        "next": "Next",
        "ago": "ago",
        "close": "Close"
      },
    },
    sv: {
      translation: {
        "previous": "F�reg�ende",
        "next": "N�sta",
        "ago": "sedan",
        "close": "St�ng"
      },
    },
  },
});

i18n.init();

export default i18n;