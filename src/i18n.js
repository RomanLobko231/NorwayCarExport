import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detects user's language preference
  .use(initReactI18next) // Enables hooks and HOCs
  .init({
    resources: {
      en: {
        translation: {
          welcome_to: "Welcome to",
          trading: "stress-free trading",
          of_car: "for your car",
          buy_car: "BUY A CAR",
          sell_car: "SELL A CAR",
          or: "or",
          moto: "We make it simple for you",
          get_started: "GET STARTED",
          three_steps: "Sell your car in 3 easy steps",
          latest_bids: "LATEST BIDS",
          check_out: "Check what's available now",
          register_user: "Register user",
          login: "Login",
          all_cars: "All cars",
          title_step_1: "Send application",
          title_step_2: "Wait for the answer",
          title_step_3: "Your car is sold!",
          body_step_1:
            "First, you have to send us an application in which you fill in your details, for example the car's registration number and your personal details.",
          body_step_2:
            "After your application has been approved, your car will become available for sale to dealers. You will receive a message from us when this happens",
          body_step_3:
            "Congratulations! When the auction is over and the dealer is ready to buy the car, we will contact you",
          changeLanguage: "Change Language",
        },
      },
      no: {
        translation: {
          welcome_to: "Velkommen til",
          trading: "stressfri handel",
          of_car: "for bilen din",
          buy_car: "KJØPE BIL",
          sell_car: "SELGE BIL",
          or: "eller",
          moto: "Vi gjør det enkelt for deg",
          get_started: "KOM I GANG",
          three_steps: "Selg bilen din på 3 enkle steg",
          latest_bids: " NYESTE BUD",
          check_out: "Sjekk hva som er tilgjelgelig nå",
          register_user: "Registrer bruker",
          login: "Logg inn",
          all_cars: "Alle biler",
          title_step_1: "Send søknad",
          title_step_2: "Vent på et svar",
          title_step_3: "Bilen er solgt!",
          body_step_1:
            "Først må du sende en søknad til oss der du fyller ut flere opplysninger, bl.a. bilens registrasjonr. og din personalia",
          body_step_2:
            "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhandlere. Du får en melding fra oss når dette skjer",
          body_step_3:
            "Gratulerer! Når auksjonen er ferdig og forhandler er klar til kjøp, tar vi kontakt med deg",
          changeLanguage: "Bytt språk",
        },
      },
    },
    fallbackLng: "no", // Default language
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
