import { useEffect, useState } from "react";

const DateInputField = ({
  icon,
  label,
  name,
  initialValue,
  onChange,
  optional,
}) => {
  const formatDate = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 4)
      cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    if (cleaned.length > 7)
      cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);

    return cleaned;
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (value.endsWith("-")) {
      value = value.slice(0, -1);
    }

    const formattedValue = formatDate(value);
    onChange({ target: { name, value: formattedValue } });
  };

  return (
    <div className="mb-2 mt-1 w-full flex-col">
      <label
        htmlFor={label}
        className="ml-5 text-base font-medium text-light-gray"
      >
        {label}
        {!optional && "*"}
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          {icon}
        </div>
        <input
          type="text"
          id={label}
          name={name}
          value={initialValue}
          onChange={handleInputChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray disabled:text-light-gray md:ps-12 md:text-lg"
          required={!optional}
          placeholder="YYYY-MM-DD"
          maxLength={10}
        />
      </div>
    </div>
  );
};

export default DateInputField;
