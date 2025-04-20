import { TbCarOff } from "react-icons/tb";
import CarCard from "./CarCard";

const CarsList = ({ cars, onDelete, error, actionsDisabled }) => {
  return (
    <>
      {cars.length > 0 ? (
        <div
          className={`flex w-full max-w-7xl flex-col ${cars.length <= 2 ? "md:justify-start" : "justify-center"} flex-nowrap items-center gap-4 pb-4 md:flex-row md:flex-wrap md:items-start`}
        >
          {cars.map((car) => (
            <CarCard
              carInfo={car}
              key={car.id}
              onDelete={onDelete}
              actionsDisabled={actionsDisabled}
            />
          ))}
        </div>
      ) : (
        <div className="my-8 flex flex-col">
          <TbCarOff className="h-16 w-auto opacity-50" color="#888" />
          {error ? (
            <p className="mt-2 text-center text-xl font-normal text-light-gray opacity-75">
              Kunne ikke få tak i dine biler :( <br />
              Prøv igjen eller ta kontakt med oss
            </p>
          ) : (
            <p className="mt-2 text-center text-xl font-normal text-light-gray opacity-75">
              Ingen biler her ennå. <br />
              Legg til din første da :)
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CarsList;
