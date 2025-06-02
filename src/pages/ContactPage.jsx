import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import {
  MdAlternateEmail,
  MdEmail,
  MdOutlineEmail,
  MdOutlineSupportAgent,
  MdPhone,
} from "react-icons/md";
import { PiSealQuestion } from "react-icons/pi";
import { LiaQuestionCircle } from "react-icons/lia";

const ContactPage = () => {
  const { t } = useTranslation(["common", "meta"]);
  return (
    <>
      <Helmet>
        <html lang={t("langCode", { ns: "meta" })} />
        <title>{t("contactTitle", { ns: "meta" })}</title>
        <meta
          name="description"
          content={t("contactDescription", { ns: "meta" })}
        />
        <meta name="keywords" content={t("contactKeywords", { ns: "meta" })} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={t("contactTitle", { ns: "meta" })} />
        <meta
          property="og:description"
          content={t("contactDescription", { ns: "meta" })}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content="https://norwaycarexport.no/nce_logo.png"
        />
      </Helmet>
      <div className="flex max-w-5xl flex-col items-center justify-center px-4 pt-24 md:pt-28">
        <h1 className="inline-block bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-center text-2xl font-bold leading-[2.8rem] text-transparent md:text-4xl md:leading-[4rem]">
          {t("contactTitle", { ns: "meta" })}
        </h1>
        <p className="text-center text-lg font-light text-light-gray">
          {t("contactDescription", { ns: "meta" })}
        </p>

        <div className="my-8 flex w-full flex-row items-center justify-center gap-6 md:my-16">
          <MdPhone className="mb-40 hidden h-12 w-auto text-swamp-300/50 md:block" />
          <MdOutlineEmail className="mb-24 hidden h-28 w-auto text-swamp-300 md:block" />
          <MdOutlineSupportAgent className="h-40 w-auto text-swamp-500 md:h-56" />
          <MdOutlineEmail className="mb-24 hidden h-28 w-auto text-swamp-300 md:block" />
          <MdPhone className="mb-40 hidden h-12 w-auto text-swamp-300/50 md:block" />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <div className="flex flex-col items-center">
            <p className="mb-2 text-sm font-medium text-light-gray md:text-base">
              {t("phone_number")}
            </p>
            <div className="flex flex-row items-center gap-4 rounded-lg border border-dashed border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud px-4 py-2 text-lg font-semibold text-medium-gray md:text-xl">
              <MdPhone />
              +4799484994
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-sm font-medium text-light-gray md:text-base">
              {t("email")}
            </p>
            <div className="flex flex-row items-center gap-4 rounded-lg border border-dashed border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud px-4 py-2 text-lg font-semibold text-medium-gray md:text-xl">
              <MdAlternateEmail />
              post@norwaycarexport.no
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
