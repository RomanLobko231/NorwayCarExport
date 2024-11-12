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
import { Link } from "react-router-dom";

const navigation = [
  { name: "For selgere", href: "#", current: false },
  { name: "For kjøpere", href: "#", current: false },
  { name: "Kontakt oss", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
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
                {/* <img alt="NCE logo" src="./ncepng.png" className="h-8 w-auto" /> */}
                <p className="text-3xl font-black text-medium-gray md:pb-1 md:text-4xl">
                  NCE
                </p>
              </div>
              <div className="hidden py-1 sm:ml-6 sm:block">
                <div className="flex space-x-3">
                  {navigation.map((item) => (
                    <Link
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gunmental text-lighthouse"
                          : "text-gunmental hover:bg-gunmental hover:text-lighthouse",
                        "text-bases rounded-full px-4 pb-2 pt-1 text-xl font-semibold",
                      )}
                      to={item.href}
                    >
                      {item.name}
                    </Link>
                  ))}
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
          <div className="w-full space-y-6 px-2 pb-9 pt-8">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gunmental text-lighthouse"
                    : "text-gunmental hover:bg-gray-700 hover:text-lighthouse",
                  "block rounded-full px-4 pb-3 pt-2 text-center text-2xl font-semibold",
                )}
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
    </div>
  );
}
