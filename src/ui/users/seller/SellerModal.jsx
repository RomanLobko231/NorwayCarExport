import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useState } from "react";
import UserApiService from "../../../api/UserApiService";
import TextInputField from "../../input/TextInputField";
import {
  MdClose,
  MdOutlineDirectionsCar,
  MdOutlineOutbox,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdOutlineSpeed,
} from "react-icons/md";
import FileInputField from "../../input/FileInputField";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { PiSealCheckBold } from "react-icons/pi";
import ErrorMessage from "../../ErrorMessage";
import { useTranslation } from "react-i18next";
import CarApiService from "../../../api/CarApiService";
import { GiMoneyStack } from "react-icons/gi";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import NumberInputField from "../../input/NumberInputField";

const SellerModal = ({ open, setOpen }) => {
  const { t } = useTranslation();

  const [sellerData, setSellerData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [carData, setCarData] = useState({
    ownerId: "",
    registrationNumber: "",
    kilometers: 0,
    expectedPrice: 0,
  });
  const [error, setError] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [regStep, setRegStep] = useState(1);

  const postCarApplication = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setError(null);
      const savedUser = await UserApiService.registerOneTimeSeller(sellerData);
      const updatedCarData = {
        ...carData,
        ownerId: savedUser.data.userId,
      };
      console.log(updatedCarData);
      await CarApiService.postCarData(updatedCarData, uploadImages);
      setSellerData({
        name: "",
        phoneNumber: "",
      });
      setCarData({
        ownerId: "",
        registrationNumber: "",
        kilometers: 0,
        expectedPrice: 0,
      });
      setUploadImages([]);
      setRegStep(2);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitFirstStep = (e) => {
    e.preventDefault();
    postCarApplication();
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
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-swamp-500 bg-gradient-to-bl from-swamp-100 to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <div className="mb-2 flex flex-row items-center justify-between md:px-2">
              <h1 className="mb-1 whitespace-nowrap text-center text-2xl font-bold text-medium-gray md:text-3xl">
                {t("fill_form")}
              </h1>
              <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdClose
                className="h-6 w-6 hover:opacity-25"
                color="#333333"
                onClick={() => setOpen(false)}
              />
            </div>

            {regStep == 1 && (
              <form
                className="flex w-full flex-col items-center md:px-2"
                onSubmit={submitFirstStep}
              >
                <TextInputField
                  label={t("name")}
                  name="name"
                  icon={
                    <MdOutlinePerson2 className="h-6 w-auto" color="#333" />
                  }
                  initialValue={sellerData.name}
                  onChange={handleUserInputChange}
                />
                <TextInputField
                  label={t("phone_number")}
                  name="phoneNumber"
                  icon={<MdOutlinePhone className="h-6 w-auto" color="#333" />}
                  initialValue={sellerData.phoneNumber}
                  onChange={handleUserInputChange}
                />
                <div className="flex w-full flex-row gap-3">
                  <TextInputField
                    label={t("registration_number")}
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
                    label={t("kilometers")}
                    name="kilometers"
                    icon={
                      <MdOutlineSpeed className="h-6 w-auto" color="#333" />
                    }
                    initialValue={carData.kilometers}
                    onChange={handleCarInputChange}
                  />
                </div>
                <NumberInputField
                  label={t("exp_price")}
                  name="expectedPrice"
                  icon={
                    <LiaMoneyBillWaveAltSolid
                      className="h-6 w-auto"
                      color="#333"
                    />
                  }
                  initialValue={carData.expectedPrice}
                  onChange={handleCarInputChange}
                  optional={true}
                />
                <p className="mt-3 text-center text-sm font-light italic text-light-gray md:text-base">
                  {t("upload_photo_if_want")}
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
                    className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
                  >
                    <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                      {t("send")}
                    </span>
                    <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
                    <MdOutlineOutbox className="h-6 w-auto" color="#FEFAF0" />
                  </button>
                )}
              </form>
            )}
            {regStep == 2 && (
              <div className="flex w-full flex-col items-center justify-center md:px-2">
                <PiSealCheckBold className="mt-9 h-20 w-auto" color="#416858" />
                <h1 className="mb-9 mt-3 text-center text-xl font-bold text-medium-gray md:text-2xl">
                  {t("application_sent")}
                </h1>
                <button
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      setRegStep(1);
                    }, 1000);
                  }}
                  className="buttonsh hover:button_shadow_hover active:button_shadow_click group mb-2 mt-5 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:space-x-2 md:rounded-lg"
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

export default SellerModal;
