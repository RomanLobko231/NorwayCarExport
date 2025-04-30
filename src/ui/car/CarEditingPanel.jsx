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
  const { t } = useTranslation();

  const [carData, setCarData] = useState(car);
  const [uploadImages, setUploadImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const OPERATING_MODES = [
    "Bakhjulstrekk",
    "Framhjulstrekk",
    "Firehjulstrekk",
    "Annet",
  ];
  const GEARBOX_TYPES = ["Manuell", "Automat", "Annet"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
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
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-20">
      <div className="px-4">
        <ImageCarousel
          images={carData.imagePaths}
          deleteImage={deleteImageByName}
        />
      </div>
      <h1 className="my-4 block text-center text-2xl font-bold text-medium-gray">
        LASTE OPP BILDER
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
          BILENS INFO
        </h1>
        <NumberInputField
          label={t("exp_price")}
          name="expectedPrice"
          icon={
            <LiaMoneyBillWaveAltSolid className="h-6 w-auto" color="#333" />
          }
          initialValue={carData.expectedPrice}
          onChange={handleInputChange}
          optional={true}
        />
        <TextInputField
          label={"Modell"}
          icon={<MdOutlineDirectionsCar className="h-5 w-5" />}
          name={"model"}
          initialValue={carData.model}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Merke"}
          icon={<MdOutlineDirectionsCar className="h-5 w-5" />}
          name={"make"}
          initialValue={carData.make}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Registrasjonsnummer"}
          icon={<MdNumbers className="h-5 w-5" />}
          name={"registrationNumber"}
          initialValue={carData.registrationNumber}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Førstegangsregistrering i Norge"}
          icon={<MdOutlineCalendarMonth className="h-5 w-5" />}
          name={"firstTimeRegisteredInNorway"}
          initialValue={carData.firstTimeRegisteredInNorway}
          onChange={handleInputChange}
        />
        <DateInputField
          label={"Neste EU-kontroll"}
          icon={<MdOutlineCalendarMonth className="h-5 w-5" />}
          name={"nextEUControl"}
          initialValue={carData.nextEUControl}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Kilometerstand"}
          icon={<MdNumbers className="h-5 w-5" />}
          name={"kilometers"}
          initialValue={carData.kilometers}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Drivstoff"}
          icon={<LuFuel className="h-5 w-5" />}
          name={"engineType"}
          initialValue={carData.engineType}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Motorvolum/slagvolum"}
          icon={<MdNumbers className="h-5 w-5" />}
          name={"engineVolume"}
          initialValue={carData.engineVolume}
          onChange={handleInputChange}
        />
        <div className="mb-4 flex w-full flex-col items-center">
          <p className="mb-2 mt-4 text-base font-medium text-light-gray md:mb-0">
            Driftstype
          </p>
          <OptionsInput
            options={OPERATING_MODES}
            initialOption={carData.operatingMode}
            optionName={"operatingMode"}
            handleInputChange={handleInputChange}
          />
          <p className="mb-2 mt-4 text-base font-medium text-light-gray md:mb-0">
            Girkassetype
          </p>
          <OptionsInput
            options={GEARBOX_TYPES}
            initialOption={carData.gearboxType}
            optionName={"gearboxType"}
            handleInputChange={handleInputChange}
          />
        </div>
        <NumberInputField
          label={"Egenvekt"}
          icon={<MdNumbers className="h-5 w-5" />}
          name={"weight"}
          initialValue={carData.weight}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Karosseri"}
          icon={<MdOutlineDirectionsCar className="h-5 w-5" />}
          name={"bodywork"}
          initialValue={carData.bodywork}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Dørantall"}
          icon={<MdNumbers className="h-5 w-5" />}
          name={"numberOfDoors"}
          initialValue={carData.numberOfDoors}
          onChange={handleInputChange}
        />
        <NumberInputField
          label={"Seteantall"}
          icon={<MdOutlineAirlineSeatReclineNormal className="h-5 w-5" />}
          name={"numberOfSeats"}
          initialValue={carData.numberOfSeats}
          onChange={handleInputChange}
        />
        <TextInputField
          label={"Farge"}
          icon={<MdOutlineFormatColorFill className="h-5 w-5" />}
          name={"color"}
          initialValue={carData.color}
          onChange={handleInputChange}
        />
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          TILLEGSINFO
        </h1>
        <div className="relative mb-3 mt-5 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 top-5 flex items-baseline ps-5">
            <MdEdit className="h-5 w-5" />
          </div>
          <textarea
            id="add_info"
            className="block min-h-48 w-full rounded-lg border border-medium-gray bg-white px-5 py-4 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Ytterligere opplysninger"
            name={"additionalInformation"}
            value={carData.additionalInformation || ""}
            onChange={handleInputChange}
          />
        </div>
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-2 bg-lighthouse/50 backdrop-blur md:gap-5">
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-2xl"
          >
            Save For Now
          </button>
          <button
            type="reset"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-2xl"
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
