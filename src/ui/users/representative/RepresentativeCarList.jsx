import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OptionsInput from "../../input/OptionsInput";
import { RiAddBoxLine } from "react-icons/ri";
import CarsList from "../../car/CarsList";
import CarApiService from "../../../api/CarApiService";
import ErrorDialog from "../../dialog/ErrorDialog";
import ErrorMessage from "../../ErrorMessage";
import AuctionsList from "../../auction/AuctionsList";
import AuctionApiService from "../../../api/AuctionApiService";

const SellerCarList = () => {
  const [cars, setCars] = useState([]);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedCars(params.id);
  }, []);

  const fetchSavedCars = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const cars = await AuctionApiService.getAuctionedCarsByRepId(id);
      setCars(cars.data);
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
        className={`mt-5 flex w-full max-w-5xl flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-4 md:p-6`}
      >
        <h1 className="mb-6 w-full text-start text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
          LAGREDE BILER
        </h1>

        {error && !isErrorOpen ? (
          <ErrorMessage error={error.message} />
        ) : (
          <AuctionsList
            cars={cars}
            onDelete={deleteCarById}
            actionsDisabled={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default SellerCarList;
