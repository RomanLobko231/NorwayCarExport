import { stepsToStart } from "../infoForUser";

const InfoList = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col space-y-4 px-4 pt-8 md:flex-row md:space-x-4 md:space-y-0">
      {stepsToStart.map((step, index) => (
        <div
          className="md:w-300 border-swamp-500 flex min-h-[160px] w-full flex-row rounded-lg border bg-distant-cloud px-4 py-5"
          key={index}
        >
          <div className="to-swamp-500 flex h-[60px] min-w-[60px] items-center justify-center rounded-md bg-gradient-to-r from-mirage text-5xl font-bold text-distant-cloud md:pb-1">
            {index + 1}
          </div>
          <div className="flex flex-col space-y-2 pl-3 pr-1 md:space-y-3 md:px-4">
            <h1 className="text-2xl font-bold leading-5 md:text-3xl md:leading-6">
              {step.title}
            </h1>
            <p className="text-lg font-normal md:text-xl">{step.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoList;
