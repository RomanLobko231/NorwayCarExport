import { TbCarOff, TbCheck, TbEdit, TbTrashX } from "react-icons/tb";
import TextInputField from "../../input/TextInputField";
import {
  MdClose,
  MdOutlineEmail,
  MdOutlinePerson2,
  MdOutlinePhone,
} from "react-icons/md";
import { useEffect, useState } from "react";
import DeleteDialog from "../../dialog/DeleteDialog";
import { useTranslation } from "react-i18next";
import AuctionApiService from "../../../api/AuctionApiService";
import RepresentativeCarList from "./RepresentativeCarList";
import SavedAuctionCard from "./SavedAuctionCard";

const BuyerRepresentativeCard = ({ rep, deleteRep, updateRep }) => {
  const { t } = useTranslation();

  const [repData, setRepData] = useState(rep);
  const [inputDisabled, setInputDisabled] = useState(true);

  const [isDelOpen, setIsDelOpen] = useState(false);
  const [auctionsOpen, setAuctionsOpen] = useState(false);

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [auctions, setAuctions] = useState(null);

  useEffect(() => {
    setInputDisabled(true);
  }, [rep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRepData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    updateRep(repData);
  };

  const resetData = (e) => {
    e.preventDefault();
    setRepData(rep);
    setInputDisabled(true);
  };

  const showAuctions = async () => {
    setAuctionsOpen(true);
    if (rep.savedCarIds.length <= 0) return;

    if (auctions?.length > 0) return;

    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await AuctionApiService.getAllByCarIdsAndStatus(
        rep.savedCarIds,
        "Aktivt",
      );
      setAuctions(response.data);
    } catch (error) {
      setFetchError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center rounded-lg border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3">
      <form
        onSubmit={onUpdateSubmit}
        onReset={resetData}
        className="flex w-full flex-col items-center gap-3 md:items-end md:justify-between lg:flex-row"
      >
        <div className="flex w-full flex-col items-start gap-1 md:items-center lg:mr-2 lg:flex-row lg:gap-2">
          <TextInputField
            label="Navn"
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333333" />}
            initialValue={repData.name}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
          <TextInputField
            label="Mobilnummer"
            name="phoneNumber"
            icon={<MdOutlinePhone className="h-6 w-auto" color="#333333" />}
            initialValue={repData.phoneNumber}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
          <TextInputField
            label="Epost"
            name="email"
            type="email"
            icon={<MdOutlineEmail className="h-6 w-auto" color="#333333" />}
            initialValue={repData.email}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </div>
        <div
          className={`mb-3 ${inputDisabled ? "flex" : "hidden"} flex-row items-center gap-2`}
        >
          <button
            className="flex rounded-lg border border-medium-gray p-1 text-medium-gray hover:bg-medium-gray hover:text-lighthouse"
            onClick={() => {
              setInputDisabled(false);
            }}
            type="button"
          >
            <TbEdit className="h-auto w-8" />
          </button>
          <button
            className="flex rounded-lg border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse"
            onClick={() => {
              setIsDelOpen(true);
            }}
            type="button"
          >
            <TbTrashX className="h-auto w-8" />
          </button>
        </div>
        <div
          className={`mb-3 ${inputDisabled ? "hidden" : "flex"} flex-row items-center gap-2`}
        >
          <button
            className="flex rounded-lg border border-swamp-500 p-1 text-swamp-500 hover:bg-swamp-500 hover:text-lighthouse"
            type="submit"
          >
            <TbCheck className="h-auto w-8" />
          </button>
          <button
            className="flex rounded-lg border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse"
            type="reset"
          >
            <MdClose className="h-auto w-8" />
          </button>
        </div>
        <DeleteDialog
          isOpen={isDelOpen}
          setIsOpen={setIsDelOpen}
          onDelete={() => {
            deleteRep(rep.id);
          }}
        />
      </form>
      <p
        className="my-1 flex w-auto cursor-pointer border-b-2 border-medium-gray/50 text-center text-lg font-medium text-medium-gray/50 hover:border-medium-gray hover:text-medium-gray"
        onClick={
          auctionsOpen
            ? () => {
                setAuctionsOpen((prev) => !prev);
              }
            : showAuctions
        }
      >
        {t("see_rep_auctions")}
      </p>
      {auctionsOpen && auctions && !fetchError && (
        <div className="mt-4 flex w-full flex-row flex-wrap justify-center gap-3 rounded-md border-dashed border-gunmental md:border md:bg-distant-cloud md:p-3">
          {auctions.map((auction) => (
            <>
              <SavedAuctionCard
                auctionData={auction}
                key={auction.id}
                isForCompany={true}
              />
              <SavedAuctionCard
                auctionData={auction}
                key={auction.id}
                isForCompany={true}
              />
              <SavedAuctionCard
                auctionData={auction}
                key={auction.id}
                isForCompany={true}
              />
              <SavedAuctionCard
                auctionData={auction}
                key={auction.id}
                isForCompany={true}
              />
              <SavedAuctionCard
                auctionData={auction}
                key={auction.id}
                isForCompany={true}
              />
            </>
          ))}
        </div>
      )}
      {auctionsOpen && rep.savedCarIds <= 0 && (
        <div className="my-4 flex flex-col">
          <TbCarOff className="h-12 w-auto opacity-50" color="#888" />
          <p className="mt-2 text-center text-base font-normal text-light-gray opacity-75 md:text-lg">
            Representant har ikke deltatt i aksjoner ennå
          </p>
        </div>
      )}
    </div>
  );
};

export default BuyerRepresentativeCard;
