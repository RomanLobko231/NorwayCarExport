import CarCard from "./CarCard";

const CarsList = ({ cars, onDelete }) => {
  return (
    <div className="flex w-full max-w-7xl flex-col flex-wrap items-center gap-4 pb-4 md:flex-row md:items-start">
      {cars.map((car) => (
        <CarCard carInfo={car} key={car.id} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CarsList;
