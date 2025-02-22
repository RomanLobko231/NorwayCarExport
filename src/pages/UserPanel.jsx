import { useEffect, useState } from "react";
import {
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

const cars = [
  {
    id: "cwwewewdwed",
    make: "Toyota",
    model: "Cruise",
    imagePaths: ["../car3.jpg", "s"],
    registrationNumber: "AV45234",
    nextEUControl: "2026-04-07",
    kilometers: 12321,
    status: "Bid Placed",
  },
];

const UserPanel = () => {
  const [userData, setUserData] = useState({
    email: "email@gmail.com",
    password: "jcjcjecwjc",
    phoneNumber: "+4787662356",
    name: "Test Name",
    address: "Storgata 22, Oslo, 0717",
  });
  const [inputDisabled, setInputDisabled] = useState(true);
  const [carFilter, setCarFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    setCarFilter(e.target.value);
    const updatedCars = cars.filter((car) => car.status === e.target.value);
    setFilteredCars(updatedCars);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pt-20 md:px-0 md:pt-28">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
        <div
          className={`flex flex-col items-center rounded-lg ${!inputDisabled && "card_shadow"} border border-light-gray bg-slate-50 p-6 md:col-span-2`}
        >
          <div className="mb-5 flex w-full flex-col flex-wrap items-center justify-between gap-2 md:flex-row md:items-end">
            <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
              STYREPANEL
            </h1>
            <div
              className={`card_shadow hover:button_shadow_hover ${!inputDisabled && "hidden"} active:button_shadow_click cursor-pointer rounded-lg border border-medium-gray bg-lighthouse from-mirage to-swamp-500 px-2 py-1 text-lg font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-xl`}
              onClick={() => {
                setInputDisabled(false);
              }}
            >
              Endre info
            </div>
            <div
              className={`flex flex-row items-center ${inputDisabled && "hidden"} gap-2`}
            >
              <div
                className={`card_shadow hover:button_shadow_hover active:button_shadow_click cursor-pointer rounded-lg border border-medium-gray bg-lighthouse from-mirage to-swamp-500 px-2 py-1 text-lg font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-xl`}
                onClick={() => {
                  console.log(userData);
                  setInputDisabled(true);
                }}
              >
                Lagre info
              </div>
              <div
                className={`card_shadow hover:button_shadow_hover active:button_shadow_click cursor-pointer rounded-lg border border-medium-gray bg-lighthouse px-2 py-1 text-lg font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gunmental hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-xl`}
                onClick={() => {
                  setInputDisabled(true);
                }}
              >
                Avbryt
              </div>
            </div>
          </div>
          <hr className="mb-3 w-full border-[1px] border-dashed border-gunmental px-2" />

          <div className="flex w-full flex-col items-center md:flex-row md:items-start">
            <div className="flex w-full flex-col items-center justify-around rounded-lg border border-light-gray bg-white p-2 md:mt-8 md:w-auto">
              <img
                src="../icons/buyer_profile_icon.png"
                alt="User"
                className="mb-3 mt-2 h-36 w-36 object-contain"
              />
              <div className="mb-3 flex flex-col items-center">
                <h1 className="text-center text-lg font-thin text-light-gray md:text-xl">
                  Status:
                </h1>
                <p className="text-center text-lg font-bold text-medium-gray md:text-2xl">
                  BUYER
                </p>
              </div>
            </div>

            <div className="mt-4 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 md:ml-6 md:mt-0">
              <TextInputField
                label="Navn"
                name="name"
                icon={
                  <MdOutlinePerson2 className="h-6 w-auto" color="#333333" />
                }
                initialValue={userData.name}
                onChange={handleInputChange}
                disabled={inputDisabled}
              />
              <TextInputField
                label="Mobilnummer"
                name="phoneNumber"
                icon={<MdOutlinePhone className="h-6 w-auto" color="#333333" />}
                initialValue={userData.phoneNumber}
                onChange={handleInputChange}
                disabled={inputDisabled}
              />
              <TextInputField
                label="Epost"
                name="email"
                type="email"
                icon={<MdOutlineEmail className="h-6 w-auto" color="#333333" />}
                initialValue={userData.email}
                onChange={handleInputChange}
                disabled={inputDisabled}
              />
              <PasswordInputField
                label="Passord"
                name="password"
                icon={<MdPassword className="h-6 w-auto" color="#333333" />}
                initialValue={userData.password}
                onChange={handleInputChange}
                disabled={inputDisabled}
              />
              <TextInputField
                label="Adresse"
                name="address"
                icon={
                  <MdOutlineLocationOn className="h-6 w-auto" color="#333333" />
                }
                initialValue={userData.address}
                onChange={handleInputChange}
                disabled={inputDisabled}
              />
            </div>
          </div>
        </div>

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
        </div>
        <CarsList cars={filteredCars} onDelete={() => {}} />
      </div>
    </div>
  );
};

export default UserPanel;
