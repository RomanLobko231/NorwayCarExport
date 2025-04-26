import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router";

const ErrorDialog = ({ isOpen, setIsOpen, error }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[75]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 flex w-full items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-3 rounded-lg border border-swamp-500 bg-lighthouse p-7">
          <DialogTitle className="text-base font-bold text-medium-gray md:text-lg">
            {`Error: ${error.statusCode}`}
          </DialogTitle>
          <p className="text-lg font-bold text-medium-gray md:text-xl">
            {error.message}
          </p>
          {error.statusCode === 401 ||
            (error.statusCode === 403 && (
              <p className="text-sm font-normal text-medium-gray">
                Refresh page or try to login again.
              </p>
            ))}

          <p className="text-sm font-normal text-medium-gray">
            If an error persists after several retries, please contact us:
            contact@norwaycarexport.no
          </p>
          <p className="text-xs font-light text-light-gray">
            {error.timestamp}
          </p>
          <div className="flex gap-4">
            <button
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-md border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
              onClick={() => {
                setIsOpen(false);
                if (error.statusCode == 401 || error.statusCode == 403)
                  window.location.reload();
              }}
            >
              Lukk
            </button>
            {error.statusCode == 401 || error.statusCode == 403 ? (
              <button
                className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-md border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
                onClick={() => {
                  sessionStorage.clear();
                  setIsOpen(false);
                  window.location.reload();
                }}
              >
                Logg inn
              </button>
            ) : (
              <button
                className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-md border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/");
                }}
              >
                Hjem
              </button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ErrorDialog;
