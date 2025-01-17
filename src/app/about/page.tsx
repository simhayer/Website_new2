import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Based out of Canada, BARS is revolutionizing the way you shop! Experience the
                  thrill of live auctions and interactive shopping with sellers
                  in real time. Whether you're looking for exclusive deals,
                  unique products, or just want to enjoy the excitement of
                  bidding against other shoppers, BARS brings it all right to
                  your fingertips.."
      />
    </>
  );
};

export default AboutPage;
