import { useEffect, useState } from "react";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import AuctionApiService from "../api/AuctionApiService";
import AuctionsList from "../ui/auction/AuctionsList";
import MockAuctionsList from "../ui/auction/mock/MockAuctionsList";

const AllAuctionsPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);

  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetchAll();
    }
  }, [page]);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.getAllAuctionsByStatusPaged(
        "Aktivt",
        page,
        size,
      );
      setAuctions(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center px-4 py-24 md:pt-28">
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {sessionStorage.getItem("userId") ? (
        <AuctionsList auctions={auctions} />
      ) : (
        <MockAuctionsList />
      )}

      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
    </div>
  );
};

export default AllAuctionsPage;
