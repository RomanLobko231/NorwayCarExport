import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCommon from "./locales/en/common.json";
import enStartsteps from "./locales/en/startsteps.json";
import enFaqs from "./locales/en/faqs.json";
import noCommon from "./locales/no/common.json";
import noStartsteps from "./locales/no/startsteps.json";
import noFaqs from "./locales/no/faqs.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, startsteps: enStartsteps, faqs: enFaqs },
      no: { common: noCommon, startsteps: noStartsteps, faqs: noFaqs },
    },
    fallbackLng: "no",
    interpolation: {
      escapeValue: false,
    },
    ns: ["common", "startsteps", "faqs"],
    defaultNS: "common",
  });

export default i18n;
