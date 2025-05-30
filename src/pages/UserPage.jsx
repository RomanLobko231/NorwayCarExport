import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserApiService from "../api/UserApiService";
import CarApiService from "../api/CarApiService";
import ErrorDialog from "../ui/dialog/ErrorDialog";
import SellerCarList from "../ui/users/seller/SellerCarList";
import ErrorMessage from "../ui/ErrorMessage";
import SellerUserPanel from "../ui/users/seller/SellerUserPanel";
import CompanyUserPanel from "../ui/users/buyer/CompanyUserPanel";
import { useTranslation } from "react-i18next";
import MessageDialog from "../ui/dialog/MessageDialog";
import BuyerRepresentativeUserPanel from "../ui/users/representative/BuyerRepresentativeUserPanel";
import BuyerRepresentativesList from "../ui/users/representative/BuyerRepresentativesList";
import RepresentativeCarList from "../ui/users/representative/RepresentativeCarList";

const UserPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteUserOpen, setDeleteUserOpen] = useState(false);

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

  const deleteUserById = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await UserApiService.deleteUserById(params.id);
      navigate("/");
      sessionStorage.clear();
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
          className={`flex w-full flex-col items-center justify-center px-4 pt-28`}
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
              <RepresentativeCarList auctionIds={userData.savedCarIds} />
            </>
          )}
          {userData.role === "SELLER" && (
            <>
              <SellerUserPanel user={userData} updateUser={updateUser} />
              <SellerCarList />
            </>
          )}
          <p
            className="mb-1 mt-7 flex w-auto cursor-pointer border-b-2 border-danger-red/50 text-center text-lg font-medium text-danger-red/50 hover:border-danger-red hover:text-danger-red"
            onClick={() => setDeleteUserOpen(true)}
          >
            {t("delete_user")}
          </p>
        </div>
      )}
      <MessageDialog
        isOpen={deleteUserOpen}
        setIsOpen={setDeleteUserOpen}
        onFunc={deleteUserById}
        message={t("sure_to_del_user")}
      />
    </>
  );
};

export default UserPage;
