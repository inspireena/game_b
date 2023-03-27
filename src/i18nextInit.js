import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// import Backend from "i18next-xhr-backend";
import Backend from "i18next-http-backend"

import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./assets/locales/en/translation.json";
import translationHD from "./assets/locales/hd/translation.json";
import translationKR from "./assets/locales/kr/translation.json";
import translationJA from "./assets/locales/ja/translation.json";
import { initReactI18next } from "react-i18next";

const fallbackLng = ["en"];
const availableLanguages = ["en", "hd", "kr","ja"];

const resources = {
  en: {
    translation: translationEN
  },
  hd: {
    translation: translationHD
  },
  kr: {
    translation: translationKR
  },
  ja:{
    translation :translationJA
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
