import { useState } from "react";
import {
  MdEdit,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineNumbers,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import TextInputField from "../input/TextInputField";
import { LuMailbox } from "react-icons/lu";

const UserDataPanel = (user) => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [userData, setUserData] = useState({
    name: "UserName",
    phoneNumber: "12356112",
    email: "email@gmail.com",
    address: {
      streetAddress: "Karl Johan, 123",
      postalLocation: "Oslo",
      postalCode: "0701",
    },
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className={`flex flex-col items-center rounded-lg ${!inputDisabled && "card_shadow"} border border-light-gray bg-slate-50 p-6 md:col-span-2`}
    >
      <div className="mb-5 flex w-full flex-col flex-wrap items-center justify-between gap-2 md:flex-row md:items-end">
        <div
          className={`flex w-full ${inputDisabled && "justify-between md:w-full"} flex-row items-center justify-center md:w-auto`}
        >
          <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
            STYREPANEL
          </h1>
          <div
            className={`buttonsh hover:button_shadow_hover ${!inputDisabled && "hidden"} active:button_shadow_click flex cursor-pointer flex-row items-center rounded-lg border border-medium-gray bg-lighthouse from-mirage to-swamp-500 px-2 py-1 text-lg font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-xl`}
            onClick={() => {
              setInputDisabled(false);
            }}
          >
            <p className="hidden md:block">Endre info</p>
            <MdEdit className="m-1 h-5 w-auto md:ml-2" />
          </div>
        </div>
        <div
          className={`flex flex-row items-center ${inputDisabled && "hidden"} gap-2`}
        >
          <div
            className={`buttonsh hover:button_shadow_hover active:button_shadow_click cursor-pointer rounded-lg border border-medium-gray bg-lighthouse from-mirage to-swamp-500 px-2 py-1 text-lg font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-xl`}
            onClick={() => {
              setInputDisabled(true);
            }}
          >
            Lagre info
          </div>
          <div
            className={`buttonsh hover:button_shadow_hover active:button_shadow_click cursor-pointer rounded-lg border border-medium-gray bg-lighthouse px-2 py-1 text-lg font-semibold text-medium-gray duration-300 hover:-translate-y-1 hover:bg-gunmental hover:text-lighthouse md:px-4 md:pb-2 md:pt-1 md:text-xl`}
            onClick={() => {
              setInputDisabled(true);
            }}
          >
            Avbryt
          </div>
        </div>
      </div>
      <hr className="mb-3 hidden w-full border-[1px] border-dashed border-gunmental px-2 md:block" />

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
              SELGER
            </p>
          </div>
        </div>

        <div className="mt-4 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 md:ml-6 md:mt-0">
          <TextInputField
            label="Navn"
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333333" />}
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
          <TextInputField
            label="Gateadresse"
            name="streetAddress"
            icon={<MdOutlineLocationOn className="h-6 w-auto" color="#333" />}
            initialValue={userData.address.streetAddress}
            disabled={inputDisabled}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  streetAddress: e.target.value,
                },
              }))
            }
          />
          <div className="flex w-full flex-row gap-2">
            <div className="basis-7/12">
              <TextInputField
                label="Poststed (By)"
                name="postalLocation"
                icon={<LuMailbox className="h-6 w-auto" color="#333" />}
                initialValue={userData.address.postalLocation}
                disabled={inputDisabled}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      postalLocation: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="basis-5/12">
              <TextInputField
                label="Postnummer"
                name="postalCode"
                icon={<MdOutlineNumbers className="h-6 w-auto" color="#333" />}
                initialValue={userData.address.postalCode}
                disabled={inputDisabled}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/\D/g, "");

                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      postalCode: numericValue,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataPanel;
