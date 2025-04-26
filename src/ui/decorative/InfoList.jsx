import { useTranslation } from "react-i18next";
import { stepsToStart } from "../../infoForUser";

const InfoList = () => {
  const { t } = useTranslation();

  const translated_titles = [
    { title: t("title_step_1"), body: t("body_step_1") },
    { title: t("title_step_2"), body: t("body_step_2") },
    { title: t("title_step_3"), body: t("body_step_3") },
  ];

  return (
    <div className="flex w-full max-w-7xl flex-col space-y-4 px-4 pt-8 lg:flex-row lg:space-x-4 lg:space-y-0">
      {stepsToStart.map((step, index) => (
        <div
          className="lg:w-300 flex min-h-[160px] w-full flex-row rounded-lg border border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud px-4 py-5"
          key={index}
        >
          <div className="flex h-[60px] min-w-[60px] items-center justify-center rounded-md bg-gradient-to-r from-mirage to-swamp-500 text-5xl font-bold text-distant-cloud lg:pb-1">
            {index + 1}
          </div>
          <div className="flex flex-col space-y-2 pl-3 pr-1 lg:space-y-3 lg:px-4">
            <h1 className="text-2xl font-bold leading-5 md:text-3xl md:leading-6">
              {translated_titles.at(index).title}
            </h1>
            <p className="text-lg font-normal md:text-xl">
              {translated_titles.at(index).body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoList;
