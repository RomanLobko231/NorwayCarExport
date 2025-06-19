const OptionsInput = ({ options, initialOption, updateOption }) => {
  return (
    <div className="md:scrollbar-hide w-full overflow-x-auto whitespace-nowrap p-0 md:w-auto md:p-4">
      <div className="mb-2 flex gap-3 md:mb-0">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-lg border px-4 py-1 text-lg font-medium transition ${
              initialOption.value === option.value
                ? "border-gunmental bg-gunmental text-lighthouse"
                : "border-medium-gray bg-distant-cloud text-gunmental hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name={initialOption.label}
              value={option.value}
              checked={initialOption.value === option.value}
              onChange={updateOption}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OptionsInput;
