import { useNavigate } from "react-router";
import { TbCarOff } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import LoginModal from "../../LoginModal";
import { useState } from "react";
import AuctionCountdown from "../AuctionCountdown";

const MockAuctionCarCard = ({ auction }) => {
  const { t } = useTranslation();

  const [loginModalopen, setLoginModalOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setLoginModalOpen(true);
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-full max-w-[300px] cursor-pointer flex-col items-center rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3 duration-300 hover:-translate-y-1 md:w-[300px]"
    >
      {auction.carDetails.thumbnailImageUrl ? (
        <img
          src={auction.carDetails.thumbnailImageUrl}
          alt={"Car"}
          className="h-[155px] w-full rounded border border-swamp-500 object-cover"
        />
      ) : (
        <div className="flex h-[155px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse from-swamp-100">
          <TbCarOff className="h-10 w-auto" color="#888" />
        </div>
      )}
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

      <div className="mb-2 mt-1 flex w-full flex-row items-center justify-between">
        <h1 className="inline-block truncate bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
          {auction.carDetails.makeModel ?? ""}
        </h1>
        <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
        <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
          {auction.carDetails.modelYear ?? ""}
        </h1>
      </div>
      <hr className="h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

      <div className="group mt-3 flex w-full flex-row items-center justify-between gap-3 rounded-md border border-gunmental bg-gradient-to-br from-mirage to-swamp-500 px-3 py-1 hover:from-mirage hover:to-gunmental">
        <h1 className="text-xl font-medium text-cornsilk group-hover:text-lighthouse">
          {t("last_bid")}:{" "}
        </h1>
        <h1 className="select-none text-xl font-medium text-cornsilk blur-[5px] group-hover:text-lighthouse">
          {auction.highestBid?.amount ?? "-"}
        </h1>
      </div>
      <div className="mt-2 flex w-full flex-row items-center justify-between rounded-md border border-medium-gray px-3 py-1 text-center text-base font-semibold text-light-gray">
        {t("ends_in")}: <AuctionCountdown utcEndTime={auction.endDateTime} />
      </div>
      <LoginModal open={loginModalopen} setOpen={setLoginModalOpen} />
    </div>
  );
};

export default MockAuctionCarCard;
