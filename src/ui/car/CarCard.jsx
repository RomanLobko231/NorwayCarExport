import { useNavigate } from "react-router";
import CarInfoElement from "./CarInfoElement";
import { useCallback, useState } from "react";
import TextInputField from "../input/TextInputField";
import { TbCarOff } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";
import MessageDialog from "../dialogs/MessageDialog";
import DeleteDialog from "../dialog/DeleteDialog";

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
      className="card_shadow hover:card_shadow_hover active:card_shadow_click flex cursor-pointer flex-col items-center rounded-md border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3 duration-300 hover:-translate-y-1 md:w-[300px]"
    >
      {carInfo.imagePaths[0] ? (
        <img
          src={carInfo.imagePaths[0]}
          alt={carInfo.model ?? "Car"}
          className="h-[185px] w-full rounded border border-swamp-500 object-cover"
        />
      ) : (
        <div className="flex h-[185px] w-full items-center justify-center rounded border border-medium-gray bg-lighthouse from-swamp-100">
          <TbCarOff className="h-10 w-auto" color="#888" />
        </div>
      )}
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

      <div className="mb-2 mt-1 flex w-full flex-row items-center justify-between">
        <h1 className="inline-block truncate whitespace-nowrap bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-xl font-bold leading-[26px] text-transparent">
          {carInfo.make ?? "-"} {carInfo.model ?? "-"}
        </h1>
        <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
        <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent">
          {carInfo.firstTimeRegisteredInNorway.substring(0, 4)}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {carInfo.nextEUControl && (
          <CarInfoElement info={carInfo.nextEUControl} />
        )}
        {carInfo.engineType && <CarInfoElement info={carInfo.engineType} />}
        {carInfo.gearboxType && <CarInfoElement info={carInfo.gearboxType} />}
        {carInfo.kilometers >= 0 && (
          <CarInfoElement info={`${carInfo.kilometers} KMs`} />
        )}
      </div>
      <hr className="mt-3 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />

      <div className="flex w-full flex-row items-center justify-center gap-3">
        <button
          disabled={carInfo.status == "Auksjon" || carInfo.status == "Solgt"}
          className="card_shadow disabled:card_shadow_click mb-2 mt-5 flex flex-row items-center gap-2 rounded-lg border border-medium-gray bg-white px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse disabled:border-light-gray disabled:text-light-gray disabled:hover:bg-white disabled:hover:text-light-gray"
        >
          Edit
          <MdEdit />
        </button>
        <button
          onClick={(e) => {
            setIsOpen(true);
            e.stopPropagation();
          }}
          disabled={carInfo.status == "Auksjon" || carInfo.status == "Solgt"}
          className="card_shadow disabled:card_shadow_click mb-2 mt-5 flex flex-row items-center gap-2 rounded-lg border border-danger-red bg-white px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse disabled:border-danger-red/50 disabled:text-danger-red/50 disabled:hover:bg-white disabled:hover:text-danger-red/50"
        >
          Delete
          <MdDelete />
        </button>
      </div>
      <DeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CarCard;
