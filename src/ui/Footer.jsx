const Footer = () => {
  return (
    <footer class="mt-auto">
      <div class="mx-auto my-2 w-full max-w-screen-xl p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://norwaycarexport.netlify.app/"
            class="mb-4 flex items-center space-x-3 text-4xl font-extrabold text-medium-gray sm:mb-0 rtl:space-x-reverse"
          >
            NCE
          </a>
          <ul class="flex flex-wrap items-center text-sm font-medium text-medium-gray">
            <li>
              <a href="#" class="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="me-4 hover:underline md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="me-4 hover:underline md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-3 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span class="block text-sm text-medium-gray sm:text-center">
          © 2024{" "}
          <a
            href="https://norwaycarexport.netlify.app/"
            class="hover:underline"
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
