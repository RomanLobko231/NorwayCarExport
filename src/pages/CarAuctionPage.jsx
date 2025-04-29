import { useEffect, useState } from "react";
import ImageCarousel from "../ui/carousel/ImageCarousel";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import CarApiService from "../api/CarApiService";
import { useParams } from "react-router-dom";
import { TbCoins } from "react-icons/tb";
import NumberInputField from "../ui/input/NumberInputField";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { MdOutlineBrightnessAuto, MdOutlineOutbox } from "react-icons/md";
import CarSpecifications from "../ui/auction/CarSpecifications";

const CarAuctionPage = () => {
  const params = useParams();
  const [carData, setCarData] = useState(null);

  const [bidData, setBid] = useState({
    bid: 43000,
    autoBid: 0,
    highestBid: 42000,
    auctionEnd: new Date().toISOString().replace("T", " ").substring(0, 19),
  });

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isAutoBidOpen, setIsAutoBidOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCar(params.id);
  }, []);

  const loadCar = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const carResponse = await CarApiService.getCarById(id);
      setCarData(carResponse.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const biders = [
    {
      num: 1,
      amount: 34000,
      time: new Date()
        .toISOString()
        .replace("T", " ")
        .replaceAll("-", ".")
        .substring(0, 16),
    },
    {
      num: 2,
      amount: 35000,
      time: new Date()
        .toISOString()
        .replace("T", " ")
        .replaceAll("-", ".")
        .substring(0, 16),
    },
    {
      num: 3,
      amount: 36000,
      time: new Date()
        .toISOString()
        .replace("T", " ")
        .replaceAll("-", ".")
        .substring(0, 16),
    },
    {
      num: 2,
      amount: 37000,
      time: new Date()
        .toISOString()
        .replace("T", " ")
        .replaceAll("-", ".")
        .substring(0, 16),
    },
    {
      num: 1,
      amount: 40000,
      time: new Date()
        .toISOString()
        .replace("T", " ")
        .replaceAll("-", ".")
        .substring(0, 16),
    },
    {
      num: 4,
      amount: 42000,
      time: new Date()
        .toISOString()
        .replace("T", " ")
        .replaceAll("-", ".")
        .substring(0, 16),
    },
  ];

  const validateBid = (bid) => {
    return bid % 1000 === 0 && bid > bidData.highestBid;
  };

  return (
    <>
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      {!isLoading && carData && (
        <div className="flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20">
          <ImageCarousel images={carData.imagePaths} />
          <div className="flex w-full max-w-[700px] flex-col items-start">
            <div className="mb-2 mt-1 flex w-full flex-row items-baseline justify-between">
              <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                {carData.make ?? ""} Toyota Fremhjulstrekk Mmunell 233332{" "}
                {carData.model ?? ""}
              </h1>
              <h1 className="ml-7 hidden bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-2xl font-normal text-transparent md:inline-block md:text-3xl">
                {carData.firstTimeRegisteredInNorway.substring(0, 4)}
              </h1>
            </div>
            <hr className="mb-2 mt-2 w-full max-w-[700px] border-[1px] border-dashed border-gunmental px-2" />
            <div className="mt-7 flex w-full flex-row items-center justify-center space-x-4 md:mt-10">
              <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
              <h1 className="whitespace-nowrap text-center text-2xl font-semibold text-medium-gray md:text-2xl">
                Auction Details
              </h1>
              <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
            </div>
            <div className="mt-5 flex w-full flex-col items-center rounded-lg border border-dashed border-medium-gray bg-gradient-to-br from-swamp-100 to-lighthouse p-4">
              <div className="flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4 md:flex-row md:justify-around">
                <div className="flex flex-col items-center md:gap-1">
                  <p className="text-base font-medium text-light-gray">
                    Latest Bid:
                  </p>
                  <p className="text-3xl font-bold text-medium-gray">
                    42000 NOK
                  </p>
                </div>
                <div className="flex flex-col items-center md:gap-1">
                  <p className="text-base font-medium text-light-gray">
                    Minimal Step:
                  </p>
                  <p className="text-3xl font-bold text-medium-gray">
                    1000 NOK
                  </p>
                </div>
                <div className="flex flex-col items-center md:gap-2">
                  <p className="text-base font-medium text-light-gray">
                    Auction ends on:
                  </p>
                  <p className="text-lg font-semibold text-medium-gray">
                    {new Date()
                      .toISOString()
                      .replace("T", " ")
                      .substring(0, 19)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col items-end gap-1 sm:flex-row">
                <NumberInputField
                  label={"Your Bid"}
                  name="newBid"
                  icon={<TbCoins className="h-6 w-auto" color="#333" />}
                  initialValue={bidData.bid}
                  onChange={(e) => {
                    setBid((prev) => ({
                      ...prev,
                      bid: e.target.value,
                    }));
                  }}
                  disableCheckbox={true}
                />
                <button
                  onClick={() => {
                    console.log(validateBid(bidData.bid));
                  }}
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental sm:h-[50px] sm:w-auto md:space-x-2"
                >
                  <span className="whitespace-nowrap text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                    PLACE BID
                  </span>
                  <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                  <MdOutlineOutbox className="h-6 w-auto" color="#FEFAF0" />
                </button>
              </div>
              <p
                className={`mb-1 mt-4 w-auto cursor-pointer border-b-2 border-light-gray text-center text-xl font-medium text-light-gray hover:border-medium-gray hover:text-medium-gray`}
                onClick={() => {
                  setIsAutoBidOpen((prev) => !prev);
                }}
              >
                {isAutoBidOpen ? "Close Autobid" : "Set Autobid"}
              </p>
              {isAutoBidOpen && (
                <>
                  <div className="flex w-full flex-col items-end gap-1 sm:flex-row">
                    <NumberInputField
                      label={"Autobid"}
                      name="autoBid"
                      icon={<TbCoins className="h-6 w-auto" color="#333" />}
                      initialValue={bidData.autoBid}
                      onChange={(e) => {
                        setBid((prev) => ({
                          ...prev,
                          bid: e.target.value,
                        }));
                      }}
                      disableCheckbox={true}
                    />
                    <button className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 flex w-full flex-row items-center justify-center space-x-2 rounded-lg border border-medium-gray bg-lighthouse px-6 py-2 text-medium-gray hover:bg-medium-gray hover:text-lighthouse sm:h-[50px] sm:w-auto md:space-x-2">
                      <span className="whitespace-nowrap text-xl font-semibold leading-4 md:text-2xl">
                        AUTOBID
                      </span>
                      <div className="h-[16px] border-l-2 border-solid border-medium-gray group-hover:border-lighthouse md:h-[18px]"></div>
                      <MdOutlineBrightnessAuto className="h-6 w-auto" />
                    </button>
                  </div>
                  <p className="text-center text-sm font-normal italic text-light-gray md:text-base">
                    Write in the highest amount you are willing to pay for the
                    lot
                  </p>
                </>
              )}
              <div className="mt-7 hidden w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4 md:flex">
                <div className="mb-2 flex w-full flex-row items-center justify-between text-base font-semibold text-light-gray">
                  <p className="w-full text-start">Biders</p>
                  <p className="w-full text-center">Amount</p>
                  <p className="w-full text-end">Time</p>
                </div>
                {biders.map((bider, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center gap-2"
                  >
                    <div className="flex w-full flex-row items-center justify-between text-lg">
                      <p className="w-full text-start font-semibold text-medium-gray">
                        Bider {bider.num}
                      </p>
                      <p className="w-full text-center font-semibold text-medium-gray">
                        {bider.amount},-
                      </p>
                      <p className="w-full text-end font-semibold text-medium-gray">
                        {bider.time}
                      </p>
                    </div>
                    {index !== biders.length - 1 && (
                      <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4 md:hidden">
                {biders.map((bider, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center text-base"
                  >
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="font-semibold text-light-gray">Bider:</p>
                      <p className="font-semibold text-medium-gray">
                        Bider #{bider.num}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="font-semibold text-light-gray">Amount:</p>
                      <p className="font-semibold text-medium-gray">
                        {bider.amount},-
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="font-semibold text-light-gray">Time:</p>
                      <p className="font-semibold text-medium-gray">
                        {bider.time}
                      </p>
                    </div>
                    {index !== biders.length - 1 && (
                      <div className="my-2 h-[1px] w-full flex-grow bg-light-gray"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7 flex w-full flex-row items-center justify-center space-x-4 md:mt-10">
              <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
              <h1 className="whitespace-nowrap text-center text-2xl font-semibold text-medium-gray md:text-2xl">
                Car Details
              </h1>
              <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
            </div>
            <div className="mt-5 flex w-full flex-col items-center rounded-lg border border-dashed border-medium-gray bg-gradient-to-br from-swamp-100 to-lighthouse p-4">
              <CarSpecifications carData={carData} />
              {carData.additionalInformation && (
                <>
                  <div className="my-4 h-[1px] w-4/5 flex-grow bg-light-gray"></div>

                  <div className="flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4">
                    <p className="mb-2 w-full text-start text-base font-semibold text-light-gray">
                      Additional Details
                    </p>
                    <p className="w-full whitespace-pre-wrap break-words text-base font-medium text-medium-gray md:text-lg">
                      {carData.additionalInformation}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarAuctionPage;
