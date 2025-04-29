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

const CarSpecifications = ({ carData }) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-md border border-gunmental bg-distant-cloud p-4">
      <p className="mb-2 w-full text-start text-base font-semibold text-light-gray">
        Specifications
      </p>
      <div className="flex w-full flex-col gap-1 md:flex-row md:gap-3">
        <div className="flex w-full flex-col gap-[0.35rem]">
          <SpecificationItem
            icon={<TbCarGarage />}
            type={"Make"}
            value={carData.make}
          />
          <SpecificationItem
            icon={<TbCar />}
            type={"Model"}
            value={carData.model}
          />
          <SpecificationItem
            icon={<TbCalendarPin />}
            type={"Registrered"}
            value={carData.firstTimeRegisteredInNorway
              .replaceAll("-", ".")
              .substring(0, 9)}
          />
          <SpecificationItem
            icon={<TbCalendarCheck />}
            type={"EU-approved"}
            value={carData.nextEUControl.replaceAll("-", ".").substring(0, 9)}
          />
          <SpecificationItem
            icon={<BiTachometer />}
            type={"Kilometers"}
            value={carData.kilometers}
          />
          <SpecificationItem
            icon={<MdNumbers />}
            type={"Reg.number"}
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
            type={"Fuel"}
            value={carData.engineType}
          />
        </div>
        <div className="hidden h-full w-[1px] flex-grow bg-light-gray md:flex"></div>
        <div className="flex w-full flex-col gap-[0.35rem]">
          <SpecificationItem
            icon={<TbEngine />}
            type={"Volume"}
            value={carData.engineVolume}
          />
          <SpecificationItem
            icon={<TbWeight />}
            type={"Weight"}
            value={carData.weight}
          />
          <SpecificationItem
            icon={<TbCar />}
            type={"Bodywork"}
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
            type={"Gearbox"}
            value={carData.gearboxType}
          />
          <SpecificationItem
            icon={<MdAirlineSeatReclineNormal />}
            type={"Seats"}
            value={carData.numberOfSeats}
          />
          <SpecificationItem
            icon={<TbNumber />}
            type={"Doors"}
            value={carData.numberOfDoors}
          />
          <SpecificationItem
            icon={<IoMdColorFill />}
            type={"Color"}
            value={carData.color}
          />
        </div>
      </div>
    </div>
  );
};

export default CarSpecifications;
