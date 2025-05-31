import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isDeadlineReached } from "../../../utils/dateTimeUtils";
import { TbCarOff, TbCoins } from "react-icons/tb";
import NumberInputField from "../../input/NumberInputField";
import AuctionCountdown from "../../auction/AuctionCountdown";
import { MdOutlineBrightnessAuto, MdOutlineOutbox } from "react-icons/md";
import AuctionApiService from "../../../api/AuctionApiService";
import ErrorMessage from "../../ErrorMessage";

const SavedAuctionCard = ({ auctionData, isForCompany }) => {
  const { t } = useTranslation();

  const [auction, setAuction] = useState(auctionData);

  const highestBidAmount = auction.highestBid?.amount ?? 0;
  const nextMinBid =
    highestBidAmount == 0
      ? auction.startingPrice
      : highestBidAmount + auction.minimalStep;

  const [bidAmount, setBidAmount] = useState(nextMinBid);
  const [autoBid, setAutoBid] = useState(nextMinBid);

  const [bidError, setBidError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateBid = (bid) => {
    if (bid < nextMinBid || bid < auction.startingPrice) {
      setBidError({
        message: `Bid is too low, must be at least ${nextMinBid},-`,
      });
    }
    return bid >= nextMinBid;
  };

  const isAuctionDisabled = () => {
    return (
      auction.status == "FINISHED" ||
      auction.status == "DISABLED" ||
      isDeadlineReached(auction.endDateTime)
    );
  };

  const placeBid = async (bid) => {
    setIsLoading(true);
    setBidError(null);
    try {
      const response = await AuctionApiService.placeBid(bid);
      setAuction(response.data);
    } catch (error) {
      setBidError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitPlaceBid = (e) => {
    e.preventDefault();
    if (validateBid(bidAmount)) {
      placeBid({ auctionId: auction.id, amount: bidAmount });
      setBidError(null);
    }
  };

  const placeAutoBid = async (autoBid) => {
    setIsLoading(true);
    setBidError(null);
    try {
      const response = await AuctionApiService.placeAutoBid(autoBid);
      setAuction(response.data);
    } catch (error) {
      setBidError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitPlaceAutoBid = (e) => {
    e.preventDefault();
    if (validateBid(autoBid)) {
      placeAutoBid({ auctionId: auction.id, limitAmount: autoBid });
      setBidError(null);
    }
  };

  return (
    <a
      className={`card_shadow hover:card_shadow_hover ${isForCompany ? "w-full min-w-[150px] sm:w-[calc(50%-0.5rem)] sm:min-w-[300px]" : "w-full"} active:card_shadow_click flex w-full flex-col gap-3 rounded-lg border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3`}
      href={`/auction/${auction.carDetails.carId}`}
    >
      <div className="flex w-full flex-col gap-3 lg:flex-row">
        <div className="aspect-square max-h-[155px] min-h-[120px] rounded border border-swamp-500 md:max-h-[120px]">
          {auction.carDetails.thumbnailImageUrl ? (
            <img
              src={auction.carDetails.thumbnailImageUrl}
              alt={auction.carDetails.makeModel ?? "Car"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full object-cover">
              <TbCarOff className="h-10 w-auto" color="#888" />
            </div>
          )}
        </div>
        <div className={`flex w-full flex-col`}>
          <div className="flex w-full flex-row items-center justify-between">
            <h1 className="inline-block truncate bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
              {auction.carDetails.makeModel ?? ""}
            </h1>
            <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
            <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
              {auction.carDetails.modelYear ?? ""}
            </h1>
          </div>

          <div className="mt-2 flex w-full flex-row items-center justify-between rounded-md border border-medium-gray px-3 py-1 text-center text-lg font-semibold text-light-gray">
            <h1 className="text-base font-medium md:text-lg">Siste bud:</h1>
            <h1 className="select-none text-lg font-bold text-medium-gray">
              {auction.highestBid?.amount ?? "-"}
              {sessionStorage.getItem("userId") ==
                auction.highestBid?.bidderId && "*"}
            </h1>
          </div>
          <div className="mt-2 flex w-full flex-row items-center justify-between rounded-md border border-medium-gray px-3 py-1 text-center text-base font-semibold text-light-gray md:text-lg">
            {t("ends_in")}:
            <AuctionCountdown utcEndTime={auction.endDateTime} />
          </div>
        </div>

        {!isForCompany && (
          <>
            <hr className="my-1 hidden h-auto border-[1px] border-l border-dashed border-light-gray/35 lg:block" />
            <form
              className="flex w-full flex-col items-end"
              onSubmit={submitPlaceBid}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="mt-1 w-full flex-col"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <label
                  htmlFor={t("your_bid")}
                  className="ml-5 text-sm font-medium text-light-gray md:text-base"
                >
                  {t("your_bid")}*
                </label>
                <div className="relative mt-2 w-full">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                    {<TbCoins className="h-6 w-auto" color="#333" />}
                  </div>
                  <input
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", ".", ","].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onPaste={(e) => {
                      e.preventDefault();
                    }}
                    onWheel={(e) => e.currentTarget.blur()}
                    min={0}
                    type="number"
                    id={t("your_bid")}
                    name={"newBid"}
                    onChange={(e) => {
                      setBidAmount(e.target.value);
                    }}
                    value={
                      bidAmount == null ||
                      bidAmount == undefined ||
                      bidAmount === ""
                        ? ""
                        : bidAmount
                    }
                    className="block w-full rounded-md border border-medium-gray bg-white px-3 py-1 ps-12 text-base font-medium text-medium-gray disabled:border-none disabled:bg-slate-50 disabled:px-[22px] disabled:py-[11px] disabled:ps-12 md:text-lg"
                    required={true}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="buttonsh hover:button_shadow_hover disabled:button_shadow_click active:button_shadow_click group mt-2 flex w-full cursor-pointer flex-row items-center justify-center space-x-2 rounded-md bg-gradient-to-br from-mirage to-swamp-500 px-3 py-2 hover:from-mirage hover:to-gunmental disabled:opacity-35 disabled:hover:to-swamp-500 md:space-x-2 lg:py-[5px]"
                disabled={isAuctionDisabled() || isLoading}
              >
                <span className="whitespace-nowrap text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-xl">
                  {t("place_bid").toUpperCase()}
                </span>
                <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                <MdOutlineOutbox className="h-6 w-auto" color="#FEFAF0" />
              </button>
            </form>
            <hr className="my-1 hidden h-auto border-[1px] border-l border-dashed border-light-gray/35 lg:block" />

            <form
              className="flex w-full flex-col items-end"
              onSubmit={submitPlaceAutoBid}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="mt-1 w-full flex-col"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <label
                  htmlFor={t("autobid")}
                  className="ml-5 text-sm font-medium text-light-gray md:text-base"
                >
                  {t("autobid")}
                </label>
                <div className="relative mt-2 w-full">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                    {<TbCoins className="h-6 w-auto" color="#333" />}
                  </div>
                  <input
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", ".", ","].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onPaste={(e) => {
                      e.preventDefault();
                    }}
                    onWheel={(e) => e.currentTarget.blur()}
                    min={0}
                    type="number"
                    id={t("autobid")}
                    name={"autoBid"}
                    onChange={(e) => {
                      setAutoBid(e.target.value);
                    }}
                    value={
                      autoBid == null || autoBid == undefined || autoBid === ""
                        ? ""
                        : autoBid
                    }
                    className="block w-full rounded-md border border-medium-gray bg-white px-3 py-1 ps-12 text-base font-medium text-medium-gray disabled:border-none disabled:bg-slate-50 disabled:px-[22px] disabled:py-[11px] disabled:ps-12 md:text-lg"
                    required={true}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="buttonsh hover:button_shadow_hover disabled:button_shadow_click active:button_shadow_click group mt-2 flex w-full cursor-pointer flex-row items-center justify-center space-x-2 rounded-md border border-medium-gray bg-lighthouse px-3 py-2 text-medium-gray hover:bg-medium-gray hover:text-lighthouse disabled:opacity-35 disabled:hover:bg-lighthouse disabled:hover:text-medium-gray md:space-x-2 lg:py-1"
                disabled={isAuctionDisabled() || isLoading}
              >
                <span className="whitespace-nowrap text-xl font-semibold leading-4 md:text-xl">
                  {t("autobid").toUpperCase()}
                </span>
                <div className="h-[16px] border-l-2 border-solid border-medium-gray group-hover:border-lighthouse disabled:group-hover:border-medium-gray md:h-[18px]"></div>
                <MdOutlineBrightnessAuto className="h-6 w-auto" />
              </button>
            </form>
          </>
        )}
      </div>
      {bidError && <ErrorMessage error={bidError.message} />}
    </a>
  );
};

export default SavedAuctionCard;
