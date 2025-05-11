import { useEffect, useState } from "react";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import AuctionApiService from "../api/AuctionApiService";
import AuctionsList from "../ui/auction/AuctionsList";

const AllAuctionsPage = () => {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuctionApiService.getAllAuctionsByStatus("Aktivt");
      setAuctions(response.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20 md:py-24">
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      <AuctionsList auctions={auctions} />
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
