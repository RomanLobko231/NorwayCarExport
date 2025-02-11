import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const RegisterBuyerModal = ({ open, setOpen }) => {
  const submitRequest = () => {};

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
            className="relative w-full max-w-lg transform overflow-hidden rounded-xl border border-light-gray bg-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
              Fyll ut skjemaet
            </h1>
            <form
              className="flex w-full flex-col items-center md:px-2"
              onSubmit={submitRequest}
            >
              <div className="relative mb-4 mt-8 w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
                  <img
                    src="../icons/person.png"
                    alt="Person icon"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
                  placeholder="Fullt Navn*"
                  required
                />
              </div>
              <div className="relative mb-4 w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
                  <img
                    src="../icons/phone.png"
                    alt="Phone icon"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                </div>

                <input
                  type="number"
                  id="telephone"
                  className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
                  placeholder="Mobilnummer*"
                  required
                />
              </div>
              <div className="relative mb-4 w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
                  <img
                    src="../icons/email.png"
                    alt="Email icon"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                </div>

                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
                  placeholder="Email*"
                  required
                />
              </div>
              <div className="relative mb-4 w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
                  <img
                    src="../icons/numbers.png"
                    alt="Numbers icon"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                </div>
                <input
                  type="text"
                  id="reg_num"
                  className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
                  placeholder="Organisasjonsnr."
                />
              </div>
              <div className="relative mb-4 w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
                  <img
                    src="../icons/location.png"
                    alt="Address icon"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                </div>
                <input
                  type="text"
                  id="Address"
                  className="block w-full rounded-full border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
                  placeholder="Addresse"
                />
              </div>
              <button
                type="submit"
                className="buttonsh hover:button_shadow_hover active:button_shadow_click group mt-5 flex flex-row items-center space-x-2 rounded-full bg-gradient-to-br from-mirage to-swamp-500 px-6 pb-4 pt-4 hover:from-mirage hover:to-gunmental md:space-x-3 md:rounded-lg md:px-7 md:pb-3 md:pt-3"
              >
                <span className="text-xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-2xl">
                  SEND SØKNAD
                </span>
                <div className="h-[16px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[22px]"></div>
                <img
                  src="../icons/send.png"
                  alt="Send Application"
                  className="h-4 w-4 md:h-5 md:w-5"
                />
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default RegisterBuyerModal;
