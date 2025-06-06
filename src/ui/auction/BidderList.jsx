import { useTranslation } from "react-i18next";
import { formatUtcToLocal } from "../../utils/dateTimeUtils";
import { useEffect, useState } from "react";
import { TbUserOff } from "react-icons/tb";
import { MdOutlineGroupOff } from "react-icons/md";

const BidderList = ({ bidsData }) => {
  const { t } = useTranslation();
  const userId = sessionStorage.getItem("userId");

  const formatTime = (time) => {
    return formatUtcToLocal(time).slice(0, -6).replaceAll("-", ".");
  };

  const [bids, setBids] = useState([]);

  useEffect(() => {
    const bidderMap = new Map();
    let bidderCounter = 1;

    const labeledBids = bidsData.map((bid) => {
      if (!bidderMap.has(bid.bidderId)) {
        bidderMap.set(bid.bidderId, `${bidderCounter++}`);
      }
      return {
        ...bid,
        bidderLabel: bidderMap.get(bid.bidderId),
      };
    });

    setBids(labeledBids);
  }, [bidsData]);

  return (
    <>
      {bids.length > 0 ? (
        <>
          <div className="mt-7 hidden w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4 md:flex">
            <div className="mb-2 flex w-full flex-row items-center justify-between text-base font-semibold text-light-gray">
              <p className="w-full text-start">{t("bidders")}</p>
              <p className="w-full text-center">{t("amount")}</p>
              <p className="w-full text-end">{t("time")}</p>
            </div>
            {bids.map((bid, index) => (
              <div
                key={index}
                className={`flex w-full flex-col items-center gap-2`}
              >
                <div
                  className={`flex w-full flex-row items-center justify-between text-lg ${userId == bid.bidderId && bid.amount && "rounded-md bg-swamp-300/50"} p-2`}
                >
                  <p className="w-full text-start font-semibold text-medium-gray">
                    {t("bidder")} {bid.bidderLabel}
                  </p>
                  <p className="w-full text-center font-semibold text-medium-gray">
                    {bid.amount || bid.limitAmount},-
                  </p>
                  <p className="w-full text-end font-semibold text-medium-gray">
                    {formatTime(bid.placedAt)}
                  </p>
                </div>
                {index !== bids.length - 1 && (
                  <div className="h-[1px] w-full flex-grow bg-light-gray opacity-50"></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex w-full flex-col items-center rounded-md border border-gunmental bg-distant-cloud p-4 md:hidden">
            {bids.map((bid, index) => (
              <div key={index} className="flex w-full flex-col items-center">
                <div
                  className={`flex w-full flex-col items-center ${userId == bid.bidderId && bid.amount && "rounded-md bg-swamp-300/50 p-2"} text-base`}
                >
                  <div className="flex w-full flex-row items-center justify-between">
                    <p className="font-semibold text-light-gray">
                      {t("bidder")}:
                    </p>
                    <p className="font-semibold text-medium-gray">
                      {t("bidder")} {bid.bidderLabel}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <p className="font-semibold text-light-gray">
                      {t("amount")}:
                    </p>
                    <p className="font-semibold text-medium-gray">
                      {bid.amount || bid.limitAmount},-
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <p className="font-semibold text-light-gray">
                      {t("time")}:
                    </p>
                    <p className="text-end font-semibold text-medium-gray">
                      {formatTime(bid.placedAt)}
                    </p>
                  </div>
                </div>
                {index !== bids.length - 1 && (
                  <div className="my-2 h-[1px] w-full flex-grow bg-light-gray"></div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-7 flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4 py-9">
          <MdOutlineGroupOff className="h-16 w-auto opacity-50" color="#888" />
          <p className="text-center text-xl font-normal text-light-gray opacity-75">
            {t("no_bids")}
          </p>
        </div>
      )}
    </>
  );
};

export default BidderList;
