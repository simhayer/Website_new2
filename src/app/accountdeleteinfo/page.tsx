import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete User Account | BARS",
  description: "This page contains information about deleting user account.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Delete User Account"
        description="This page contains information about deleting user account."
      />
      <div className="mb-12 ml-20">
        <p className="mb-12 text-base font-medium text-body-color">
          Follow these steps to delete your account:
        </p>
        <ol className="mb-12 list-inside list-decimal text-base text-gray-700">
          <li className="mb-4">Open the app.</li>
          <li className="mb-4">
            Go to the <strong className="font-semibold">Profile</strong> tab.
          </li>
          <li className="mb-4">
            Open the <strong className="font-semibold">Settings</strong> menu
            from the top-right corner.
          </li>
          <li className="mb-4">
            Click on <strong className="font-semibold">Delete Account</strong>.
          </li>
          <li className="mb-4">Confirm your decision in the dialog box.</li>
        </ol>
        <p className="mb-12 text-base font-medium text-body-color">
          We will delete your account and all the data associated with it
        </p>
        <p className="mb-12 text-base font-medium text-body-color">
          If you dont want to install the app, email us regarding account deletion at the.bars@outlook.com with the subject &quot;Delete Account&quot;. And we will reach out to you.
        </p>
      </div>
      <Contact />
    </>
  );
};

export default ContactPage;
