import { TbTrashX } from "react-icons/tb";

const BuyerRepresentativeCard = ({ rep, index, deleteRep }) => {
  return (
    <div className="flex w-full cursor-pointer flex-row items-start gap-3 rounded-lg border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-3 md:items-center md:justify-between">
      <div className="flex w-full flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
        <p className="hidden text-xl font-bold text-medium-gray md:block">
          {index + 1}.
        </p>
        <div className="flex w-full flex-row items-center justify-between md:w-auto">
          <h1 className="inline-block bg-gradient-to-br from-gunmental to-swamp-500 bg-clip-text text-lg font-bold leading-[26px] text-transparent md:text-xl">
            {rep.name}
          </h1>
          <div className="flex rounded-md border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse md:hidden">
            <TbTrashX className="h-auto w-5 md:w-7" />
          </div>
        </div>
        <div className="mt-[2px] hidden h-[1px] w-3 bg-light-gray md:flex" />
        <h1 className="text-base font-medium text-medium-gray md:text-lg">
          {rep.email}
        </h1>
        <div className="mt-[2px] hidden h-[1px] w-3 bg-light-gray md:flex" />
        <h1 className="text-base font-medium text-medium-gray md:text-lg">
          {rep.phoneNumber}
        </h1>
      </div>
      <div
        className="hidden rounded-md border border-danger-red p-1 text-danger-red hover:bg-danger-red hover:text-lighthouse md:flex"
        onClick={() => {
          deleteRep(rep.id);
        }}
      >
        <TbTrashX className="h-auto w-7" />
      </div>
    </div>
  );
};

export default BuyerRepresentativeCard;
