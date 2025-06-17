import {
  CloseButton,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { GoNorthStar } from "react-icons/go";
import {
  Bars2Icon,
  XMarkIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import {
  MdOutlineDirectionsCar,
  MdOutlinePerson2,
  MdOutlinePersonAddAlt,
} from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import LanguageChange from "./LanguageChange";
import { useTranslation } from "react-i18next";
import { i18n } from "./../i18n/i18n.js";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginModalopen, setLoginModalOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const { t, i18n } = useTranslation("common");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="fixed z-10 flex w-full flex-col items-center justify-center px-4">
      <div className="mx-auto -mb-2 w-full max-w-7xl bg-gradient-to-bl from-lighthouse/80 to-slate-50/80 backdrop-blur">
        <div className="text-center text-base font-semibold text-medium-gray">
          <div
            x-data="{}"
            x-init="$nextTick(() => {
                        let ul = $refs.text;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
            className="inline-flex w-full flex-nowrap overflow-hidden py-1 [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-50px),transparent_100%)]"
          >
            <ul
              x-ref="text"
              className="animate-infiniteScroll flex items-center justify-center md:justify-start [&_li]:mx-8"
            >
              <li>
                <p className="text-nowrap">{t("auction_launched")}</p>
              </li>
              <li>
                <GoNorthStar className="text-danger-red" />
              </li>
              <li>
                <p className="text-nowrap">{t("auction_launched")}</p>
              </li>
              <li>
                <GoNorthStar className="text-danger-red" />
              </li>
            </ul>
            <ul
              x-ref="text"
              className="animate-infiniteScroll flex items-center justify-center md:justify-start [&_li]:mx-8"
            >
              <li>
                <p className="text-nowrap">{t("auction_launched")}</p>
              </li>
              <li>
                <GoNorthStar className="text-danger-red" />
              </li>
              <li>
                <p className="text-nowrap">{t("auction_launched")}</p>
              </li>
              <li>
                <GoNorthStar className="text-danger-red" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Disclosure
        as="nav"
        className="mx-4 my-3 flex w-full max-w-7xl flex-col items-center justify-center rounded-lg border border-medium-gray bg-gradient-to-bl from-lighthouse/80 to-slate-50/80 backdrop-blur"
      >
        <div className="w-full max-w-7xl px-6 lg:px-8">
          <div className="flex h-12 flex-row items-center justify-between md:h-14">
            <div className="flex flex-1 items-center justify-between sm:items-stretch">
              <div className="block sm:hidden">
                <LanguageChange
                  changeLanguage={changeLanguage}
                  currLang={i18n.language}
                />
              </div>

              <div
                className="flex flex-shrink-0 cursor-pointer items-center"
                onClick={() => navigate("/")}
              >
                <img
                  alt="NCE logo"
                  src="../nce_logo.png"
                  className="mr-2 h-7 w-auto"
                />
                <span className="mb-1 hidden bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-[1.95rem] font-black text-transparent md:inline-block">
                  NCE
                </span>
              </div>
              <div className="hidden py-1 sm:ml-6 sm:block">
                <div className="flex gap-3">
                  <Link
                    to="/auctions"
                    className={`${
                      location.pathname === "/auctions"
                        ? "border bg-swamp-100 text-gunmental"
                        : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
                    } rounded-lg border-gunmental px-4 pb-2 pt-1 text-xl font-semibold`}
                  >
                    {t("auctions")}
                  </Link>
                  <Link
                    to="/register"
                    className={`${
                      location.pathname === "/register"
                        ? "border bg-swamp-100 text-gunmental"
                        : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
                    } rounded-lg border-gunmental px-4 pb-2 pt-1 text-xl font-semibold`}
                  >
                    {t("register_user")}
                  </Link>
                  {token ? (
                    <div
                      className={`${
                        location.pathname.includes("user")
                          ? "border bg-swamp-100 text-gunmental"
                          : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
                      } cursor-pointer rounded-lg border-gunmental px-4 pb-2 pt-1 text-xl font-semibold`}
                      onClick={() => navigate(`/user/${userId}`)}
                    >
                      {t("profile")}
                    </div>
                  ) : (
                    <div
                      className={`cursor-pointer rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
                      onClick={() => setLoginModalOpen(true)}
                    >
                      {t("login")}
                    </div>
                  )}

                  <LanguageChange
                    changeLanguage={changeLanguage}
                    currLang={i18n.language}
                  />
                </div>
              </div>
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md py-2 text-medium-gray hover:text-gunmental">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars2Icon
                    aria-hidden="true"
                    className="block h-8 w-8 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-8 w-8 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="w-full sm:hidden">
          <div className="flex w-full flex-col items-center space-y-5 pb-7 pl-7 pr-6 pt-8">
            <CloseButton
              as={Link}
              to={"/register"}
              className={`${
                location.pathname === "/register"
                  ? "border bg-swamp-100 text-gunmental"
                  : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
              } flex w-full flex-row items-center justify-between rounded-lg border-gunmental px-4 pb-1 pt-1 text-xl font-semibold md:pb-2`}
            >
              {t("register_user")}
              <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdOutlinePersonAddAlt className="mt-[1px] h-6 w-auto" />
            </CloseButton>

            <CloseButton
              as={Link}
              to={"/auctions"}
              className={`flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
            >
              {t("auctions")}
              <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdOutlineDirectionsCar className="mt-[1px] h-6 w-auto" />
            </CloseButton>

            {token ? (
              <CloseButton
                as={Link}
                to={`/user/${userId}`}
                className={`flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
              >
                {t("profile")}
                <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
                <MdOutlinePerson2 className="mt-[1px] h-6 w-auto" />
              </CloseButton>
            ) : (
              <CloseButton
                as={Link}
                onClick={() => setLoginModalOpen(true)}
                className={`flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
              >
                {t("login")}
                <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
                <IoMdLogIn className="mt-[1px] h-6 w-auto" />
              </CloseButton>
            )}

            <p className="mt-12 w-full text-center font-extralight text-gray-500">
              {t("moto")}
            </p>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <LoginModal open={loginModalopen} setOpen={setLoginModalOpen} />
    </div>
  );
}
