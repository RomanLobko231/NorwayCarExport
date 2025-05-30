import { useState } from "react";
import { RiArrowDownBoxLine, RiArrowUpBoxLine } from "react-icons/ri";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
    answer:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand. Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
  },
  {
    question:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
    answer:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand. Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
  },
  {
    question:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
    answer:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand. Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
  },
  {
    question:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
    answer:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand. Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
  },
  {
    question:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
    answer:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand. Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
  },
  {
    question:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
    answer:
      "Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand. Etter at søknaden er godkjent, blir bilen din tilgjengelig for salg til forhand",
  },
];

const FAQList = () => {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-4 px-4 pt-8">
      {faqs.map((item, index) => (
        <div className="flex w-full flex-col items-center">
          <FAQItem item={item} index={index} />
          {faqs.length !== index + 1 && (
            <hr className="mt-4 h-[1px] w-4/5 border border-dashed bg-light-gray opacity-50" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
