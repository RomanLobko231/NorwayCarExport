import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PasswordInputField = ({ label, name, initialValue, onChange, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-2 mt-1 w-full flex-col">
      <label
        htmlFor={name}
        className="ml-5 text-base font-medium text-light-gray"
      >
        {label}
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
          {icon}
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={initialValue}
          onChange={onChange}
          autoComplete="current-password"
          className="block w-full rounded-lg border border-medium-gray bg-white px-5 py-2.5 ps-14 text-base font-medium text-medium-gray disabled:text-light-gray md:text-lg"
          required
        />

        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-5 text-medium-gray hover:opacity-25"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <IoMdEye className="h-5 w-5" />
          ) : (
            <IoMdEyeOff className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputField;
