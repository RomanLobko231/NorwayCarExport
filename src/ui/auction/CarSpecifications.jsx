import {
  TbAutomaticGearbox,
  TbCalendarCheck,
  TbCalendarPin,
  TbCar,
  TbCarGarage,
  TbEngine,
  TbManualGearbox,
  TbNumber,
  TbWeight,
} from "react-icons/tb";
import SpecificationItem from "./SpecificationItem";
import {
  MdAirlineSeatReclineNormal,
  MdNumbers,
  MdOutlineBrightnessAuto,
  MdOutlineLocalGasStation,
} from "react-icons/md";
import { BiTachometer } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { PiGearSixBold } from "react-icons/pi";
import { IoMdColorFill } from "react-icons/io";
import { useTranslation } from "react-i18next";

const CarSpecifications = ({ carData }) => {
  const { t } = useTranslation("common", "car");
  return (
    <div className="mt-5 flex w-full flex-col items-center rounded-lg border border-dashed border-medium-gray bg-gradient-to-br from-swamp-100 to-lighthouse p-4">
      <div className="flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4">
        <p className="mb-2 w-full text-start text-base font-semibold text-light-gray">
          {t("specifications")}
        </p>
        <div className="flex w-full flex-col gap-1 md:flex-row md:gap-3">
          <div className="flex w-full flex-col gap-[0.35rem]">
            <SpecificationItem
              icon={<TbCarGarage />}
              type={t("make", { ns: "car" })}
              value={carData.make}
            />
            <SpecificationItem
              icon={<TbCar />}
              type={t("model", { ns: "car" })}
              value={carData.model}
            />
            <SpecificationItem
              icon={<TbCalendarPin />}
              type={t("registered", { ns: "car" })}
              value={carData.firstTimeRegisteredInNorway
                .replaceAll("-", ".")
                .substring(0, 9)}
            />
            <SpecificationItem
              icon={<TbCalendarCheck />}
              type={t("next_eu_control", { ns: "car" })}
              value={carData.nextEUControl.replaceAll("-", ".").substring(0, 9)}
            />
            <SpecificationItem
              icon={<BiTachometer />}
              type={t("kilometers", { ns: "car" })}
              value={carData.kilometers}
            />
            <SpecificationItem
              icon={<MdNumbers />}
              type={t("registration_number", { ns: "car" })}
              value={carData.registrationNumber}
            />
            <SpecificationItem
              icon={
                carData.engineType == "Elektrisk" ? (
                  <GiElectric />
                ) : (
                  <MdOutlineLocalGasStation />
                )
              }
              type={t("fuel", { ns: "car" })}
              value={carData.engineType}
            />
          </div>
          <div className="hidden h-full w-[1px] flex-grow bg-light-gray md:flex"></div>
          <div className="flex w-full flex-col gap-[0.35rem]">
            <SpecificationItem
              icon={<TbEngine />}
              type={t("engine_volume", { ns: "car" })}
              value={carData.engineVolume}
            />
            <SpecificationItem
              icon={<TbWeight />}
              type={t("weight", { ns: "car" })}
              value={carData.weight}
            />
            <SpecificationItem
              icon={<TbCar />}
              type={t("bodywork", { ns: "car" })}
              value={carData.bodywork}
            />
            <SpecificationItem
              icon={
                carData.gearboxType == "Manuell" ? (
                  <TbManualGearbox />
                ) : (
                  <TbAutomaticGearbox />
                )
              }
              type={t("gearbox_type", { ns: "car" })}
              value={carData.gearboxType}
            />
            <SpecificationItem
              icon={<MdAirlineSeatReclineNormal />}
              type={t("number_of_seats", { ns: "car" })}
              value={carData.numberOfSeats}
            />
            <SpecificationItem
              icon={<TbNumber />}
              type={t("number_of_doors", { ns: "car" })}
              value={carData.numberOfDoors}
            />
            <SpecificationItem
              icon={<IoMdColorFill />}
              type={t("color", { ns: "car" })}
              value={carData.color}
            />
          </div>
        </div>
      </div>
      {carData.additionalInformation && (
        <>
          <div className="my-4 h-[1px] w-4/5 flex-grow bg-light-gray"></div>

          <div className="flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4">
            <p className="mb-2 w-full text-start text-base font-semibold text-light-gray">
              {t("additional_details")}
            </p>
            <p className="w-full whitespace-pre-wrap break-words text-base font-medium text-medium-gray md:text-lg">
              {carData.additionalInformation}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CarSpecifications;
