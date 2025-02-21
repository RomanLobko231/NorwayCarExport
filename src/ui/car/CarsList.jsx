import CarCard from "./CarCard";

const CarsList = ({ cars, onDelete }) => {
  return (
    <div className="flex w-full max-w-7xl flex-wrap justify-start gap-4 pb-4">
      {cars.map((car) => (
        <CarCard carInfo={car} key={car.id} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CarsList;
