import { useState } from "react";

const NumberInputField = ({
  icon,
  label,
  name,
  initialValue,
  onChange,
  disabled,
  optional,
}) => {
  return (
    <div className="mb-2 mt-1 w-full flex-col">
      <label
        htmlFor={label}
        className="ml-5 text-sm font-medium text-light-gray md:text-base"
      >
        {label}
        {!optional && "*"}
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          {icon}
        </div>
        <input
          onKeyDown={(evt) =>
            ["e", "E", "+", "-", ".", ","].includes(evt.key) &&
            evt.preventDefault()
          }
          onPaste={(e) => {
            e.preventDefault();
          }}
          onWheel={(e) => e.currentTarget.blur()}
          min={0}
          type="number"
          id={label}
          name={name}
          onChange={onChange}
          value={
            initialValue == null ||
            initialValue == undefined ||
            initialValue === ""
              ? ""
              : initialValue
          }
          className="block w-full rounded-lg border border-medium-gray bg-white px-3 py-2.5 ps-12 text-base font-medium text-medium-gray disabled:border-none disabled:bg-slate-50 disabled:px-[22px] disabled:py-[11px] disabled:ps-12 md:text-lg"
          required={!optional}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default NumberInputField;
