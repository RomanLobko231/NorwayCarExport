import { MdOutlineBrightnessAuto, MdOutlineOutbox } from "react-icons/md";
import CarSpecifications from "./CarSpecifications";
import NumberInputField from "../input/NumberInputField";
import BidderList from "./BidderList";
import AuctionCountdown from "./AuctionCountdown";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import { TbCoins } from "react-icons/tb";
import ErrorMessage from "../message/ErrorMessage";
import { isDeadlineReached } from "../../utils/dateTimeUtils";

const AuctionPanel = ({
  auctionData,
  carData,
  placeBid,
  placeAutoBid,
  error,
}) => {
  const { t } = useTranslation();
  const userId = sessionStorage.getItem("userId");
  const userAutoBids = auctionData.autoBids.filter((b) => b.bidderId == userId);

  const highestBidAmount = auctionData.highestBid?.amount ?? 0;
  const nextMinBid =
    highestBidAmount == 0
      ? auctionData.startingPrice
      : highestBidAmount + auctionData.minimalStep;

  const [bidAmount, setBidAmount] = useState(nextMinBid);
  const [autoBid, setAutoBid] = useState(nextMinBid);
  const [isAutoBidOpen, setIsAutoBidOpen] = useState(false);

  const [bidError, setBidError] = useState(error);

  const validateBid = (bid) => {
    if (bid < nextMinBid || bid < auctionData.startingPrice) {
      setBidError({
        message: `Bid is too low, must be at least ${nextMinBid},-`,
      });
    }
    return bid >= nextMinBid;
  };

  const isAuctionDisabled = () => {
    return (
      auctionData.status == "FINISHED" ||
      auctionData.status == "DISABLED" ||
      isDeadlineReached(auctionData.endDateTime)
    );
  };

  console.log(auctionData);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20">
      <ImageCarousel images={carData.imagePaths} />
      <div className="flex w-full max-w-[700px] flex-col items-start">
        <div className="mb-2 mt-1 flex w-full flex-row items-baseline justify-between">
          <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            {carData.make ?? ""} {carData.model ?? ""}
          </h1>
          <h1 className="ml-7 hidden bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-2xl font-normal text-transparent md:inline-block md:text-3xl">
            {carData.firstTimeRegisteredInNorway.substring(0, 4)}
          </h1>
        </div>
        <hr className="mb-2 mt-2 w-full max-w-[700px] border-[1px] border-dashed border-gunmental px-2" />
        <div className="mt-7 flex w-full flex-row items-center justify-center space-x-4 md:mt-10">
          <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
          <h1 className="whitespace-nowrap text-center text-2xl font-semibold text-medium-gray md:text-2xl">
            {t("auction_details")}
          </h1>
          <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
        </div>
        <div className="mt-5 flex w-full flex-col items-center rounded-lg border border-dashed border-medium-gray bg-gradient-to-br from-swamp-100 to-lighthouse p-4">
          <div className="flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4 md:flex-row md:justify-around">
            <div className="flex flex-col items-center md:gap-1">
              <p className="text-base font-medium text-light-gray">
                {t("highest_bid")}:
              </p>
              <p className="text-center text-3xl font-bold text-medium-gray">
                {highestBidAmount !== 0
                  ? `${highestBidAmount},-`
                  : t("no_bids")}
              </p>
            </div>
            <div className="flex flex-col items-center md:gap-1">
              <p className="text-base font-medium text-light-gray">
                {t("min_step")}:
              </p>
              <p className="text-3xl font-bold text-medium-gray">
                {auctionData.minimalStep},-
              </p>
            </div>
            <div className="flex flex-col items-center md:gap-2">
              <p className="text-base font-medium text-light-gray">
                {t("auction_ends_in")}:
              </p>
              {isAuctionDisabled() ? (
                <p className="text-lg font-bold text-medium-gray">-</p>
              ) : (
                <AuctionCountdown utcEndTime={auctionData.endDateTime} />
              )}
            </div>
          </div>
          {bidError && <ErrorMessage error={bidError.message} />}

          {isAuctionDisabled() ? (
            <h1 className="mt-7 w-full rounded-md border border-medium-gray bg-distant-cloud p-4 text-center text-2xl font-semibold text-medium-gray">
              {t("auction_inactive")}
            </h1>
          ) : (
            <>
              <div className="mt-4 flex w-full flex-col items-end gap-1 sm:flex-row">
                <NumberInputField
                  label={t("your_bid")}
                  name="newBid"
                  icon={<TbCoins className="h-6 w-auto" color="#333" />}
                  initialValue={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                  }}
                  disableCheckbox={true}
                />
                <button
                  onClick={() => {
                    if (validateBid(bidAmount)) {
                      placeBid(bidAmount);
                      setBidError(null);
                    }
                  }}
                  className="buttonsh hover:button_shadow_hover disabled:button_shadow_click active:button_shadow_click group mb-2 flex w-full cursor-pointer flex-row items-center justify-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental disabled:opacity-35 disabled:hover:to-swamp-500 sm:h-[50px] sm:w-auto md:space-x-2"
                  disabled={isAuctionDisabled()}
                >
                  <span className="whitespace-nowrap text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                    {t("place_bid").toUpperCase()}
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
                {isAutoBidOpen ? t("close_autobid") : t("set_autobid")}
              </p>
              {isAutoBidOpen && (
                <>
                  <div className="flex w-full flex-col items-end gap-1 sm:flex-row">
                    <NumberInputField
                      label={t("autobid")}
                      name="autoBid"
                      icon={<TbCoins className="h-6 w-auto" color="#333" />}
                      initialValue={autoBid}
                      onChange={(e) => {
                        setAutoBid(e.target.value);
                      }}
                      disableCheckbox={true}
                    />
                    <button
                      onClick={() => {
                        if (validateBid(autoBid)) {
                          placeAutoBid(autoBid);
                          setBidError(null);
                        }
                      }}
                      className="buttonsh disabled:button_shadow_clickhover:button_shadow_hover active:button_shadow_click group mb-2 flex w-full cursor-pointer flex-row items-center justify-center space-x-2 rounded-lg border border-medium-gray bg-lighthouse px-6 py-2 text-medium-gray hover:bg-medium-gray hover:text-lighthouse disabled:opacity-35 disabled:hover:bg-lighthouse disabled:hover:text-medium-gray sm:h-[50px] sm:w-auto md:space-x-2"
                      disabled={isAuctionDisabled()}
                    >
                      <span className="whitespace-nowrap text-xl font-semibold leading-4 md:text-2xl">
                        {t("autobid").toUpperCase()}
                      </span>
                      <div className="h-[16px] border-l-2 border-solid border-medium-gray group-hover:border-lighthouse md:h-[18px]"></div>
                      <MdOutlineBrightnessAuto className="h-6 w-auto" />
                    </button>
                  </div>
                  <p className="text-center text-sm font-normal italic text-light-gray md:text-base">
                    {t("autobid_desc")}
                  </p>
                </>
              )}
            </>
          )}
          {userAutoBids.length > 0 && (
            <>
              <p className="-mb-4 mt-7 w-full text-center text-sm font-normal italic text-light-gray md:text-base">
                {t("your_earlier_autobids")}
              </p>
              <BidderList bidsData={userAutoBids} />
            </>
          )}

          <p className="-mb-4 mt-7 w-full text-center text-sm font-normal italic text-light-gray md:text-base">
            {t("your_bids_marked_color")}
          </p>
          <BidderList bidsData={auctionData.bids} />
        </div>
        <div className="mt-7 flex w-full flex-row items-center justify-center space-x-4 md:mt-10">
          <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
          <h1 className="whitespace-nowrap text-center text-2xl font-semibold text-medium-gray md:text-2xl">
            {t("car_details")}
          </h1>
          <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
        </div>
        <CarSpecifications carData={carData} />
      </div>
    </div>
  );
};

export default AuctionPanel;
