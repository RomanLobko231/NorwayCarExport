import { useNavigate } from "react-router-dom";
import InfoList from "../ui/InfoList";
import InfoCard from "../ui/InfoList";
import RegisterSellerModal from "../ui/seller/SellerModal";
import { useState } from "react";
import RegisterBuyerModal from "../ui/buyer/BuyerModal";
import SellerModal from "../ui/seller/SellerModal";
import BuyerModal from "../ui/buyer/BuyerModal";
import CarCardBlurred from "../ui/car/CarCardBlurred";

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

  return (
    <div className="flex flex-col items-center justify-center pt-28 md:pt-40">
      <h1 className="mx-6 w-4/5 animate-fade-in-slow text-center text-4xl font-normal text-medium-gray md:mx-0 md:text-6xl">
        Velkommen til{" "}
        <span className="inline-block bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text font-bold text-transparent">
          stressfri handel
        </span>{" "}
        for bilen din
      </h1>
      <img
        className="gradv md:gradvh mt-8 h-[155px] w-full animate-fade-in-fast object-cover object-center opacity-0 md:h-[300px] lg:h-[340px]"
        src="../carhero.jpg"
        alt=""
      />
      <p className="text-center text-2xl font-light text-light-gray">
        Vi gjør det enkelt for deg
      </p>
      <div className="mt-2 flex flex-col items-center pt-4 md:flex-row md:space-x-10">
        <button
          onClick={() => {
            setSellerModalOpen(true);
          }}
          className="buttonsh hover:button_shadow_hover active:button_shadow_click group flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 duration-300 hover:-translate-y-1 hover:from-mirage hover:to-gunmental md:space-x-3 md:rounded-xl md:px-7 md:pb-4"
        >
          <span className="text-2xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-3xl">
            SELGE BIL
          </span>
          <div className="h-[18px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[24px]"></div>
          <img
            src="../icons/sellcar.png"
            alt="Dollar sign"
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </button>
        <span className="my-2 text-center text-sm font-extralight text-light-gray md:text-base">
          eller
        </span>
        <button
          onClick={() => {
            setBuyerModalOpen(true);
          }}
          className="buttonsh hover:button_shadow_hover active:button_shadow_click group flex flex-row items-center space-x-2 rounded-lg border border-light-gray bg-lighthouse px-6 pb-3 pt-3 duration-300 hover:-translate-y-1 md:space-x-3 md:rounded-xl md:px-7 md:pb-4"
        >
          <span className="text-2xl font-semibold leading-4 text-medium-gray md:text-3xl">
            KJØPE BIL
          </span>
          <div className="h-[18px] border-l-2 border-solid border-gunmental md:h-[24px]"></div>
          <img
            src="../icons/buycar.png"
            alt="Dollar sign"
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </button>
      </div>
      <div className="mt-16 flex flex-row items-center space-x-4 md:mt-20">
        <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
        <h1 className="text-center text-2xl font-bold text-medium-gray md:text-4xl">
          KOM I GANG
        </h1>
        <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
      </div>
      <h3 className="text-center text-lg font-extralight text-light-gray md:text-lg">
        Selg bilen din på 3 enkle steg
      </h3>
      <InfoList />
      <div className="mt-12 flex flex-row items-center space-x-4 md:mt-20">
        <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
        <h1 className="text-center text-2xl font-bold text-medium-gray md:text-4xl">
          NYESTE BUD
        </h1>
        <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
      </div>
      <h3 className="text-center text-lg font-extralight text-light-gray md:text-lg">
        Sjekk hva som er tilgjelgelig nå
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
  );
};

export default Home;
