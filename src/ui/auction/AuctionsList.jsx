import { useTranslation } from "react-i18next";
import AuctionCarCard from "./AuctionCarCard";

const AuctionsList = ({ auctions }) => {
  const { t } = useTranslation();
  return (
    <div className="flex max-w-7xl flex-col items-center">
      <h1 className="mb-6 w-full text-center text-2xl font-bold text-medium-gray md:text-3xl">
        {t("auctions").toUpperCase()}
      </h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-4">
        {auctions.map((auction) => (
          <AuctionCarCard auction={auction} key={auction.id} />
        ))}
      </div>
    </div>
  );
};

export default AuctionsList;
