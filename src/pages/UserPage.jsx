import { useEffect, useState } from "react";
import UserDataPanel from "../ui/users/UserDataPanel";
import { useNavigate, useParams } from "react-router-dom";
import UserApiService from "../api/UserApiService";
import CarApiService from "../api/CarApiService";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import SellerCarList from "../ui/users/seller/SellerCarList";
import BuyerRepresentativesList from "../ui/users/buyer/BuyerRepresentativesList";

const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [cars, setCars] = useState([]);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserById(params.id);
  }, []);

  const fetchUserById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await UserApiService.getUserById(id);
      const cars = await CarApiService.getCarsByOwnerId(id);
      setUserData(user.data);
      setCars(cars.data);
      setError(null);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await UserApiService.updateUser(userData);
      setUserData(user.data);
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
      {isLoading && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          Loading...
        </p>
      )}
      {!isLoading && !error && userData && (
        <div
          className={`flex w-full flex-col items-center justify-center px-4 pt-20`}
        >
          <UserDataPanel user={userData} updateUser={updateUser} />
          {userData.role == "SELLER" && <SellerCarList />}
          {userData.role == "BUYER" && <BuyerRepresentativesList />}
        </div>
      )}
    </>
  );
};

export default UserPage;
