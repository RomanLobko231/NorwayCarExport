import { MdClose, MdOutlineFileUpload } from "react-icons/md";

const FileInputField = ({ files, setFiles, fileTypes, error }) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.every((file) => fileTypes.includes(file.type))) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else {
      alert("Warning! Only these types are allowed: " + fileTypes.join(", "));
    }
  };

  const handleFileDelete = (indexToDelete) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <div className="mb-2 mt-1 flex w-full flex-col items-center">
      <label className="flex w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border border-gunmental bg-white px-4 py-2 text-base font-medium text-light-gray hover:bg-gray-200 hover:text-medium-gray md:text-lg">
        <MdOutlineFileUpload className="h-6 w-auto" color="#888" />
        Velg filer
        <input
          type="file"
          multiple
          accept={fileTypes.join(", ")}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {error && (
        <p className="mt-1 text-lg font-medium text-danger-red">
          Lisens feltet er obligatorisk
        </p>
      )}
      {files.length > 0 && (
        <div className="mt-3 w-full">
          <ul className="mt-2 list-inside list-disc">
            {files.map((file, index) => (
              <li
                key={index}
                className="mt-2 flex w-full flex-row items-center text-gray-700"
              >
                <p className="max-w-[150px] truncate text-sm font-medium text-medium-gray sm:max-w-[70%] md:text-base">
                  {file.name}
                </p>
                <div className="mx-3 h-[1px] flex-grow bg-light-gray opacity-50"></div>
                <MdClose
                  className="h-5 w-5 flex-shrink-0 hover:opacity-25"
                  color="#333333"
                  onClick={() => handleFileDelete(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileInputField;
