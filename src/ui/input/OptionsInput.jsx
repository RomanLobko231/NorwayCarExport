const OptionsInput = ({
  options,
  initialOption,
  optionName,
  handleInputChange,
}) => {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto whitespace-nowrap p-0 md:w-auto md:p-4">
      <div className="flex gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium transition ${
              initialOption === option
                ? "border-gunmental bg-gunmental text-lighthouse"
                : "border-medium-gray bg-lighthouse text-gunmental hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name={optionName}
              value={option}
              checked={initialOption === option}
              onChange={handleInputChange}
              className="hidden"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OptionsInput;
