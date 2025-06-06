import { Link } from "react-router-dom";

const sections = [
  {
    title: "INTRODUCTION",
    content: `NorwayCarExport ("we", "our", or "us") is committed to protecting your privacy and handling your personal data responsibly.\n\nThis Privacy Policy outlines how we collect, use, store, and protect the personal information of users who interact with our online car auction platform, accessible at norwaycarexport.no. We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws in Norway and the European Union. By using our services, including submitting a vehicle for sale, registering as a buyer, or participating in an auction, you agree to the terms outlined in this Privacy Policy.\n\nIf you have any questions or concerns about this policy, you may contact us at:\npost@norwaycarexport.no`,
  },
  {
    title: "INFORMATION WE COLLECT",
    content: `We collect personal data from users when they interact with our platform, submit applications, or register accounts. The type and scope of data collected depends on the role of the user: Seller, Buyer, or Buyer Representative.\n\n1. Seller Users\nSeller users can either submit a fast application or register for a full account.\n\n-Fast Application includes:\n    - Full name\n    - Phone number\n    - Car registration number\n    - Kilometers driven\n    - Expected price\n\n-Full Seller Registration includes:\n    - Full name\n    - Email address\n    - Phone number\n    - Password (stored in hashed form)\n    - Role\n    - Address\n    - Associated car IDs\n    - Account lock status (for security/administrative reasons)\n\n2. Buyer Users (Companies)\nBuyers are companies registering for access to the auction platform. The following information is collected:\n    - Full name (of the user registering)\n    - Email address\n    - Phone number\n    - Password (stored in hashed form)\n    - Role\n    - Organisation name\n    - Organisation number\n    - Organisation address\n    - Organisation licence URLs (uploaded documents stored securely)\n    - List of company representatives\n    - Account lock status\n\n3. Buyer Representatives\nRepresentatives act on behalf of approved buyer companies and can place bids during auctions. Their registration includes:\n    - Full name\n    - Email address\n    - Phone number\n    - Password (stored in hashed form)\n    - Role\n    - Buyer company ID\n    - Saved car IDs (for watchlists)\n    - Account lock status\n\nAutomatically Collected Data\nWhen users interact with the site, we may collect limited technical data for security and performance monitoring:\n    - IP address\n    - Browser type and version\n    - Device type and operating system\n    - Access times and referring URLs\n\nAll personal data is submitted voluntarily through form inputs in our frontend application.`,
  },
  {
    title: "HOW WE USE YOUR INFORMATION",
    content: `We use the personal data we collect for specific, legitimate, and clearly defined purposes related to the functionality of NorwayCarExport and to provide a secure and trustworthy service.\n\nThe main purposes include:\n\t- To process fast car applications and display them to admins for review\n\t- To register user accounts (Seller, Buyer, and Buyer Representative)\n\t- To verify company details and validate uploaded licences\n\t- To manage user sessions and provide secure authentication (using JWT)\n\t- To enable buyer representatives to bid in auctions\n\t- To store and display user-submitted car announcements\n\t- To contact users via transactional emails (using AWS SES)\n\t- To respond to support or email change requests\n\t- To enforce platform rules, lock/unlock accounts if necessary\n\t- To generate pre-signed URLs for license file access by admins\n\t- To enhance platform security, monitor usage, and detect fraud\n\nWe process car registration numbers to:\n\t- Fetch official car details from the Norwegian Road Inspection Agency (Vegvesen)\n\nWe may use technical and anonymized usage data to:\n\t- Improve the performance, stability, and user experience of the platform\n\t- Monitor system performance and prevent abuse\n\nWe do not use your personal information for marketing purposes and we do not send newsletters or promotional messages.`,
  },
  {
    title: "DATA STORAGE AND SECURITY",
    content: `We take the privacy and security of your personal data very seriously. All information you provide is stored securely in trusted infrastructure located within the European Economic Area (EEA).\n\nSensitive documents such as company licenses and car images are kept in private storage areas and are only accessible to authorized administrators.\n\nTo protect your data, we use strong security measures including encrypted communication, secure login methods, and strict access controls. Your password is never stored in plain text and access to your account is protected.\n\nYou can update most of your personal data through your user panel. However, some information, such as your email address or company documents can only be changed by contacting us directly. This is to ensure the integrity and trustworthiness of our platform.\n\nIf you decide to delete your account, all your personal data will be permanently and irreversibly removed immediately.`,
  },
  {
    title: "HOW WE USE YOUR DATA",
    content: `We only use your personal data to provide, improve, and secure the services we offer through our platform.\n\nDepending on your role as a seller, buyer, or representative, your data may be used to:\n\n- Process vehicle applications and listings\n- Verify and approve company accounts and documents\n- Facilitate bidding and auction participation\n- Enable communication between you and our team\n- Ensure account security and prevent misuse\n\nWe may also use your data to contact you regarding your account status, auction outcomes, and other important service-related updates.\n\nWe do not use your information for marketing purposes and you will not receive promotional emails from us. All emails sent are strictly transactional (e.g. account updates, auction notifications).\n\nYou can opt out of receiving notifications using the 'Unsubscribe' function in our emails.`,
  },
  {
    title: "DATA SHARING AND THIRD PARTIES",
    content: `We do not sell or share your personal information with third parties for marketing, advertising or other inappropriate purposes.\n\nThe only exceptions where we may share data are:\n\n- To retrieve car details: We may send the car's registration number to the Norwegian Road Inspection Agency (Vegvesen) in order to automatically fetch relevant car data.\n- For sending transactional emails: We use a trusted email service provider to deliver important account and platform-related messages. Only necessary data (such as your email address) is shared securely for this purpose.\n\nAll third parties involved are carefully selected and follow strict data protection regulations. Your data is never shared without a valid and essential reason, and only in a secure and lawful manner.`,
  },
  {
    title: "YOUR RIGHTS",
    content: `As a user of NorwayCarExport, you have extensive control over your personal data. We are committed to ensuring your rights under GDPR are respected.\n\nYou have the right to:\n\n- Access your data: View the personal information stored in your account.\n- Rectify your data: Correct or update most of your personal details through your user panel.\n- Request changes to restricted data: For sensitive data like your email address or company details, changes can be requested by contacting us directly.\n- Delete your account: You can permanently delete your account at any time. All your personal data will be removed immediately from our systems.The only contect left is car and auction information in use by other users.\n\nIf you nevertheless wish to delete it as well, or if you have questions or concerns, please contact us at: post@norwaycarexport.no`,
  },
  {
    title: "COOKIES AND TRACKING",
    content: `NorwayCarExport does not use cookies or any tracking technologies to monitor your behavior or store personal preferences.\n\nNo third-party analytics, marketing trackers, or cookie-based profiling are implemented on our platform. Any technical data we collect (such as IP address or browser type) is used solely for performance and security monitoring, and it is not linked to any tracking mechanism.`,
  },
  {
    title: "CHANGES TO THIS POLICY",
    content: `We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or privacy practices.\n\nWhen we make significant changes, we will notify users via the platform or through email (if allowed by user). The latest version of this Privacy Policy will always be available on our website.\n\nWe encourage you to review this page periodically to stay informed about how we manage your personal data.\n\nYour continued use of NorwayCarExport after any updates means acceptance of the revised policy.`,
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center px-4 pt-28 md:px-0 md:pt-28">
      {sections.map((section) => (
        <>
          <div className="flex flex-row items-center space-x-4">
            <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
            <h1 className="text-center text-xl font-bold text-medium-gray md:whitespace-nowrap md:text-4xl">
              {section.title}
            </h1>
            <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
          </div>
          <div className="mb-12 mt-5 whitespace-pre-wrap text-base font-medium text-medium-gray/70 md:text-lg">
            {section.content}
          </div>
        </>
      ))}
      <div className="flex flex-row items-center space-x-4">
        <div className="h-[2px] w-[70px] bg-gradient-to-l from-medium-gray to-transparent md:w-[200px]"></div>
        <h1 className="text-center text-xl font-bold text-medium-gray md:whitespace-nowrap md:text-4xl">
          CONTACT INFORMATION
        </h1>
        <div className="h-[2px] w-[70px] bg-gradient-to-r from-medium-gray to-transparent md:w-[200px]"></div>
      </div>
      <div className="mb-12 mt-8 whitespace-pre-wrap text-base font-medium text-medium-gray/70 md:text-lg">
        If you have any questions, concerns, or requests related to this Privacy
        Policy or the way your personal data is handled, please feel free to
        contact us at any time.
        <br />
        <br />
        Our contact information is available at:{" "}
        <Link to="/contact" className="italic text-gunmental underline">
          norwaycarexport.no/contact
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
