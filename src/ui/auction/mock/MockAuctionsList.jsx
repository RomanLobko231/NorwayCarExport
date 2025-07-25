import { useTranslation } from "react-i18next";
import MockAuctionCarCard from "./MockAuctionCarCard";
import { MdLockOutline } from "react-icons/md";
const auctions = [
  {
    carDetails: {
      makeModel: "Nissan e-NV200",
      modelYear: "2015",
      thumbnailImageUrl: "/car_2.jpg",
    },
    highestBid: {
      amount: 41450,
    },
    endDateTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    carDetails: {
      makeModel: "Jaguar I-Pace",
      modelYear: "2022",
      thumbnailImageUrl: "/car_5.jpg",
    },
    highestBid: {
      amount: 87000,
    },
    endDateTime: new Date(
      Date.now() + 12 * 60 * 60 * 1000 - 26 * 60 * 1000,
    ).toISOString(),
  },
  {
    carDetails: {
      makeModel: "Toyota Camry Hybrid",
      modelYear: "2021",
      thumbnailImageUrl: "/car_3.jpg",
    },
    highestBid: {
      amount: 32450,
    },
    endDateTime: new Date(
      Date.now() + 18 * 60 * 60 * 1000 - 13 * 60 * 1000,
    ).toISOString(),
  },
];
const MockAuctionsList = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      <div className="mt-6 flex w-full flex-row flex-wrap justify-center gap-4">
        {auctions.map((auction) => (
          <MockAuctionCarCard
            auction={auction}
            key={auction.highestBid.amount}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-col items-center gap-2 py-2 text-center text-base font-semibold text-light-gray md:flex-row md:text-lg">
        <MdLockOutline className="h-6 w-auto" />
        <h3>{t("login_to_see_more")}</h3>
      </div>
    </div>
  );
};

export default MockAuctionsList;
