import {
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
        className="mx-4 my-3 flex w-full max-w-7xl flex-col items-center justify-center rounded-lg border border-medium-gray bg-lighthouse/50 backdrop-blur"
      >
        <div className="w-full max-w-7xl px-6 lg:px-8">
          <div className="flex h-12 flex-row items-center justify-between md:h-14">
            <div className="flex flex-1 items-center justify-between sm:items-stretch">
              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="NCE logo"
                  src="../nce_logo.png"
                  className="mr-2 h-7 w-auto"
                />
                <p
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-3xl font-black text-medium-gray md:pb-1 md:text-4xl"
                >
                  NCE
                </p>
              </div>
              <div className="hidden py-1 sm:ml-6 sm:block">
                <div className="flex space-x-3">
                  <Link
                    to="/register"
                    className={`${
                      location.pathname === "/register"
                        ? "bg-swamp-100 border border-dashed text-gunmental"
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

        <DisclosurePanel className="sm:hidden">
          <div className="flex w-full flex-col items-center space-y-6 px-2 pb-9 pt-8">
            {navigation.map((item, index) => (
              <DisclosureButton
                key={index}
                as="a"
                href={item.href}
                className={`${
                  location.pathname === item.href
                    ? "bg-swamp-100 border border-dashed text-gunmental"
                    : "from-mirage to-swamp-500 text-medium-gray hover:bg-gradient-to-br hover:text-lighthouse"
                } rounded-lg border-gunmental px-4 pb-1 pt-1 text-xl font-semibold`}
              >
                {item.name}
              </DisclosureButton>
            ))}
            <p className="mt-10 text-center font-extralight text-gray-500">
              Vi gjør det enkelt for deg
            </p>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <LoginModal open={loginModalopen} setOpen={setLoginModalOpen} />
    </div>
  );
}
