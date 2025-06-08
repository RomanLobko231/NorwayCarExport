import { useEffect, useState } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import UserApiService from "../../../api/UserApiService";
import {
  MdLockOutline,
  MdOutlineGroupOff,
  MdPersonOutline,
} from "react-icons/md";
import { TbTrashX } from "react-icons/tb";
import CarInfoElement from "../../car/CarInfoElement";
import AddRepresentativeModal from "./AddRepresentativeModal";
import ErrorDialog from "../../dialog/ErrorDialog";
import BuyerRepresentativeCard from "./BuyerRepresentativeCard";
import { useTranslation } from "react-i18next";

const BuyerRepresentativesList = ({ reps }) => {
  const { t } = useTranslation(["common", "user"]);

  const [isRepModalOpen, setRepModalOpen] = useState(false);
  const [representatives, setRepresentatives] = useState(reps);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteRepresentativeById = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      await UserApiService.deleteUserById(id);
      setRepresentatives((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRepresentative = async (repData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await UserApiService.updateUser(repData);
      setRepresentatives((prevUsers) =>
        prevUsers.map((user) =>
          user.id === response.data.id ? response.data : user,
        ),
      );
    } catch (error) {
      setError(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`mt-5 flex w-full max-w-7xl flex-col items-center rounded-lg border border-light-gray bg-slate-50 p-3 md:p-6`}
    >
      <div className="mb-8 flex w-full flex-col flex-wrap items-center justify-start md:flex-row">
        <h1 className="mb-4 text-center text-2xl font-bold text-medium-gray md:mb-0 md:text-3xl">
          {t("representatives", { ns: "user" })}
        </h1>
        {sessionStorage.getItem("isAccountLocked") === "true" ? (
          <div className="flex flex-col items-center gap-2 py-2 text-center text-lg font-semibold text-light-gray md:ml-auto md:flex-row md:pl-6">
            <MdLockOutline className="h-6 w-auto" />
            <p>{t("account_not_approved", { ns: "user" })}</p>
          </div>
        ) : (
          <button
            onClick={() => {
              setRepModalOpen(true);
            }}
            className="buttonsh hover:button_shadow_hover active:button_shadow_click group flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:ml-auto md:mt-0 md:space-x-2 md:rounded-lg"
            disabled={sessionStorage.getItem("isAccountLocked") === true}
          >
            <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
              {t("add").toUpperCase()}
            </span>
            <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
            <RiAddBoxLine className="h-6 w-auto" color="#FEFAF0" />
          </button>
        )}
      </div>

      {representatives.length > 0 ? (
        <div
          className={`flex w-full max-w-7xl flex-col flex-nowrap items-center justify-center gap-4 pb-4 md:flex-row md:flex-wrap md:items-start`}
        >
          {representatives.map((rep, index) => (
            <div className="flex w-full flex-col items-center" key={rep.id}>
              <BuyerRepresentativeCard
                rep={rep}
                deleteRep={deleteRepresentativeById}
                updateRep={updateRepresentative}
              />
              {representatives.length !== index + 1 && (
                <hr className="mt-4 h-[1px] w-full border border-dashed bg-light-gray opacity-50" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="my-12 flex flex-col">
          <MdOutlineGroupOff className="h-16 w-auto opacity-50" color="#888" />
          {error ? (
            <p className="mt-2 text-center text-xl font-normal text-light-gray opacity-75">
              Kunne ikke få tak i representanter :( <br />
              Prøv igjen eller ta kontakt med oss
            </p>
          ) : (
            <p className="mt-2 text-center text-xl font-normal text-light-gray opacity-75">
              Ingen brukere her ennå. <br />
              Legg til den første da :)
            </p>
          )}
        </div>
      )}
      <AddRepresentativeModal
        open={isRepModalOpen}
        setOpen={setRepModalOpen}
        setRepresentatives={setRepresentatives}
      />
      {error && (
        <ErrorDialog
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          error={error}
        />
      )}
    </div>
  );
};

export default BuyerRepresentativesList;
