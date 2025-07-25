import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  MdClose,
  MdOutlineAlternateEmail,
  MdOutlineOutbox,
  MdPassword,
} from "react-icons/md";
import { useState } from "react";
import TextInputField from "./input/TextInputField";
import PasswordInputField from "./input/PasswordInputField";
import { Link, useNavigate } from "react-router-dom";
import UserApiService from "../api/UserApiService";
import ErrorMessage from "./message/ErrorMessage";
import { useTranslation } from "react-i18next";
import { RiArrowUpBoxLine } from "react-icons/ri";

const LoginModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [loginData, setLoginData] = useState({ password: "", email: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async () => {
    try {
      const response = await UserApiService.loginUser(loginData);
      navigate(`/user/${response.data.userId}`);
      setLoginData({ password: "", email: "" });
      setOpen(false);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full w-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-swamp-500 bg-gradient-to-bl from-swamp-100 to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <div className="mb-2 flex flex-row items-center justify-between md:px-2">
              <h1 className="mb-1 whitespace-nowrap text-center text-2xl font-bold text-medium-gray md:text-3xl">
                {t("login")}
              </h1>
              <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdClose
                className="h-6 w-6 hover:opacity-25"
                color="#333333"
                onClick={() => setOpen(false)}
              />
            </div>
            <form
              className="flex w-full flex-col items-center md:px-2"
              onSubmit={submitLogin}
            >
              <TextInputField
                label={t("email")}
                name="email"
                type="email"
                icon={
                  <MdOutlineAlternateEmail
                    className="h-6 w-auto"
                    color="#333"
                  />
                }
                initialValue={loginData.email}
                onChange={handleInputChange}
              />
              <PasswordInputField
                label={t("password")}
                name="password"
                icon={<MdPassword className="h-6 w-auto" color="#333" />}
                initialValue={loginData.password}
                onChange={handleInputChange}
              />
              <Link
                to="/register"
                className="text-center text-sm font-normal text-light-gray underline hover:text-medium-gray md:text-base"
              >
                {t("register")}
              </Link>
              {error && <ErrorMessage error={error.message} />}
              <button
                type="submit"
                className="buttonsh hover:button_shadow_hover active:button_shadow_click group mt-3 flex flex-row items-center space-x-2 rounded-lg bg-gradient-to-br from-mirage to-swamp-500 px-6 py-2 text-cornsilk hover:from-mirage hover:to-gunmental md:space-x-3 md:rounded-lg md:px-7"
              >
                <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                  {t("login").toUpperCase()}
                </span>
                <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[22px]"></div>
                <MdOutlineOutbox className="h-6 w-auto" />
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
