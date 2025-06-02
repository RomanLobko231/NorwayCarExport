import { useNavigate } from "react-router-dom";
import InfoList from "../ui/decorative/InfoList";
import InfoCard from "../ui/decorative/InfoList";
import RegisterSellerModal from "../ui/users/seller/SellerModal";
import { useState } from "react";
import RegisterBuyerModal from "../ui/users/buyer/BuyerModal";
import SellerModal from "../ui/users/seller/SellerModal";
import BuyerModal from "../ui/users/buyer/BuyerModal";
import CarCardBlurred from "../ui/car/CarCardBlurred";
import HeroGallery from "../ui/decorative/HeroGallery";
import { useTranslation } from "react-i18next";
import { LuBadgeEuro } from "react-icons/lu";
import { GiCarKey } from "react-icons/gi";
import FAQList from "../ui/decorative/FAQList";
import { Helmet } from "react-helmet";

const cars = [
  {
    id: "1234",
    imagePaths: ["../toyota_example.jpg"],
    make: "Toyota",
    model: "Landcruiser",
    gearbox: "Manuell",
    engineType: "Diesel",
    kilometers: 134056,
    year: "2003",
    nextEUControl: "11-11-2027",
  },
  {
    id: "12345",
    imagePaths: ["../zoe_example.jpg"],
    make: "Renault",
    model: "Zoe",
    gearbox: "Automat",
    engineType: "Elektrisk",
    kilometers: 75980,
    year: "2021",
    nextEUControl: "23-08-2026",
  },
];

const Home = () => {
  const [sellerModalopen, setSellerModalOpen] = useState(false);
  const [buyerModalopen, setBuyerModalOpen] = useState(false);
  const { t } = useTranslation(["common", "meta"]);

  return (
    <>
      <Helmet>
        <html lang={t("langCode", { ns: "meta" })} />
        <title>{t("mainTitle", { ns: "meta" })}</title>
        <meta
          name="description"
          content={t("mainDescription", { ns: "meta" })}
        />
        <meta name="keywords" content={t("mainKeywords", { ns: "meta" })} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={t("mainTitle", { ns: "meta" })} />
        <meta
          property="og:description"
          content={t("mainDescription", { ns: "meta" })}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content="https://norwaycarexport.no/nce_logo.png"
        />
      </Helmet>
      <div className="flex flex-col items-center justify-center pt-24 md:pt-32">
        <h1 className="mx-6 w-4/5 animate-fade-in-slow text-center text-4xl font-normal text-medium-gray md:mx-0 md:text-6xl">
          {t("welcome_to") + " "}
          <span className="inline-block bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text font-bold leading-[2.8rem] text-transparent md:leading-[5rem]">
            {t("trading")}
          </span>{" "}
          {t("of_car")}
        </h1>
        <HeroGallery />
        <p className="text-center text-lg font-light italic text-light-gray md:text-2xl">
          {t("moto")}
        </p>
        <div className="mt-2 flex flex-col items-center md:flex-row md:space-x-10 md:pt-4">
          <button
            onClick={() => {
              setSellerModalOpen(true);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 text-cornsilk duration-300 hover:-translate-y-1 hover:from-mirage hover:to-gunmental hover:text-lighthouse md:space-x-3 md:px-7 md:pb-4"
          >
            <span className="text-2xl font-semibold leading-4 md:text-3xl">
              {t("sell_car")}
            </span>
            <div className="h-[18px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[24px]"></div>
            <LuBadgeEuro className="h-5 w-auto md:h-7 md:w-auto" />
          </button>
          <span className="my-2 text-center text-sm font-extralight text-light-gray md:text-base">
            {t("or")}
          </span>
          <button
            onClick={() => {
              setBuyerModalOpen(true);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group flex flex-row items-center space-x-2 rounded-lg border border-medium-gray bg-lighthouse px-6 pb-3 pt-3 text-medium-gray duration-300 hover:-translate-y-1 md:space-x-3 md:px-7 md:pb-4"
          >
            <span className="text-2xl font-semibold leading-4 md:text-3xl">
              {t("buy_car")}
            </span>
            <div className="h-[18px] border-l-2 border-solid border-gunmental md:h-[24px]"></div>
            <GiCarKey className="h-5 w-auto md:h-7 md:w-auto" />
          </button>
        </div>
        <div className="mt-16 flex flex-row items-center space-x-4 md:mt-20">
          <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
          <h1 className="text-center text-2xl font-bold text-medium-gray md:text-4xl">
            {t("get_started")}
          </h1>
          <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
        </div>
        <h3 className="text-center text-lg font-extralight text-light-gray md:text-lg">
          {t("three_steps")}
        </h3>
        <InfoList />
        <div className="mt-12 flex flex-row items-center space-x-4 md:mt-20">
          <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
          <h1 className="text-center text-2xl font-bold text-medium-gray md:text-4xl">
            {t("faq")}
          </h1>
          <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
        </div>
        <h3 className="text-center text-lg font-extralight text-light-gray md:text-lg">
          {t("get_answer")}
        </h3>
        <FAQList />
        <div className="mt-12 flex flex-row items-center space-x-4 md:mt-20">
          <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
          <h1 className="text-center text-2xl font-bold text-medium-gray md:text-4xl">
            {t("latest_bids")}
          </h1>
          <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
        </div>
        <h3 className="text-center text-lg font-extralight text-light-gray md:text-lg">
          {t("check_out")}
        </h3>
        <div
          className={`mt-8 flex w-full max-w-7xl flex-col flex-nowrap items-center justify-center gap-4 pb-4 md:flex-row md:flex-wrap md:items-start`}
        >
          {cars.map((car) => (
            <CarCardBlurred carInfo={car} key={car.id} />
          ))}
        </div>

        <SellerModal open={sellerModalopen} setOpen={setSellerModalOpen} />
        <BuyerModal open={buyerModalopen} setOpen={setBuyerModalOpen} />
      </div>
    </>
  );
};

export default Home;
