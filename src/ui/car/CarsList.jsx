import CarCard from "./CarCard";

const CarsList = ({ cars, onDelete }) => {
  return (
    <div
      className={`flex w-full max-w-7xl flex-col ${cars.length <= 2 ? "md:justify-start" : "justify-center"} flex-nowrap items-center gap-4 pb-4 md:flex-row md:flex-wrap md:items-start`}
    >
      {cars.map((car) => (
        <CarCard carInfo={car} key={car.id} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CarsList;
