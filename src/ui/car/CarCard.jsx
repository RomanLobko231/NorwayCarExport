import { useNavigate } from "react-router";
import CarInfoElement from "./CarInfoElement";
import { useCallback, useState } from "react";
import TextInputField from "../input/TextInputField";
import { TbCarOff } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";
import MessageDialog from "../dialogs/MessageDialog";

const CarCard = ({ carInfo, onDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(() => {
    onDelete(carInfo.id);
  }, [onDelete, carInfo.id]);

  return (
    <div
      onClick={() => {
        navigate(`/car/${carInfo.id}`);
      }}
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex w-[300px] cursor-pointer flex-col items-center rounded-md border border-light-gray bg-slate-50 p-3 duration-300 hover:-translate-y-1"
    >
      {carInfo.imagePaths[0] ? (
        <img
          src={carInfo.imagePaths[0]}
          alt={carInfo.model ?? "Car"}
          className="h-[185px] w-full rounded border border-medium-gray object-cover"
        />
      ) : (
        <div className="from-swamp-100 flex h-[185px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse">
          <TbCarOff className="h-10 w-auto" color="#888" />
        </div>
      )}

      <h1 className="my-1 text-xl font-semibold leading-6 text-gunmental">
        {carInfo.make ?? "-"} {carInfo.model ?? "-"}
      </h1>
      <hr className="mb-2 mt-1 h-[2px] w-full bg-slate-950" />
      <div className="flex flex-wrap items-center gap-2">
        <CarInfoElement info={carInfo.registrationNumber ?? "-"} />
        <CarInfoElement info={`EU: ${carInfo.nextEUControl ?? "-"}`} />
        <CarInfoElement info={`${carInfo.kilometers ?? "-"} KMs`} />
        <CarInfoElement info={carInfo.status ?? "-"} />
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-3">
        <button className="card_shadow group mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse">
          Edit
          <MdEdit className="ml-2 mr-1 h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            setIsOpen(true);
            e.stopPropagation();
          }}
          className="card_shadow text-danger-red hover:bg-danger-red group mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold hover:text-lighthouse"
        >
          Delete
          <MdDelete className="ml-2 mr-1 h-5 w-auto" />
        </button>
      </div>
      <MessageDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onFunc={handleDelete}
        message={
          "Do you actually want to delete this car? This actions is final and can't be restored."
        }
      />
    </div>
  );
};

export default CarCard;
