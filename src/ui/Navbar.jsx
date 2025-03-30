import {
  CloseButton,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars2Icon,
  XMarkIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BuyerModal from "./buyer/BuyerModal";
import LoginModal from "./LoginModal";
import { MdOutlineDirectionsCar, MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";

const navigation = [
  { name: "Logg inn", href: "/login", current: false },
  { name: "Registrer bruker", href: "/register", current: false },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginModalopen, setLoginModalOpen] = useState(false);

  return (
    <div className="fixed z-10 flex w-full justify-center">
      <Disclosure
        as="nav"
        className="mx-4 my-3 flex w-full max-w-7xl flex-col items-center justify-center rounded-lg border border-medium-gray bg-gradient-to-bl from-lighthouse/80 to-slate-50/80 backdrop-blur"
      >
        <div className="w-full max-w-7xl px-6 lg:px-8">
          <div className="flex h-12 flex-row items-center justify-between md:h-14">
            <div className="flex flex-1 items-center justify-between sm:items-stretch">
              <div
                className="flex flex-shrink-0 cursor-pointer items-center"
                onClick={() => navigate("/")}
              >
                <img
                  alt="NCE logo"
                  src="../nce_logo.png"
                  className="mr-2 h-7 w-auto"
                />
                <p className="text-3xl font-black text-medium-gray md:pb-1 md:text-4xl">
                  NCE
                </p>
              </div>
              <div className="hidden py-1 sm:ml-6 sm:block">
                <div className="flex space-x-3">
                  <Link
                    to="/register"
                    className={`${
                      location.pathname === "/register"
                        ? "border bg-swamp-100 text-gunmental"
                        : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
                    } rounded-lg border-gunmental px-4 pb-2 pt-1 text-xl font-semibold`}
                  >
                    Register bruker
                  </Link>
                  <div
                    className={`cursor-pointer rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
                    onClick={() => setLoginModalOpen(true)}
                  >
                    {" "}
                    Logg inn
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-medium-gray hover:text-gunmental">
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

        <DisclosurePanel className="w-full sm:hidden">
          <div className="flex w-full flex-col items-center space-y-3 pb-7 pl-7 pr-6 pt-8">
            <CloseButton
              as={Link}
              to={"/register"}
              className={`${
                location.pathname === "/register"
                  ? "border bg-swamp-100 text-gunmental"
                  : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
              } flex w-full flex-row items-center justify-between rounded-lg border-gunmental px-4 pb-1 pt-1 text-xl font-semibold md:pb-2`}
            >
              Register bruker
              <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdOutlinePersonAddAlt className="mt-[1px] h-6 w-auto" />
            </CloseButton>

            <CloseButton
              as={Link}
              onClick={() => setLoginModalOpen(true)}
              className={`flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
            >
              Logg inn
              <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <IoMdLogIn className="mt-[1px] h-6 w-auto" />
            </CloseButton>

            <CloseButton
              as={Link}
              onClick={() => setLoginModalOpen(true)}
              className={`flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border-gunmental from-mirage to-swamp-500 px-4 pb-2 pt-1 text-xl font-semibold text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse`}
            >
              Alle biler
              <div className="mx-3 mt-[1px] h-[1px] flex-grow bg-light-gray opacity-50"></div>
              <MdOutlineDirectionsCar className="mt-[1px] h-6 w-auto" />
            </CloseButton>
            <p className="mt-12 w-full text-center font-extralight text-gray-500">
              Vi gjør det enkelt for deg
            </p>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <LoginModal open={loginModalopen} setOpen={setLoginModalOpen} />
    </div>
  );
}
