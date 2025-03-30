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
import ApiService from "../api/ApiService";
import UserDataPanel from "../ui/users/UserDataPanel";
import { useNavigate, useParams } from "react-router-dom";
import { RiAddBoxLine } from "react-icons/ri";

const cars = [
  {
    id: "1234",
    imagePaths: ["../car2.jpg"],
    make: "Toyota",
    model: "Aventador",
    registrationNumber: "AV12345",
    status: "Sold",
    kilometers: 1234,
    nextEUControl: "11-11-2027",
  },
];

const UserPanel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [carFilter, setCarFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserById(params.id);
  }, []);

  const fetchUserById = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const user = await ApiService.getUserById(id);
      //setUserData(user.data);
      console.log(user);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setCarFilter(e.target.value);
    const updatedCars = cars.filter((car) => car.status === e.target.value);
    setFilteredCars(updatedCars);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pt-20 md:px-0 md:pt-28">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
        {isLoading ? <p>Loading...</p> : <UserDataPanel user={userData} />}

        <div className="flex flex-col items-center gap-3 md:gap-5">
          <div className="flex w-full flex-row items-center rounded-lg border border-light-gray bg-slate-50 p-8 pt-5">
            <h1 className="text-6xl font-semibold text-medium-gray md:text-8xl">
              3
            </h1>
            <p className="ml-3 text-xl md:text-2xl">biler kjøpt totalt.</p>
          </div>
          <div className="flex w-full flex-row items-center rounded-lg border border-light-gray bg-slate-50 p-8 pt-5">
            <h1 className="text-6xl font-semibold text-medium-gray md:text-8xl">
              5
            </h1>
            <p className="ml-3 text-xl md:text-2xl">
              biler er tilgjengelig for kjøp.
            </p>
          </div>
          <div
            className={`buttonsh hover:button_shadow_hover active:button_shadow_click flex h-full w-full cursor-pointer flex-row items-center justify-center rounded-lg border border-medium-gray bg-lighthouse from-mirage to-swamp-500 px-2 py-1 text-2xl font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-3xl`}
            onClick={() => {}}
          >
            <p className="text-center">SE NYE TILBUD</p>
            <MdOutlineArrowForward className="ml-3 h-8 w-auto" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full max-w-7xl flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-6">
        <div className="mb-6 flex w-full flex-col flex-wrap items-center justify-start md:flex-row">
          <h1 className="mb-4 text-center text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
            BILUTVALG
          </h1>
          <div className="ml-3 mr-3 hidden h-[14px] border-l-2 border-solid border-gunmental md:ml-4 md:mr-0 md:block md:h-5"></div>
          <OptionsInput
            options={["Sold", "On Auction", "Bid Placed"]}
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
              navigate("/add-car");
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group ml-auto flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              LEGG TIL
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <RiAddBoxLine className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </div>
        <CarsList cars={filteredCars} onDelete={() => {}} />
      </div>
    </div>
  );
};

export default UserPanel;
