import { useEffect, useState } from "react";
import {
  MdEdit,
  MdOutlineArrowForward,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import TextInputField from "../ui/input/TextInputField";
import PasswordInputField from "../ui/input/PasswordInputField";
import CarsList from "../ui/car/CarsList";
import OptionsInput from "../ui/input/OptionsInput";
import UserDataPanel from "../ui/users/UserDataPanel";
import { useNavigate, useParams } from "react-router-dom";
import { RiAddBoxLine } from "react-icons/ri";
import UserApiService from "../api/UserApiService";
import CarApiService from "../api/CarApiService";
import ErrorDialog from "../ui/dialog/ErrorDialog";

const cars1 = [
  {
    id: "1234",
    imagePaths: ["../zoe_example.jpg"],
    make: "Toyota",
    model: "Aventador",
    registrationNumber: "AV12345",
    status: "Sold",
    kilometers: 1234,
    nextEUControl: "11-11-2027",
    engineType: "Elektrisk",
    firstTimeRegisteredInNorway: "2009",
  },
];

const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [carFilter, setCarFilter] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState(cars);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserById(params.id);
  }, []);

  const fetchUserById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await UserApiService.getUserById(id);
      const cars = await CarApiService.getCarsByOwnerId(id);
      setUserData(user.data);
      setCars(cars.data);
      setFilteredCars(cars.data);
      setError(null);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(userData);
      const user = await UserApiService.updateUser(userData);
      setUserData(user.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCarById = async (id) => {
    try {
      setError(null);
      await CarApiService.deleteCarById(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
      setFilteredCars((prev) => prev.filter((car) => car.id !== id));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    }
  };

  const handleFilterChange = (e) => {
    setCarFilter(e.target.value);
    const updatedCars = cars.filter((car) => car.status === e.target.value);
    setFilteredCars(updatedCars);
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
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {!isLoading && !error && userData && (
        <div
          className={`flex w-full flex-col items-center justify-center px-4 pt-20`}
        >
          <UserDataPanel user={userData} updateUser={updateUser} />
          <div
            className={`mt-5 ${userData.role == "BUYER" ? "hidden max-w-7xl" : "max-w-5xl"} flex w-full flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-4 md:p-6`}
          >
            <div className="mb-6 flex w-full flex-col flex-wrap items-center justify-start md:flex-row">
              <h1 className="mb-4 text-center text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
                BILUTVALG
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
                  navigate(`/user/${userData.id}/add-car`);
                }}
                className="buttonsh hover:button_shadow_hover active:button_shadow_click group mt-1 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:ml-auto md:mt-0 md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
              >
                <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                  LEGG TIL
                </span>
                <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                <RiAddBoxLine className="h-6 w-auto" color="#FEFAF0" />
              </button>
            </div>
            <CarsList cars={filteredCars} onDelete={deleteCarById} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
