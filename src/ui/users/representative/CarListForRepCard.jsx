import { useEffect, useState } from "react";
import AuctionApiService from "../../../api/AuctionApiService";
import SavedAuctionCard from "./SavedAuctionCard";
import { TbCarOff } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import PageArrows from "../../PageArrows";

const AUCTION_STATUSES = ["Aktivt", "Avsluttet"];

const CarListForRepCard = ({ representative }) => {
  const { t } = useTranslation();

  const AUCTION_STATUSES = [
    { label: t("active"), value: "Aktivt" },
    { label: t("finished"), value: "Avsluttet" },
  ];

  const [auctionsOpen, setAuctionsOpen] = useState(false);

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [auctions, setAuctions] = useState([]);
  const [auctionFilter, setAuctionFilter] = useState(
    AUCTION_STATUSES.at(0).value,
  );

  const [page, setPage] = useState(0);
  const [size] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!auctionsOpen) return;
    showAuctions();
  }, [auctionFilter, page]);

  const updateFilter = (newFilter) => {
    setAuctionFilter(newFilter);
  };

  const showAuctions = async () => {
    setAuctionsOpen(true);
    if (representative.savedCarIds.length <= 0) return;
    //if (auctions?.length > 0) return;

    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await AuctionApiService.getAllByCarIdsAndStatusPaged(
        representative.savedCarIds,
        auctionFilter,
        page,
        size,
      );
      setAuctions(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setFetchError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
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
        {auctionsOpen ? t("close_lower_case") : t("see_rep_auctions")}
      </p>

      {auctions && !fetchError && auctionsOpen && (
        <div className="mt-4 flex w-full flex-col items-center rounded-md border-dashed border-gunmental md:border md:bg-distant-cloud md:p-3">
          <div className="scrollbar-hide mt-3 flex flex-row items-center gap-3 overflow-x-auto whitespace-nowrap">
            {AUCTION_STATUSES.map((filter) => (
              <h1
                className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
                  auctionFilter === filter.value
                    ? "border-gunmental bg-gunmental text-lighthouse"
                    : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
                }`}
                onClick={() => {
                  updateFilter(filter.value);
                }}
                key={filter.value}
              >
                {filter.label}
              </h1>
            ))}
          </div>
          {auctions.length <= 0 && (
            <div className="mb-4 mt-9 flex flex-col">
              <TbCarOff className="h-12 w-auto opacity-50" color="#888" />
              <p className="mt-2 text-center text-base font-normal text-light-gray opacity-75 md:text-lg">
                {t("no_auctions_rep")}
              </p>
            </div>
          )}
          <div className="mt-6 flex w-full flex-row flex-wrap justify-center gap-3">
            {auctions.map((auction) => (
              <SavedAuctionCard
                auctionData={auction}
                key={auction.id}
                isForCompany={true}
              />
            ))}
          </div>
          <PageArrows page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default CarListForRepCard;
