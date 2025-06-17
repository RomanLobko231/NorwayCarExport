import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto">
      <div className="mx-auto my-2 w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="mb-4 flex items-center space-x-3 text-4xl font-extrabold text-medium-gray sm:mb-0 rtl:space-x-reverse"
          >
            NCE
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium text-medium-gray">
            {/* <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                {t("about")}
              </a>
            </li> */}
            <li>
              <Link
                to="privacy-policy"
                className="me-4 hover:underline md:me-6"
              >
                {t("privacy_policy")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-sm text-medium-gray sm:text-center">
          © 2025{" "}
          <a href="/" className="hover:underline">
            NorwayCarExport™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
