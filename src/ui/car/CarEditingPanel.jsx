import { useState, useTransition } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import OptionsInput from "../input/OptionsInput";
import DateInputField from "../input/DateInputField";
import ImageInputField from "../input/ImageInputField";
import MessageDialog from "../dialog/MessageDialog";
import {
  MdEdit,
  MdNumbers,
  MdOutlineAirlineSeatReclineNormal,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineFormatColorFill,
} from "react-icons/md";
import { LuFuel } from "react-icons/lu";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";

const CarEditingPanel = ({ car, saveCar }) => {
  const { t } = useTranslation("common", "car");

  const [carData, setCarData] = useState(car);
  const [uploadImages, setUploadImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const OPERATING_MODES = [
    { label: t("rear_drive", { ns: "car" }), value: "Bakhjulstrekk" },
    { label: t("front_drive", { ns: "car" }), value: "Framhjulstrekk" },
    { label: t("all_drive", { ns: "car" }), value: "Firehjulstrekk" },
    { label: t("other", { ns: "car" }), value: "Annet" },
  ];
  const GEARBOX_TYPES = [
    { label: t("manual", { ns: "car" }), value: "Manuell" },
    { label: t("automatic", { ns: "car" }), value: "Automat" },
    { label: t("other", { ns: "car" }), value: "Annet" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateOperatingMode = (e) => {
    const { value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      operatingMode: value,
    }));
  };

  const updateGearboxType = (e) => {
    const { value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      gearboxType: value,
    }));
  };

  const deleteImageByName = (imageName) => {
    setCarData((prevData) => ({
      ...prevData,
      imagePaths: prevData.imagePaths.filter(
        (imageUrl) => !imageUrl.includes(imageName),
      ),
    }));
  };

  const submitSaveRequest = (e) => {
    e.preventDefault();
    saveCar(carData, uploadImages);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-20 md:py-24">
      <div className="px-4">
        <ImageCarousel
          images={carData.imagePaths}
          deleteImage={deleteImageByName}
        />
      </div>
      <h1 className="my-4 block text-center text-2xl font-bold text-medium-gray">
        {t("upload_photos", { ns: "car" })}
      </h1>
      <div className="flex w-full justify-center px-4">
        <ImageInputField images={uploadImages} setImages={setUploadImages} />
      </div>

      <form
        className="mt-4 flex w-full max-w-[700px] flex-col items-center px-4 md:px-0"
        onSubmit={submitSaveRequest}
        onReset={() => {
          setIsOpen(true);
        }}
      >
        <h1 className="mb-3 mt-8 text-2xl font-bold text-medium-gray">
          {t("car_info", { ns: "car" })}
        </h1>
        <NumberInputField
          label={t("expected_price", { ns: "car" })}
          name="expectedPrice"
          icon={
            <LiaMoneyBillWaveAltSolid className="h-6 w-auto" color="#333" />
          }
          initialValue={carData.expectedPrice}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("model", { ns: "car" })}
          icon={<MdOutlineDirectionsCar className="h-5 w-5" />}
          name="model"
          initialValue={carData.model}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("make", { ns: "car" })}
          icon={<MdOutlineDirectionsCar className="h-5 w-5" />}
          name="make"
          initialValue={carData.make}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("registration_number", { ns: "car" })}
          icon={<MdNumbers className="h-5 w-5" />}
          name="registrationNumber"
          initialValue={carData.registrationNumber}
          onChange={handleInputChange}
        />
        <DateInputField
          label={t("first_time_registered_in_norway", { ns: "car" })}
          icon={<MdOutlineCalendarMonth className="h-5 w-5" />}
          name="firstTimeRegisteredInNorway"
          initialValue={carData.firstTimeRegisteredInNorway}
          onChange={handleInputChange}
        />
        <DateInputField
          label={t("next_eu_control", { ns: "car" })}
          icon={<MdOutlineCalendarMonth className="h-5 w-5" />}
          name="nextEUControl"
          initialValue={carData.nextEUControl}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={t("kilometers", { ns: "car" })}
          icon={<MdNumbers className="h-5 w-5" />}
          name="kilometers"
          initialValue={carData.kilometers}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("fuel", { ns: "car" })}
          icon={<LuFuel className="h-5 w-5" />}
          name="engineType"
          initialValue={carData.engineType}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("engine_volume", { ns: "car" })}
          icon={<MdNumbers className="h-5 w-5" />}
          name="engineVolume"
          initialValue={carData.engineVolume}
          onChange={handleInputChange}
        />
        <div className="mb-4 flex w-full flex-col items-center">
          <p className="mb-2 mt-4 text-base font-medium text-light-gray md:mb-0">
            {t("operating_mode", { ns: "car" })}
          </p>
          <OptionsInput
            options={OPERATING_MODES}
            initialOption={
              carData.operatingMode
                ? OPERATING_MODES.filter(
                    (o) => o.value == carData.operatingMode,
                  ).at(0)
                : OPERATING_MODES.at(0)
            }
            updateOption={updateOperatingMode}
          />
          <p className="mb-2 mt-4 text-base font-medium text-light-gray md:mb-0">
            {t("gearbox_type", { ns: "car" })}
          </p>
          <OptionsInput
            options={GEARBOX_TYPES}
            initialOption={
              carData.gearboxType
                ? GEARBOX_TYPES.filter(
                    (o) => o.value == carData.gearboxType,
                  ).at(0)
                : GEARBOX_TYPES.at(0)
            }
            updateOption={updateGearboxType}
          />
        </div>
        <NumberInputField
          label={t("weight", { ns: "car" })}
          icon={<MdNumbers className="h-5 w-5" />}
          name="weight"
          initialValue={carData.weight}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("bodywork", { ns: "car" })}
          icon={<MdOutlineDirectionsCar className="h-5 w-5" />}
          name="bodywork"
          initialValue={carData.bodywork}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={t("number_of_doors", { ns: "car" })}
          icon={<MdNumbers className="h-5 w-5" />}
          name="numberOfDoors"
          initialValue={carData.numberOfDoors}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={t("number_of_seats", { ns: "car" })}
          icon={<MdOutlineAirlineSeatReclineNormal className="h-5 w-5" />}
          name="numberOfSeats"
          initialValue={carData.numberOfSeats}
          onChange={handleInputChange}
        />
        <TextInputField
          label={t("color", { ns: "car" })}
          icon={<MdOutlineFormatColorFill className="h-5 w-5" />}
          name="color"
          initialValue={carData.color}
          onChange={handleInputChange}
        />

        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          {t("additional_info", { ns: "car" })}
        </h1>
        <div className="relative mb-3 mt-5 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 top-5 flex items-baseline ps-5">
            <MdEdit className="h-5 w-5" />
          </div>
          <textarea
            id="add_info"
            className="block min-h-48 w-full rounded-lg border border-medium-gray bg-white px-5 py-4 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder={t("additional_info_lower_case", {
              ns: "car",
            })}
            name={"additionalInformation"}
            value={carData.additionalInformation || ""}
            onChange={handleInputChange}
          />
        </div>
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-2 bg-lighthouse/50 backdrop-blur md:gap-5">
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:pb-2 md:text-2xl"
          >
            {t("save")}{" "}
          </button>
          <button
            type="reset"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:pb-2 md:text-2xl"
          >
            Reset
          </button>
        </div>
      </form>
      <MessageDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={
          "Are you sure you want to reset all data? After confirming all unsaved data will be lost."
        }
        onFunc={() => {
          setCarData(car);
        }}
      />
    </div>
  );
};

export default CarEditingPanel;
