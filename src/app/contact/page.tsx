import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | BARS",
  description: "This is Contact Page Bars",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Please reach out to us if you have any concern, our team will actively look into it."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
