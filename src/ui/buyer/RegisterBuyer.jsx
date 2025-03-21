import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownBoxLine,
  RiArrowLeftBoxLine,
  RiArrowRightBoxLine,
  RiArrowUpBoxLine,
} from "react-icons/ri";
import TextInputField from "../input/TextInputField";
import {
  MdOutlineAccountBalance,
  MdOutlineAlternateEmail,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineNumbers,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import PasswordInputField from "../input/PasswordInputField";
import { LuMailbox } from "react-icons/lu";
import ImageInputField from "../input/ImageInputField";
import FileInputField from "../input/FileInputField";
import NumberInputField from "../input/NumberInputField";
import ApiService from "../../api/ApiService";
import ErrorMessage from "../ErrorMessage";
import { PiSealCheckBold } from "react-icons/pi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const RegisterBuyer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buyerData, setBuyerData] = useState({
    name: "",
    phoneNumber: "",
    organisationNumber: "",
    organisationName: "",
    email: "",
    organisationAddress: {
      streetAddress: "",
      postalLocation: "",
      postalCode: "",
    },
    password: "",
  });
  const [organisationLicences, setOrganisationLicences] = useState([]);
  const [regStep, setRegStep] = useState(1);

  const postBuyerData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await ApiService.registerBuyer(buyerData, organisationLicences);
      setBuyerData({
        name: "",
        phoneNumber: "",
        organisationNumber: "",
        organisationName: "",
        email: "",
        organisationAddress: {
          streetAddress: "",
          postalLocation: "",
          postalCode: "",
        },
        password: "",
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
    setBuyerData((prevData) => ({
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
    postBuyerData();
  };

  return (
    <div
      ref={expandedRef}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`card_shadow hover:card_shadow_hover active:card_shadow_click mb-4 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-light-gray bg-gradient-to-bl from-swamp-100 to-distant-cloud ${!isExpanded ? "hover:-translate-y-1" : "-translate-y-1"} duration-300 md:w-[500px]`}
    >
      <div className="flex w-full flex-row items-center justify-between p-4">
        <h1 className="inline-block bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
          Register som Kjøper
        </h1>

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
            icon={
              <MdOutlineAlternateEmail className="h-6 w-auto" color="#333" />
            }
            initialValue={buyerData.email}
            onChange={handleInputChange}
          />
          <PasswordInputField
            label="Passord"
            name="password"
            icon={<MdPassword className="h-6 w-auto" color="#333" />}
            initialValue={buyerData.password}
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
            label="Navn"
            name="name"
            icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333" />}
            initialValue={buyerData.name}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Mobilnummer"
            name="phoneNumber"
            icon={<MdOutlinePhone className="h-6 w-auto" color="#333" />}
            initialValue={buyerData.phoneNumber}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Organisasjonsnavn"
            name="organisationName"
            icon={
              <MdOutlineAccountBalance className="h-6 w-auto" color="#333" />
            }
            initialValue={buyerData.organisationName}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Organisasjonsnummer"
            name="organisationNumber"
            icon={
              <MdOutlineAccountBalance className="h-6 w-auto" color="#333" />
            }
            initialValue={buyerData.organisationNumber}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Gateadresse"
            name="address"
            icon={<MdOutlineLocationOn className="h-6 w-auto" color="#333" />}
            initialValue={buyerData.organisationAddress.streetAddress}
            onChange={(e) =>
              setBuyerData((prev) => ({
                ...prev,
                organisationAddress: {
                  ...prev.organisationAddress,
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
                initialValue={buyerData.organisationAddress.postalLocation}
                onChange={(e) =>
                  setBuyerData((prev) => ({
                    ...prev,
                    organisationAddress: {
                      ...prev.organisationAddress,
                      postalLocation: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="basis-5/12">
              <NumberInputField
                label="Postnummer"
                name="postalCode"
                icon={<MdOutlineNumbers className="h-6 w-auto" color="#333" />}
                initialValue={buyerData.organisationAddress.postalCode}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/\D/g, "");

                  setBuyerData((prev) => ({
                    ...prev,
                    organisationAddress: {
                      ...prev.organisationAddress,
                      postalCode: numericValue,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <div className="mb-2 mt-1 flex w-full flex-col items-start">
            <p className="ml-5 text-sm font-medium text-light-gray md:text-base">
              Organisasjonslisens
            </p>
            <FileInputField
              files={organisationLicences}
              fileTypes={[
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/pdf",
              ]}
              setFiles={setOrganisationLicences}
            />
          </div>
          {error && <ErrorMessage error={error.message} />}
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <button
                type="button"
                className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-3 pt-3 text-medium-gray hover:bg-gradient-to-br hover:from-mirage hover:to-gunmental hover:text-lighthouse md:rounded-lg md:pb-2 md:pt-2"
                onClick={() => {
                  setRegStep(regStep - 1);
                }}
              >
                <RiArrowLeftBoxLine className="h-7 w-auto" />
              </button>
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
            </div>
          )}
        </form>
      )}
      {regStep == 3 && (
        <div className="mb-5 flex w-full flex-col items-center justify-center md:px-2">
          <PiSealCheckBold className="mt-9 h-28 w-auto" color="#416858" />
          <h1 className="mb-9 mt-3 text-center text-xl font-bold text-medium-gray md:text-2xl">
            Brukeren er registrert!
          </h1>
          <button
            onClick={() => {
              setIsExpanded(false);
              setRegStep(1);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              LUKK
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <AiOutlineCloseSquare className="h-6 w-auto" color="#FEFAF0" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterBuyer;
