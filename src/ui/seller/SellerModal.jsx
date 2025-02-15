import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useState } from "react";
import ApiService from "../../api/ApiService";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import {
  MdOutlineDirectionsCar,
  MdOutlineEmail,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdOutlineSpeed,
} from "react-icons/md";

const SellerModal = ({ open, setOpen }) => {
  const [sellerData, setSellerData] = useState({
    ownerName: "",
    phoneNumber: "",
    registrationNumber: "",
    email: "",
    kilometers: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postCarRequest = async (request) => {
    setIsLoading(true);
    setError(null);
    try {
      await ApiService.postCarRequest(request);
      setSellerData({
        ownerName: "",
        phoneNumber: "",
        carRegistrationNumber: "",
        email: "",
        kilometers: "",
      });
      setOpen(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitRequest = (e) => {
    e.preventDefault();
    postCarRequest(sellerData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            className="from-swamp-100 relative w-full max-w-lg transform overflow-hidden rounded-xl border border-light-gray bg-gradient-to-bl to-distant-cloud p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:min-w-[400px]"
          >
            <h1 className="text-center text-2xl font-bold text-medium-gray md:text-3xl">
              Fyll ut skjemaet
            </h1>
            <form
              className="flex w-full flex-col items-center md:px-2"
              onSubmit={submitRequest}
            >
              <TextInputField
                label="Navn"
                name="ownerName"
                icon={<MdOutlinePerson2 className="h-6 w-auto" color="#333" />}
                initialValue={sellerData.ownerName}
                onChange={handleInputChange}
              />
              <TextInputField
                label="Mobilnummer"
                name="phoneNumber"
                icon={<MdOutlinePhone className="h-6 w-auto" color="#333" />}
                initialValue={sellerData.phoneNumber}
                onChange={handleInputChange}
              />
              <TextInputField
                label="Epost"
                name="email"
                icon={<MdOutlineEmail className="h-6 w-auto" color="#333" />}
                initialValue={sellerData.email}
                onChange={handleInputChange}
              />
              <TextInputField
                label="Registrasjonsnummer"
                name="registrationNumber"
                icon={
                  <MdOutlineDirectionsCar className="h-6 w-auto" color="#333" />
                }
                initialValue={sellerData.registrationNumber}
                onChange={handleInputChange}
              />
              <NumberInputField
                label="Kilometerstand"
                name="kilometers"
                icon={<MdOutlineSpeed className="h-6 w-auto" color="#333" />}
                initialValue={sellerData.kilometers}
                onChange={handleInputChange}
              />
              {error && <p>{error.message}</p>}
              {isLoading ? (
                <p>Loading..</p>
              ) : (
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
              )}
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SellerModal;
