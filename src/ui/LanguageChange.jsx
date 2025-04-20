import { useState } from "react";

const LanguageChange = ({ changeLanguage, currLang }) => {
  const [selectedLang, setSelectedLang] = useState({
    code: currLang,
    flag: currLang == "no" ? "../no_flag.png" : "../en_flag.png",
  });

  const languages = [
    { code: "no", flag: "../no_flag.png" },
    { code: "en", flag: "../en_flag.png" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const setGlobalLanguage = (lang) => {
    setSelectedLang(lang);
    changeLanguage(lang.code);

    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <div
      className="relative flex items-center sm:ml-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(true)}
    >
      <div className="flex cursor-pointer flex-row items-center gap-1 py-1 hover:opacity-50">
        <img
          src={selectedLang.flag}
          alt={selectedLang.code}
          className="h-4 w-6"
        />
        <p className="text-base font-semibold text-medium-gray md:text-lg">
          {selectedLang.code.toUpperCase()}
        </p>
      </div>

      {isOpen && (
        <div className="absolute -left-2 top-8 w-16 rounded-md border border-medium-gray bg-lighthouse md:top-10">
          {languages
            .filter((lang) => lang.code !== selectedLang.code)
            .map((lang) => (
              <div
                key={lang.code}
                className="flex cursor-pointer items-center gap-1 p-2 hover:bg-slate-100"
                onClick={() => setGlobalLanguage(lang)}
              >
                <img src={lang.flag} alt={lang.code} className="h-4 w-6" />
                <p className="text-md font-semibold text-medium-gray">
                  {lang.code.toUpperCase()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageChange;
