import { useState, useTransition } from "react";
import { RiArrowDownBoxLine, RiArrowUpBoxLine } from "react-icons/ri";
import FAQItem from "./FAQItem";
import { useTranslation } from "react-i18next";

const FAQList = () => {
  const { t } = useTranslation("faqs");

  const faqs = t("faqs", { returnObjects: true });

  return (
    <div className="flex w-full max-w-5xl flex-col gap-3 px-4 pt-8 md:gap-4">
      {faqs.map((item, index) => (
        <div className="flex w-full flex-col items-center">
          <FAQItem item={item} index={index} />
          {faqs.length !== index + 1 && (
            <hr className="mt-3 h-[1px] w-4/5 border border-dashed bg-light-gray opacity-50 md:mt-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
