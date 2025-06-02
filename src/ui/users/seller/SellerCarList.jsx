import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OptionsInput from "../../input/OptionsInput";
import { RiAddBoxLine } from "react-icons/ri";
import CarsList from "../../car/CarsList";
import CarApiService from "../../../api/CarApiService";
import ErrorDialog from "../../dialog/ErrorDialog";
import ErrorMessage from "../../ErrorMessage";
import { useTranslation } from "react-i18next";

const SellerCarList = () => {
  const { t } = useTranslation("common", "user");
  const [cars, setCars] = useState([]);
  const [carFilter, setCarFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setCarFilter(e.target.value);
    const updatedCars = cars.filter((car) => car.status === e.target.value);
    setFilteredCars(updatedCars);
  };

  useEffect(() => {
    fetchUserCars(params.id);
  }, []);

  const fetchUserCars = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const cars = await CarApiService.getCarsByOwnerId(id);
      setCars(cars.data);
      setFilteredCars(cars.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCarById = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      await CarApiService.deleteCarById(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
      setFilteredCars((prev) => prev.filter((car) => car.id !== id));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
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
        <div className="mb-6 flex w-full flex-col flex-wrap items-center justify-start md:flex-row">
          <h1 className="mb-4 text-center text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
            {t("user_cars", { ns: "user" })}
          </h1>
          <div className="ml-3 mr-3 hidden h-[14px] border-l-2 border-solid border-gunmental md:ml-4 md:mr-0 md:block md:h-5"></div>
          <OptionsInput
            options={["Vurdering", "Auksjon", "Solgt", "Annet"]}
            optionName="status"
            initialOption={carFilter}
            handleInputChange={handleFilterChange}
          />
          <p
            className="mb-1 mt-2 cursor-pointer border-b border-light-gray text-lg font-normal text-light-gray hover:text-gunmental"
            onClick={() => {
              setFilteredCars(cars);
              setCarFilter("");
            }}
          >
            Reset filter
          </p>
          <button
            onClick={() => {
              navigate(`/user/${params.id}/add-car`);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mt-4 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:ml-auto md:mt-0 md:space-x-2 md:rounded-lg"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              {t("add").toUpperCase()}{" "}
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <RiAddBoxLine className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </div>

        {error && !isErrorOpen ? (
          <ErrorMessage error={error.message} />
        ) : (
          <CarsList
            cars={filteredCars}
            onDelete={deleteCarById}
            actionsDisabled={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default SellerCarList;
