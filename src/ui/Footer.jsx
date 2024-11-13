const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="mx-auto my-2 w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://norwaycarexport.netlify.app/"
            className="mb-4 flex items-center space-x-3 text-4xl font-extrabold text-medium-gray sm:mb-0 rtl:space-x-reverse"
          >
            NCE
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium text-medium-gray">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-sm text-medium-gray sm:text-center">
          © 2024{" "}
          <a
            href="https://norwaycarexport.netlify.app/"
            className="hover:underline"
          >
            NorwayCarExport™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
