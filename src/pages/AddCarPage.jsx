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
  const [car, setCar] = useState({
    registrationNumber: "",
    kilometers: 0,
    make: "",
    model: "",
    firstTimeRegisteredInNorway: "",
    engineType: "",
    engineVolume: 0,
    bodywork: "",
    numberOfSeats: 0,
    numberOfDoors: 0,
    color: "",
    gearboxType: "Annet",
    operatingMode: "Annet",
    weight: 0,
    nextEUControl: "",
    ownerId: params.id,
    additionalInformation: "",
  });

  const saveCar = async (carData, images) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CarApiService.saveCarComplete(carData, images);
      setCar({
        registrationNumber: "",
        kilometers: 0,
        make: "",
        model: "",
        firstTimeRegisteredInNorway: "",
        engineType: "",
        engineVolume: 0,
        bodywork: "",
        numberOfSeats: 0,
        numberOfDoors: 0,
        color: "",
        gearboxType: "Annet",
        operatingMode: "Annet",
        weight: 0,
        nextEUControl: "",
        ownerId: params.id,
        additionalInformation: "",
        expectedPrice: "",
      });

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
