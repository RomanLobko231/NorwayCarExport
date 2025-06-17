import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import OptionsInput from "../../input/OptionsInput";
import { RiAddBoxLine } from "react-icons/ri";
import CarsList from "../../car/CarsList";
import CarApiService from "../../../api/CarApiService";
import ErrorDialog from "../../dialog/ErrorDialog";
import ErrorMessage from "../../message/ErrorMessage";
import AuctionsList from "../../auction/AuctionsList";
import AuctionApiService from "../../../api/AuctionApiService";
import { TbCarOff } from "react-icons/tb";
import AuctionCountdown from "../../auction/AuctionCountdown";
import { useTranslation } from "react-i18next";
import NumberInputField from "../../input/NumberInputField";
import SavedAuctionCard from "./SavedAuctionCard";
import PageArrows from "../../PageArrows";

const RepresentativeCarList = ({ auctionIds }) => {
  const { t } = useTranslation();

  const AUCTION_STATUSES = [
    { label: t("active"), value: "Aktivt" },
    { label: t("finished"), value: "Avsluttet" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam =
    searchParams.get("status") || AUCTION_STATUSES.at(0).value;

  const [auctions, setAuctions] = useState([]);
  const [auctionFilter, setAuctionFilter] = useState(statusParam);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchSavedAuctions(auctionIds, auctionFilter);
  }, [auctionFilter, page]);

  const updateFilter = (newFilter) => {
    setAuctionFilter(newFilter);
    setSearchParams({ status: newFilter });
  };

  const fetchSavedAuctions = async (ids, status) => {
    if (ids.length <= 0) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.getAllByCarIdsAndStatusPaged(
        ids,
        status,
        page,
        size,
      );
      setAuctions(response.data.items);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      <div
        className={`mt-5 flex w-full max-w-7xl flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-4 md:p-6`}
      >
        <div className="mb-2 flex w-full flex-col flex-wrap items-center justify-start md:flex-row">
          <h1 className="mb-2 text-start text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
            {t("auctions").toUpperCase()}
          </h1>
          <div className="hidden border-l-2 border-solid border-gunmental md:mx-4 md:block md:h-5"></div>
          <div className="scrollbar-hide flex flex-row items-center gap-3 overflow-x-auto whitespace-nowrap">
            {AUCTION_STATUSES.map((filter) => (
              <h1
                className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium ${
                  auctionFilter == filter.value
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
        </div>
        <p className="w-full text-start text-sm font-normal italic text-light-gray md:text-base">
          1. '*' {t("asteriks_means_that")}
        </p>
        <p className="mb-6 w-full text-start text-sm font-normal italic text-light-gray md:text-base">
          2. {t("remember_not_online")}
        </p>
        {error && !isErrorOpen ? (
          <ErrorMessage error={error.message} />
        ) : (
          <div className="flex w-full flex-row flex-wrap justify-center gap-4">
            {auctions.map((auction) => (
              <SavedAuctionCard auctionData={auction} key={auction.id} />
            ))}
          </div>
        )}
        <PageArrows page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default RepresentativeCarList;
