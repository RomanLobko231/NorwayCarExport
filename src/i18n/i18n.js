import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCommon from "./locales/en/common.json";
import enStartsteps from "./locales/en/startsteps.json";
import enFaqs from "./locales/en/faqs.json";
import enMeta from "./locales/en/meta.json";
import enUser from "./locales/en/user.json";
import enCar from "./locales/en/car.json";
import noCommon from "./locales/no/common.json";
import noStartsteps from "./locales/no/startsteps.json";
import noFaqs from "./locales/no/faqs.json";
import noMeta from "./locales/no/meta.json";
import noUser from "./locales/no/user.json";
import noCar from "./locales/no/car.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        startsteps: enStartsteps,
        faqs: enFaqs,
        meta: enMeta,
        user: enUser,
        car: enCar,
      },
      no: {
        common: noCommon,
        startsteps: noStartsteps,
        faqs: noFaqs,
        meta: noMeta,
        user: noUser,
        car: noCar,
      },
    },
    fallbackLng: "no",
    interpolation: {
      escapeValue: false,
    },
    ns: ["common", "startsteps", "faqs", "meta", "user", "car"],
    defaultNS: "common",
  });

export default i18n;
