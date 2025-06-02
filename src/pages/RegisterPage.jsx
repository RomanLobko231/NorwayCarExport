import { useTranslation } from "react-i18next";
import RegisterBuyer from "../ui/users/buyer/RegisterBuyer";
import RegisterSeller from "../ui/users/seller/RegisterSeller";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
  const { t } = useTranslation(["common", "meta"]);

  return (
    <>
      <Helmet>
        <html lang={t("langCode", { ns: "meta" })} />
        <title>{t("regTitle", { ns: "meta" })}</title>
        <meta
          name="description"
          content={t("regDescription", { ns: "meta" })}
        />
        <meta name="keywords" content={t("regKeywords", { ns: "meta" })} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={t("regTitle", { ns: "meta" })} />
        <meta
          property="og:description"
          content={t("regDescription", { ns: "meta" })}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content="https://norwaycarexport.no/nce_logo.png"
        />
      </Helmet>
      <div className="flex w-full flex-col items-center px-4 pt-28 md:px-0 md:pt-28">
        <h1 className="mb-3 text-center text-2xl font-semibold text-medium-gray md:mb-7 md:text-4xl">
          {t("register_as")}
        </h1>
        <div className="scroll relative flex h-9 w-9 animate-down items-center justify-center rounded-full border-2 border-medium-gray md:hidden">
          <div className="absolute left-3 top-3 h-2 w-2 rotate-[-45deg] border-b-2 border-l-2 border-medium-gray"></div>
        </div>
        <div className="mt-12 flex w-full flex-row flex-wrap items-baseline justify-center gap-9">
          <div className="flex flex-col items-center">
            <img
              src="../icons/car_sold.png"
              className="h-[150px] w-auto animate-fade-in-fast object-contain"
            />
            <p className="mb-3 mt-5 text-center text-lg font-normal text-medli-gray">
              {t("sell_to_buyers")}
            </p>
            <RegisterSeller />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../icons/auction.png"
              className="h-[150px] w-auto animate-fade-in-fast object-contain"
            />
            <p className="mb-3 mt-5 text-center text-lg font-normal text-medli-gray">
              {t("get_access_to_auctions")}
            </p>
            <RegisterBuyer />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
