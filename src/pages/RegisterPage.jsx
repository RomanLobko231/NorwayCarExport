import RegisterBuyer from "../ui/buyer/RegisterBuyer";
import RegisterSeller from "../ui/seller/RegisterSeller";

const RegisterPage = () => {
  return (
    <div className="flex w-full flex-col items-center px-4 pt-28 md:px-0 md:pt-28">
      <h1 className="mb-7 text-center text-4xl font-semibold text-medium-gray">
        Hvem vil du registrere deg som?
      </h1>
      <div className="mt-12 flex w-full flex-row flex-wrap items-baseline justify-center gap-9">
        <div className="flex flex-col items-center">
          <img
            src="./icons/car_sold.png"
            className="max-h-[150px] w-auto object-contain"
          />
          <p className="text-medli-gray mb-3 mt-5 text-center text-lg font-normal">
            Selg bilen din raskt og enkelt til pålitelige kjøpere
          </p>
          <RegisterSeller />
        </div>
        <div className="flex flex-col items-center">
          <img
            src="./icons/auction.png"
            className="max-h-[150px] w-auto object-contain"
          />
          <p className="text-medli-gray mb-3 mt-5 text-center text-lg font-normal">
            Få tilgang til eksklusive bilauksjoner og gode tilbud
          </p>
          <RegisterBuyer />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
