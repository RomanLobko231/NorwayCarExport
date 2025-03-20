import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useState } from "react";
import ApiService from "../../api/ApiService";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import {
  MdClose,
  MdOutlineAlternateEmail,
  MdOutlineDirectionsCar,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineNumbers,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdOutlineSpeed,
  MdPassword,
} from "react-icons/md";
import ImageInputField from "../input/ImageInputField";
import FileInputField from "../input/FileInputField";
import PasswordInputField from "../input/PasswordInputField";
import {
  RiArrowLeftBoxLine,
  RiArrowRightBoxLine,
  RiArrowUpBoxLine,
} from "react-icons/ri";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { PiSealCheckBold } from "react-icons/pi";
import ErrorMessage from "../ErrorMessage";
import { LuMailbox } from "react-icons/lu";

const SellerModal = ({ open, setOpen }) => {
  const [sellerData, setSellerData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: { streetAddress: "", postalLocation: "", postalCode: "" },
  });
  const [carData, setCarData] = useState({
    ownerId: "",
    registrationNumber: "",
    kilometers: "",
  });
  const [error, setError] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [regStep, setRegStep] = useState(1);

  const postSellerData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const savedUser = await ApiService.registerSeller(sellerData);
      setSellerData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: { streetAddress: "", postalLocation: "", postalCode: "" },
      });
      console.log(savedUser);
      setCarData((prevData) => ({
        ...prevData,
        ownerId: savedUser.data.userId,
      }));
      setRegStep(3);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const postCarData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await ApiService.postCarData(carData, uploadImages);
      setCarData({
        ownerId: "",
        registrationNumber: "",
        kilometers: "",
      });
      setUploadImages([]);
      setRegStep(4);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitFirstStep = (e) => {
    e.preventDefault();
    setRegStep(2);
  };

  const submitSecondStep = (e) => {
    e.preventDefault();
    postSellerData();
  };

  const submitFinalStep = (e) => {
    e.preventDefault();
    postCarData();
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-light-gray bg-gradient-to-bl from-swamp-100 to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <div className="mb-2 flex flex-row items-center justify-between md:px-2">
              <h1 className="mb-1 whitespace-nowrap text-center text-2xl font-bold text-medium-gray md:text-3xl">
                Fyll ut skjemaet
              </h1>
              <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdClose
                className="h-6 w-6 hover:opacity-25"
                color="#333333"
                onClick={() => setOpen(false)}
              />
            </div>
            <div
              className={`my-5 flex w-full flex-row gap-1 md:px-2 ${regStep == 3 && "hidden"}`}
            >
              <div
                className={`h-[3px] w-full rounded-full bg-swamp-500 opacity-100`}
              ></div>
              <div
                className={`h-[3px] w-full rounded-full ${regStep > 1 ? "bg-swamp-500 opacity-100" : "bg-light-gray opacity-50"} `}
              ></div>
              <div
                className={`h-[3px] w-full rounded-full ${regStep > 2 ? "bg-swamp-500 opacity-100" : "bg-light-gray opacity-50"} `}
              ></div>
            </div>
            {regStep == 1 && (
              <form
                className="flex w-full flex-col items-center md:px-2"
                onSubmit={submitFirstStep}
              >
                <TextInputField
                  label="Epost"
                  name="email"
                  type="email"
                  icon={
                    <MdOutlineAlternateEmail
                      className="h-6 w-auto"
                      color="#333"
                    />
                  }
                  initialValue={sellerData.email}
                  onChange={handleUserInputChange}
                />
                <PasswordInputField
                  label="Passord"
                  name="password"
                  icon={<MdPassword className="h-6 w-auto" color="#333" />}
                  initialValue={sellerData.password}
                  onChange={handleUserInputChange}
                />

                {error && <ErrorMessage error={error.message} />}
                {isLoading ? (
                  <p>Loading..</p>
                ) : (
                  <button
                    type="submit"
                    className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
                  >
                    <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                      NESTE
                    </span>
                    <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                    <RiArrowRightBoxLine
                      className="h-6 w-auto"
                      color="#FEFAF0"
                    />
                  </button>
                )}
              </form>
            )}
            {regStep == 2 && (
              <form
                className="flex w-full flex-col items-center md:px-2"
                onSubmit={submitSecondStep}
              >
                <TextInputField
                  label="Navn"
                  name="name"
                  icon={
                    <MdOutlinePerson2 className="h-6 w-auto" color="#333" />
                  }
                  initialValue={sellerData.name}
                  onChange={handleUserInputChange}
                />
                <TextInputField
                  label="Mobilnummer"
                  name="phoneNumber"
                  icon={<MdOutlinePhone className="h-6 w-auto" color="#333" />}
                  initialValue={sellerData.phoneNumber}
                  onChange={handleUserInputChange}
                />
                <TextInputField
                  label="Gateadresse"
                  name="streetAddress"
                  icon={
                    <MdOutlineLocationOn className="h-6 w-auto" color="#333" />
                  }
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
                      label="Poststed (By)"
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
                    <NumberInputField
                      label="Postnummer"
                      name="postalCode"
                      icon={
                        <MdOutlineNumbers className="h-6 w-auto" color="#333" />
                      }
                      initialValue={sellerData.address.postalCode}
                      onChange={(e) =>
                        setSellerData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            postalCode: e.target.value,
                          },
                        }))
                      }
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
                        NESTE
                      </span>
                      <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                      <RiArrowRightBoxLine
                        className="h-6 w-auto"
                        color="#FEFAF0"
                      />
                    </button>
                  </div>
                )}
              </form>
            )}
            {regStep == 3 && (
              <form
                className="flex w-full flex-col items-center md:px-2"
                onSubmit={submitFinalStep}
              >
                <div className="flex w-full flex-row gap-3">
                  <TextInputField
                    label="Registrasjonr."
                    name="registrationNumber"
                    icon={
                      <MdOutlineDirectionsCar
                        className="h-6 w-auto"
                        color="#333"
                      />
                    }
                    initialValue={carData.registrationNumber}
                    onChange={handleCarInputChange}
                  />
                  <NumberInputField
                    label="Kilometerstand"
                    name="kilometers"
                    icon={
                      <MdOutlineSpeed className="h-6 w-auto" color="#333" />
                    }
                    initialValue={carData.kilometers}
                    onChange={handleCarInputChange}
                  />
                </div>
                <p className="mt-3 text-center text-sm font-light italic text-light-gray md:text-base">
                  Last opp bilder allerede nå, hvis du vil
                </p>
                <FileInputField
                  files={uploadImages}
                  fileTypes={["image/jpeg", "image/png"]}
                  setFiles={setUploadImages}
                />
                {error && <ErrorMessage error={error.message} />}
                {isLoading ? (
                  <p>Loading..</p>
                ) : (
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
                )}
              </form>
            )}
            {regStep == 4 && (
              <div className="flex w-full flex-col items-center justify-center md:px-2">
                <PiSealCheckBold className="mt-9 h-20 w-auto" color="#416858" />
                <h1 className="mb-9 mt-3 text-center text-xl font-bold text-medium-gray md:text-2xl">
                  Søknad er sendt!
                </h1>
                <button
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      setRegStep(1);
                    }, 2000);
                  }}
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-3 pt-3 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg md:pb-2 md:pt-2"
                >
                  <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                    LUKK
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

export default SellerModal;
