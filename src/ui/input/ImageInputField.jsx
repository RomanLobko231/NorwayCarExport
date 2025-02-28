import { MdClose, MdOutlineFileUpload } from "react-icons/md";

const ImageInputField = ({ images, setImages }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png",
    );
    setImages((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileDelete = (indexToDelete) => {
    setImages((prevFiles) =>
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
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="mt-3 w-full">
          <ul className="mt-2 list-inside list-disc">
            {images.map((file, index) => (
              <li
                key={index}
                className="mt-2 flex flex-row items-center text-gray-700"
              >
                <p className="max-w-[70%] truncate text-sm font-medium text-medium-gray md:text-base">
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

export default ImageInputField;
