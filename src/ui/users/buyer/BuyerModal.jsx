import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  MdClose,
  MdOutlineAccountBalance,
  MdOutlineAlternateEmail,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineNumbers,
  MdOutlineOutbox,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdPassword,
} from "react-icons/md";
import { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { PiSealCheckBold } from "react-icons/pi";
import {
  RiArrowLeftBoxLine,
  RiArrowRightBoxLine,
  RiArrowUpBoxLine,
} from "react-icons/ri";
import { LuMailbox } from "react-icons/lu";
import UserApiService from "../../../api/UserApiService";
import TextInputField from "../../input/TextInputField";
import PasswordInputField from "../../input/PasswordInputField";
import FileInputField from "../../input/FileInputField";
import ErrorMessage from "../../message/ErrorMessage";
import { useTranslation } from "react-i18next";

const BuyerModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
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
      country: "",
    },
    password: "",
  });
  const [organisationLicences, setOrganisationLicences] = useState([]);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [regStep, setRegStep] = useState(1);

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
    if (organisationLicences.length < 1) {
      setFileError(true);
      return;
    }
    if (!termsChecked) return;

    postBuyerData();
  };

  const postBuyerData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await UserApiService.registerBuyer(buyerData, organisationLicences);
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
          country: "",
        },
        password: "",
      });
      setOrganisationLicences([]);
      setRegStep(3);
      setError(null);
      setFileError(false);
      setTermsChecked(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full w-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-swamp-500 bg-gradient-to-bl from-swamp-100 to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <div className="mb-2 flex flex-row items-center justify-between md:px-2">
              <h1 className="mb-1 whitespace-nowrap text-center text-xl font-bold text-medium-gray md:text-2xl">
                {t("fill_form")}
              </h1>
              <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdClose
                className="h-6 w-6 hover:opacity-25"
                color="#333333"
                onClick={() => setOpen(false)}
              />
            </div>
            <div
              className={`my-5 flex w-full flex-row gap-1 ${regStep == 3 && "hidden"} md:px-2`}
            >
              <div
                className={`h-[3px] w-full rounded-full ${regStep == 2 ? "bg-swamp-500 opacity-100" : "bg-light-gray opacity-50"} `}
              ></div>
              <div
                className={`h-[3px] w-full rounded-full bg-light-gray opacity-50`}
              ></div>
            </div>

            {regStep == 1 && (
              <form
                className="flex w-full flex-col items-center md:px-2"
                onSubmit={submitFirstStep}
                onClick={(e) => e.stopPropagation()}
              >
                <TextInputField
                  label={t("email")}
                  name="email"
                  type="email"
                  icon={
                    <MdOutlineAlternateEmail
                      className="h-6 w-auto"
                      color="#333"
                    />
                  }
                  initialValue={buyerData.email}
                  onChange={handleInputChange}
                />
                <PasswordInputField
                  label={t("password")}
                  name="password"
                  icon={<MdPassword className="h-6 w-auto" color="#333" />}
                  initialValue={buyerData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-2 pt-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
                >
                  <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                    {t("next")}
                  </span>
                  <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                  <RiArrowRightBoxLine className="h-6 w-auto" color="#FEFAF0" />
                </button>
              </form>
            )}

            {regStep == 2 && (
              <form
                className="flex w-full flex-col items-center md:px-2"
                onSubmit={submitFinalStep}
                onClick={(e) => e.stopPropagation()}
              >
                <TextInputField
                  label={t("name")}
                  name="name"
                  icon={
                    <MdOutlinePerson2 className="h-6 w-auto" color="#333" />
                  }
                  initialValue={buyerData.name}
                  onChange={handleInputChange}
                />
                <TextInputField
                  label={t("phone_number")}
                  name="phoneNumber"
                  icon={<MdOutlinePhone className="h-6 w-auto" color="#333" />}
                  initialValue={buyerData.phoneNumber}
                  onChange={handleInputChange}
                />
                <TextInputField
                  label={t("organisation_name")}
                  name="organisationName"
                  icon={
                    <MdOutlineAccountBalance
                      className="h-6 w-auto"
                      color="#333"
                    />
                  }
                  initialValue={buyerData.organisationName}
                  onChange={handleInputChange}
                />
                <TextInputField
                  label={t("organisation_number")}
                  name="organisationNumber"
                  icon={
                    <MdOutlineAccountBalance
                      className="h-6 w-auto"
                      color="#333"
                    />
                  }
                  initialValue={buyerData.organisationNumber}
                  onChange={handleInputChange}
                />
                <TextInputField
                  label={t("street_address")}
                  name="address"
                  icon={
                    <MdOutlineLocationOn className="h-6 w-auto" color="#333" />
                  }
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
                      label={t("postal_location")}
                      name="postalLocation"
                      icon={<LuMailbox className="h-6 w-auto" color="#333" />}
                      initialValue={
                        buyerData.organisationAddress.postalLocation
                      }
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
                    <TextInputField
                      label={t("postal_code")}
                      name="postalCode"
                      icon={
                        <MdOutlineNumbers className="h-6 w-auto" color="#333" />
                      }
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
                <TextInputField
                  label={t("country")}
                  name="country"
                  icon={
                    <MdOutlineLocationOn className="h-6 w-auto" color="#333" />
                  }
                  initialValue={buyerData.organisationAddress.country}
                  onChange={(e) =>
                    setBuyerData((prev) => ({
                      ...prev,
                      organisationAddress: {
                        ...prev.organisationAddress,
                        country: e.target.value,
                      },
                    }))
                  }
                />
                <div className="mb-2 mt-1 flex w-full flex-col items-start">
                  <p className="ml-5 text-sm font-medium text-light-gray md:text-base">
                    {t("organisation_licence")}
                  </p>
                  <FileInputField
                    files={organisationLicences}
                    fileTypes={[
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      "application/pdf",
                    ]}
                    setFiles={setOrganisationLicences}
                    error={fileError}
                  />
                </div>
                <label
                  className={`text-md mt-2 flex cursor-pointer items-center sm:text-lg ${
                    termsChecked
                      ? "font-semibold text-gunmental"
                      : "font-medium text-light-gray"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={() => {
                      setTermsChecked((checked) => !checked);
                    }}
                    className="mr-2 h-5 w-5 cursor-pointer accent-gunmental"
                  />
                  {t("terms_check")}
                </label>
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
                      <RiArrowLeftBoxLine className="h-7 w-auto md:h-7" />
                    </button>
                    <button
                      type="submit"
                      className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-2 pt-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
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
              <div className="mb-5 flex w-full flex-col items-center justify-center md:px-2">
                <PiSealCheckBold className="mt-9 h-28 w-auto" color="#416858" />
                <h1 className="mb-9 mt-3 text-center text-xl font-bold text-medium-gray md:text-2xl">
                  {t("user_registered")}
                </h1>
                <button
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      setRegStep(1);
                    }, 2000);
                  }}
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
                >
                  <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                    {t("close")}
                  </span>
                  <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                  <AiOutlineCloseSquare
                    className="h-6 w-auto"
                    color="#FEFAF0"
                  />
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BuyerModal;
