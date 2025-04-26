import React, { useEffect, useState } from "react";
import UserApiService from "../../api/UserApiService";
import CompanyUserPanel from "./buyer/CompanyUserPanel";
import SellerUserPanel from "./seller/SellerUserPanel";
import BuyerRepresentativeUserPanel from "./buyer/BuyerRepresentativeUserPanel";
import { useParams } from "react-router-dom";
import SellerCarList from "./seller/SellerCarList";
import BuyerRepresentativesList from "./buyer/BuyerRepresentativesList";
import ErrorDialog from "../dialog/ErrorDialog";
import ErrorMessage from "../ErrorMessage";

const UserDataPanel = () => {
  const params = useParams();

  const [userData, setUserData] = useState(null);

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
      setUserData(user.data);
      setError(null);
      console.log(user.data);
    } catch (error) {
      setError(error);
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
      {error && isErrorOpen && (
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
      {userData && !isLoading && (
        <div
          className={`flex w-full flex-col items-center justify-center px-4 pt-20`}
        >
          {userData.role === "BUYER_COMPANY" && (
            <>
              <CompanyUserPanel user={userData} updateUser={updateUser} />
              <BuyerRepresentativesList reps={userData.representatives} />
            </>
          )}
          {userData.role === "BUYER_REPRESENTATIVE" && (
            <>
              <BuyerRepresentativeUserPanel user={userData} />
              <SellerCarList />
            </>
          )}
          {userData.role === "SELLER" && (
            <>
              <SellerUserPanel user={userData} updateUser={updateUser} />
              <SellerCarList />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(UserDataPanel);
