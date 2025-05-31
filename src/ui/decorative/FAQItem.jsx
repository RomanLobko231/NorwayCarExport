import { useState } from "react";
import { RiArrowDownBoxLine, RiArrowUpBoxLine } from "react-icons/ri";

const FAQItem = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="flex w-full cursor-pointer flex-col rounded-lg border border-dashed border-swamp-500 bg-gradient-to-br from-swamp-100 to-distant-cloud p-4"
      onClick={() => {
        setIsExpanded((prev) => !prev);
      }}
    >
      <div className="flex w-full flex-row items-start justify-between text-medium-gray">
        <h3 className="inline-block w-full bg-gradient-to-b from-gunmental to-swamp-500 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
          {index + 1}. {item.question}
        </h3>
        {isExpanded ? (
          <RiArrowUpBoxLine
            className="h-8 w-auto hover:opacity-50 active:opacity-10"
            color="#333333"
          />
        ) : (
          <RiArrowDownBoxLine
            className="h-8 w-auto hover:opacity-50 active:opacity-10"
            color="#333333"
          />
        )}
      </div>
      {isExpanded && (
        <p className="mt-3 w-full text-base font-medium text-medium-gray/70 md:text-lg">
          {item.answer}
        </p>
      )}
    </div>
  );
};

export default FAQItem;
