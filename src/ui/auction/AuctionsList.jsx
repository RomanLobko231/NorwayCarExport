import AuctionCarCard from "./AuctionCarCard";

const AuctionsList = ({ auctions }) => {
  return (
    <div className="flex max-w-7xl flex-row flex-wrap justify-center gap-4">
      {auctions.map((auction) => (
        <AuctionCarCard auction={auction} key={auction.id} />
      ))}
    </div>
  );
};

export default AuctionsList;
