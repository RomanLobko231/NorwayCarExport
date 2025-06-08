import { MdOutlineOutbox, MdPassword } from "react-icons/md";
import PasswordInputField from "./PasswordInputField";
import { useTranslation } from "react-i18next";
import UserApiService from "../../api/UserApiService";
import { useState } from "react";
import ErrorMessage from "../message/ErrorMessage";
import SuccessMessage from "../message/SuccessMessage";

const PasswordChange = () => {
  const { t } = useTranslation();
  const userId = sessionStorage.getItem("userId");

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const changePasswordById = async () => {
    if (password.length < 8) {
      setError({ message: "Password must be at leat 8 symbols long" });
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await UserApiService.updatePasswordById(password, userId);
      setPassword("");
      setError(null);
      setSuccessMessage(t("password_changed_success"));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex w-full flex-col items-center rounded-md p-2 md:w-3/5 md:p-4 ${changePasswordOpen && "border border-medium-gray"}`}
    >
      <p
        onClick={() => {
          setChangePasswordOpen((prev) => !prev);
          setError(null);
          setSuccessMessage("");
        }}
        className="cursor-pointer text-center font-normal text-light-gray underline hover:font-semibold hover:text-medium-gray md:text-base"
      >
        {t("change_password")}
      </p>
      {error && <ErrorMessage error={error.message} />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {changePasswordOpen && (
        <div className="flex w-full flex-col items-end md:flex-row md:gap-4">
          <PasswordInputField
            label={t("password")}
            name="password"
            icon={<MdPassword className="h-6 w-auto" color="#333" />}
            initialValue={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <button
              type="button"
              className="buttonsh hover:button_shadow_hover active:button_shadow_click group my-2 flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 hover:from-mirage hover:to-gunmental md:my-0 md:mb-2.5 md:w-2/5 md:space-x-2 md:rounded-lg"
              onClick={changePasswordById}
            >
              <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                {t("send")}
              </span>
              <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[18px]"></div>
              <MdOutlineOutbox className="h-6 w-auto" color="#FEFAF0" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChange;
