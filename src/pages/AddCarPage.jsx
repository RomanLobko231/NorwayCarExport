import { useState } from "react";
import ApiService from "../api/UserApiService";
import CarEditingPanel from "../ui/car/CarEditingPanel";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import { useNavigate, useParams } from "react-router-dom";
import CarApiService from "../api/CarApiService";

const AddCarPage = () => {
  const params = useParams();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const defaultCar = {
    registrationNumber: "",
    kilometers: "",
    make: "",
    model: "",
    firstTimeRegisteredInNorway: "",
    engineType: "",
    engineVolume: "",
    bodywork: "",
    numberOfSeats: "",
    numberOfDoors: "",
    color: "",
    gearboxType: "Annet",
    operatingMode: "Annet",
    weight: "",
    nextEUControl: "",
    ownerId: params.id,
    additionalInformation: "",
    expectedPrice: "",
  };

  const [car, setCar] = useState(defaultCar);

  const saveCar = async (carData, images) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CarApiService.saveCarComplete(carData, images);
      setCar(defaultCar);

      navigate("/user/" + params.id);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-xl text-white">Loading...</div>
        </div>
      )}
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      <CarEditingPanel car={car} saveCar={saveCar} />
    </div>
  );
};

export default AddCarPage;
