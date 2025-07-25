import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import OptionsInput from "../../input/OptionsInput";
import { RiAddBoxLine } from "react-icons/ri";
import CarsList from "../../car/CarsList";
import CarApiService from "../../../api/CarApiService";
import ErrorDialog from "../../dialog/ErrorDialog";
import ErrorMessage from "../../message/ErrorMessage";
import { useTranslation } from "react-i18next";
import PageArrows from "../../PageArrows";

const SellerCarList = () => {
  const { t } = useTranslation("common", "user");
  const [cars, setCars] = useState([]);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const CAR_STATUSES = [
    { label: t("in_review"), value: "Vurdering" },
    { label: t("sold"), value: "Solgt" },
    { label: t("on_auction"), value: "Auksjon" },
    { label: t("other"), value: "Annet" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || CAR_STATUSES.at(0).value;
  const [carFilter, setCarFilter] = useState(statusParam);

  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const updateFilter = (newFilter) => {
    setCarFilter(newFilter);
    setSearchParams({ status: newFilter });
  };

  useEffect(() => {
    fetchUserCars(params.id, carFilter);
  }, [carFilter, page]);

  const fetchUserCars = async (id, status) => {
    setIsLoading(true);
    setError(null);
    try {
      const cars = await CarApiService.getCarsByOwnerIdAndStatusPaged(
        id,
        status,
        page,
        size,
      );
      setCars(cars.data.items);
      setTotalPages(cars.data.totalPages);
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
          <div className="md:scrollbar-hide ml-3 flex w-full flex-row items-center gap-4 overflow-x-auto whitespace-nowrap p-0 md:w-auto">
            {CAR_STATUSES.map((filter) => (
              <h1
                className={`mb-2 cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium md:mb-0 ${
                  carFilter == filter.value
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
          <button
            onClick={() => {
              navigate(`/user/${params.id}/add-car`);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mt-4 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:ml-auto md:mt-0 md:space-x-2 md:rounded-lg"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              {t("add").toUpperCase()}
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <RiAddBoxLine className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </div>

        {error && !isErrorOpen ? (
          <ErrorMessage error={error.message} />
        ) : (
          <CarsList
            cars={cars}
            onDelete={deleteCarById}
            actionsDisabled={isLoading}
          />
        )}
        <PageArrows page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default SellerCarList;
