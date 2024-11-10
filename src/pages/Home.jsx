import InfoList from "../ui/InfoList";
import InfoCard from "../ui/InfoList";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-32 md:pt-40">
      <h1 className="mx-6 text-center text-5xl font-normal text-medium-gray md:hidden">
        Velkommen til{" "}
        <h5 className="inline-block bg-gradient-to-b from-gunmental to-swamp-light bg-clip-text font-bold text-transparent">
          stressfri handel
        </h5>{" "}
        for bilen din
      </h1>
      <h1 className="hidden w-4/5 text-center text-6xl font-normal text-medium-gray md:block">
        Velkommen til{" "}
        <span className="inline-block bg-gradient-to-b from-gunmental to-swamp-light bg-clip-text font-bold text-transparent">
          stressfri handel
        </span>{" "}
        for bilen din
      </h1>
      <img
        className="gradv md:gradvh mt-8 max-h-[155px] w-full object-cover object-center md:max-h-[300px] lg:max-h-[340px]"
        src="./carhero.jpg"
        alt=""
      />
      <p className="text-center text-2xl font-light text-light-gray">
        Vi gjør det enkelt for deg
      </p>
      <div className="mt-2 flex flex-col items-center md:flex-row md:space-x-10">
        <button className="buttonsh active:button_shadow_hover group mt-4 flex flex-row items-center space-x-2 rounded-full bg-gradient-to-br from-mirage to-swamp px-6 pb-5 pt-4 hover:mt-3 hover:border-2 hover:border-gunmental hover:from-mirage hover:to-gunmental md:space-x-3 md:px-7">
          <span className="text-2xl font-semibold leading-4 text-cornsilk group-hover:text-lighthouse md:text-3xl">
            SELGE BIL
          </span>
          <div className="h-[18px] border-l-2 border-solid border-cornsilk group-hover:border-lighthouse md:h-[24px]"></div>
          <img
            src="./sellcar.png"
            alt="Dollar sign"
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </button>
        <span className="mt-4 text-center text-sm font-extralight text-light-gray md:text-base">
          eller
        </span>
        <button className="buttonsh active:button_shadow_hover group mt-4 flex flex-row items-center space-x-2 rounded-full bg-cornsilk px-6 pb-5 pt-4 hover:mt-3 hover:border-2 hover:border-gunmental md:space-x-3 md:px-7">
          <span className="text-2xl font-semibold leading-4 text-gunmental md:text-3xl">
            KJØPE BIL
          </span>
          <div className="h-[18px] border-l-2 border-solid border-gunmental md:h-[24px]"></div>
          <img
            src="./buycar.png"
            alt="Dollar sign"
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </button>
      </div>
      <div className="mt-16 flex flex-row items-center space-x-4 md:mt-20">
        <div className="w-[70px] border-t-2 border-solid border-light-gray md:w-[200px]"></div>
        <h1 className="text-center text-3xl font-bold text-medium-gray md:text-4xl">
          KOM I GANG
        </h1>
        <div className="w-[70px] border-t-2 border-solid border-light-gray md:w-[200px]"></div>
      </div>
      <InfoList />
    </div>
  );
};

export default Home;
