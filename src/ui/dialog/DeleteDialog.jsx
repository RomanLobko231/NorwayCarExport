import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";

const DeleteDialog = ({ isOpen, setIsOpen, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-3 rounded-lg border border-swamp-500 bg-lighthouse p-7">
          <DialogTitle className="text-2xl font-bold">
            {t("warning")}!
          </DialogTitle>
          <p className="text-lg font-semibold text-gunmental">
            {t("sure_to_delete")}
          </p>
          <div className="flex gap-4">
            <button
              className="card_shadow mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse"
              onClick={() => setIsOpen(false)}
            >
              {t("close_lower_case")}
            </button>
            <button
              className="card_shadow text group mb-2 mt-5 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-4 pb-1 pt-1 text-xl font-semibold text-danger-red hover:bg-danger-red hover:text-lighthouse"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              {t("delete")}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
