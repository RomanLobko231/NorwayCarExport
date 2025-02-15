import { useEffect, useState } from "react";

const TextInputField = ({
  label,
  type,
  name,
  icon,
  initialValue,
  onChange,
}) => {
  return (
    <div className="mb-2 mt-1 w-full flex-col">
      <label
        htmlFor={label}
        className="ml-5 text-base font-medium text-light-gray"
      >
        {label}
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
          {icon}
        </div>
        <input
          type={type ? type : "text"}
          id={label}
          name={name}
          value={initialValue}
          onChange={onChange}
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-11 text-base font-medium text-medium-gray disabled:text-light-gray md:ps-14 md:text-lg"
          required
        />
      </div>
    </div>
  );
};

export default TextInputField;
