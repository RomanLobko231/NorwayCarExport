import { useTranslation } from "react-i18next";
import { stepsToStart } from "../../infoForUser";

const InfoList = () => {
  const { t } = useTranslation("startsteps");

  const translatedSteps = t("startsteps", { returnObjects: true });

  return (
    <div className="flex w-full max-w-7xl flex-col space-y-4 px-4 pt-8 lg:flex-row lg:space-x-4 lg:space-y-0">
      {translatedSteps.map((step, index) => (
        <div
          className="lg:w-300 flex w-full flex-row rounded-lg border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud px-4 py-5"
          key={index}
        >
          <div className="flex h-[60px] min-w-[60px] items-center justify-center rounded-md bg-gradient-to-r from-mirage to-swamp-500 text-5xl font-bold text-distant-cloud lg:pb-1">
            {index + 1}
          </div>
          <div className="flex flex-col gap-2 pl-3 pr-1 lg:px-4">
            <h1 className="inline-block w-full bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
              {step.title}
            </h1>
            <p className="text-base font-medium text-medium-gray/70 md:text-lg">
              {step.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoList;
