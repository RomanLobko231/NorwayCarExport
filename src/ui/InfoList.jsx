import { stepsToStart } from "../infoForUser";

const InfoList = () => {
  return (
    <div className="flex w-full flex-col space-y-4 p-6">
      {stepsToStart.map((step, index) => (
        <div className="flex min-h-[160px] w-full flex-row rounded-lg border border-swamp-light bg-distant-cloud px-4 py-5">
          <div className="flex h-[60px] min-w-[60px] items-center justify-center rounded-md bg-gradient-to-br from-mirage to-swamp pb-2 text-5xl font-bold text-distant-cloud">
            {index + 1}
          </div>
          <div className="flex flex-col space-y-2 px-3">
            <h1 className="text-2xl font-bold leading-5">{step.title}</h1>
            <p className="text-lg font-normal">{step.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoList;
