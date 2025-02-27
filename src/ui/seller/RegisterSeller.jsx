import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownBoxLine,
  RiArrowRightBoxLine,
  RiArrowUpBoxLine,
} from "react-icons/ri";
import TextInputField from "../input/TextInputField";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePassword,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import PasswordInputField from "../input/PasswordInputField";

const RegisterSeller = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef(null);
  const [sellerData, setSellerData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
    address: "",
  });
  const [regStep, setRegStep] = useState(1);

  useEffect(() => {
    if (isExpanded && expandedRef.current) {
      expandedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isExpanded, regStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitFirstStep = (e) => {
    e.preventDefault();
    console.log(sellerData);
    setRegStep(2);
  };

  const submitFinalStep = (e) => {
    e.preventDefault();
    console.log(sellerData);
    setRegStep(1);
  };

  return (
    <div
      ref={expandedRef}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`from-swamp-100 card_shadow hover:card_shadow_hover active:card_shadow_click mb-4 w-full cursor-pointer rounded-xl border border-light-gray bg-gradient-to-bl to-distant-cloud ${!isExpanded ? "hover:-translate-y-1" : "-translate-y-1"} duration-300 md:w-[500px]`}
    >
      <div className="flex w-full flex-row items-center justify-between p-4">
        <h1 className="inline-block bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
          Register som Selger
        </h1>
        <div>
          {isExpanded ? (
            <RiArrowUpBoxLine
              className="h-10 w-auto hover:opacity-50 active:opacity-10"
              color="#333333"
            />
          ) : (
            <RiArrowDownBoxLine
              className="h-10 w-auto hover:opacity-50 active:opacity-10"
              color="#333333"
            />
          )}
        </div>
      </div>

      {regStep == 1 && isExpanded && (
        <form
          className="flex w-full flex-col items-center border-t p-4 text-base font-medium text-medium-gray"
          onSubmit={submitFirstStep}
          onClick={(e) => e.stopPropagation()}
        >
          <TextInputField
            label="Epost"
            name="email"
            type="email"
            icon={<MdOutlineEmail className="h-6 w-auto" />}
            initialValue={sellerData.email}
            onChange={handleInputChange}
          />
          <PasswordInputField
            label="Passord"
            name="password"
            icon={<MdPassword className="h-6 w-auto" color="#333" />}
            initialValue={sellerData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              NESTE
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <RiArrowRightBoxLine className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </form>
      )}
      {regStep == 2 && isExpanded && (
        <form
          className="flex w-full flex-col items-center border-t p-4 text-base font-medium text-medium-gray"
          onSubmit={submitFinalStep}
          onClick={(e) => e.stopPropagation()}
        >
          <TextInputField
            label="Fult Navn"
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" />}
            initialValue={sellerData.name}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Mobilnummer"
            name="phoneNumber"
            icon={<MdOutlinePhone className="h-6 w-auto" />}
            initialValue={sellerData.phoneNumber}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Adresse"
            name="address"
            icon={<MdOutlineLocationOn className="h-6 w-auto" color="#333" />}
            initialValue={sellerData.address}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              SEND
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <RiArrowUpBoxLine className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterSeller;
