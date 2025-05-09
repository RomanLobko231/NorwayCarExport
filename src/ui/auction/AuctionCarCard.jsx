import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import TextInputField from "../input/TextInputField";
import { TbCarOff } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";
import MessageDialog from "../dialogs/MessageDialog";
import LoginModal from "../LoginModal";
import AuctionCountdown from "./AuctionCountdown";

const AuctionCarCard = ({ auction }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/auction/${auction.carDetails.carId}`);
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-[300px] cursor-pointer flex-col items-center rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3 duration-300 hover:-translate-y-1"
    >
      {auction.carDetails.thumbnailImageUrl ? (
        <img
          src={auction.carDetails.thumbnailImageUrl}
          alt={"Car"}
          className="h-[185px] w-full rounded border border-swamp-500 object-cover"
        />
      ) : (
        <div className="flex h-[185px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse from-swamp-100">
          <TbCarOff className="h-10 w-auto" color="#888" />
        </div>
      )}
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

      <div className="mb-2 mt-1 flex w-full flex-row items-center justify-between">
        <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
          {auction.carDetails.makeModel ?? ""}
        </h1>
        <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
        <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
          {auction.carDetails.modelYear ?? ""}
        </h1>
      </div>

      {/* <div className="flex flex-wrap items-center gap-2">
        <CarInfoElement info={`EU: ${carInfo.nextEUControl ?? "-"}`} />
        <CarInfoElement info={carInfo.gearbox ?? "-"} />
        <CarInfoElement info={carInfo.engineType ?? "-"} />
        <CarInfoElement info={`${carInfo.kilometers ?? "-"} KMs`} />
      </div>
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" /> */}

      <div className="group mt-3 flex w-full flex-row items-center justify-between gap-3 rounded-md border border-gunmental bg-gradient-to-br from-mirage to-swamp-500 px-3 py-1 hover:from-mirage hover:to-gunmental">
        <h1 className="text-xl font-medium text-cornsilk group-hover:text-lighthouse">
          Siste bud:
        </h1>
        <h1 className="select-none text-xl font-medium text-cornsilk group-hover:text-lighthouse">
          {auction.highestBid ?? "-"}
        </h1>
      </div>
      <div className="mt-4 flex w-full flex-row items-center justify-between text-center text-base font-semibold text-light-gray">
        Avslutes om
        <AuctionCountdown utcEndTime={auction.endDateTime} />
      </div>
    </div>
  );
};

export default AuctionCarCard;
