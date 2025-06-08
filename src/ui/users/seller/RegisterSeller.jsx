import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownBoxLine,
  RiArrowLeftBoxLine,
  RiArrowRightBoxLine,
  RiArrowUpBoxLine,
} from "react-icons/ri";
import {
  MdOutlineAlternateEmail,
  MdOutlineLocationOn,
  MdOutlineNumbers,
  MdOutlineOutbox,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import { LuMailbox } from "react-icons/lu";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { PiSealCheckBold } from "react-icons/pi";
import ErrorMessage from "../../message/ErrorMessage";
import TextInputField from "../../input/TextInputField";
import PasswordInputField from "../../input/PasswordInputField";
import UserApiService from "../../../api/UserApiService";
import { useTranslation } from "react-i18next";

const RegisterSeller = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sellerData, setSellerData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: { streetAddress: "", postalLocation: "", postalCode: "" },
  });
  const [regStep, setRegStep] = useState(1);

  const postSellerData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await UserApiService.registerSeller(sellerData);
      setSellerData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: { streetAddress: "", postalLocation: "", postalCode: "" },
      });
      setRegStep(3);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    setRegStep(2);
  };

  const submitFinalStep = (e) => {
    e.preventDefault();
    postSellerData();
  };

  return (
    <div
      ref={expandedRef}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`card_shadow hover:card_shadow_hover active:card_shadow_click mb-4 w-full cursor-pointer rounded-lg border border-light-gray bg-gradient-to-bl from-swamp-100 to-distant-cloud ${!isExpanded ? "hover:-translate-y-1" : "-translate-y-1"} duration-300 md:w-[500px]`}
    >
      <div className="flex w-full flex-row items-center justify-between p-4">
        <h1 className="inline-block bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
          {t("register_as_seller")}
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
            label={t("email")}
            name="email"
            type="email"
            icon={<MdOutlineAlternateEmail className="h-6 w-auto" />}
            initialValue={sellerData.email}
            onChange={handleInputChange}
          />
          <PasswordInputField
            label={t("password")}
            name="password"
            icon={<MdPassword className="h-6 w-auto" color="#333" />}
            initialValue={sellerData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              {t("next")}
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
            label={t("name")}
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" />}
            initialValue={sellerData.name}
            onChange={handleInputChange}
          />
          <TextInputField
            label={t("phone_number")}
            name="phoneNumber"
            icon={<MdOutlinePhone className="h-6 w-auto" />}
            initialValue={sellerData.phoneNumber}
            onChange={handleInputChange}
          />
          <TextInputField
            label={t("street_address")}
            name="streetAddress"
            icon={<MdOutlineLocationOn className="h-6 w-auto" color="#333" />}
            initialValue={sellerData.address.streetAddress}
            onChange={(e) =>
              setSellerData((prev) => ({
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
                label={t("postal_location")}
                name="postalLocation"
                icon={<LuMailbox className="h-6 w-auto" color="#333" />}
                initialValue={sellerData.address.postalLocation}
                onChange={(e) =>
                  setSellerData((prev) => ({
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
                label={t("postal_code")}
                name="postalCode"
                icon={<MdOutlineNumbers className="h-6 w-auto" color="#333" />}
                initialValue={sellerData.address.postalCode}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/\D/g, "");

                  setSellerData((prev) => ({
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
          {error && <ErrorMessage error={error.message} />}
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <button
                type="button"
                className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 py-1 text-medium-gray hover:bg-gradient-to-br hover:from-mirage hover:to-gunmental hover:text-lighthouse md:rounded-lg md:px-4 md:py-2"
                onClick={() => {
                  setRegStep(regStep - 1);
                }}
              >
                <RiArrowLeftBoxLine className="h-7 w-auto" />
              </button>
              <button
                type="submit"
                className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
              >
                <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                  {t("send")}
                </span>
                <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                <MdOutlineOutbox className="h-6 w-auto" color="#FEFAF0" />
              </button>
            </div>
          )}
        </form>
      )}
      {regStep == 3 && (
        <div className="mb-5 flex w-full flex-col items-center justify-center px-2">
          <PiSealCheckBold className="mt-9 h-28 w-auto" color="#416858" />
          <h1 className="mb-9 mt-3 text-center text-xl font-bold text-medium-gray md:text-2xl">
            {t("user_registered")}
          </h1>
          <button
            onClick={() => {
              setIsExpanded(false);
              setRegStep(1);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              {t("close")}
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <AiOutlineCloseSquare className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterSeller;
