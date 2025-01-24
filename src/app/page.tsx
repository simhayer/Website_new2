import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bars - Live Auctions & Interactive Shopping",
  description:
    "Join Bars for live auctions and interactive shopping. Discover exclusive deals, unique products, and real-time shopping excitement!",
  keywords:
    "live auctions, interactive shopping, unique products, exclusive deals, real-time shopping",
  openGraph: {
    title: "Bars - Live Auctions & Interactive Shopping",
    description:
      "Join Bars for live auctions and interactive shopping. Discover exclusive deals, unique products, and real-time shopping excitement!",
    images: ["../public/hero/screenshotWithPhone.png"],
    url: "https://thebarss.com",
  },
  creator: "Bars Inc.",
  metadataBase: new URL("https://thebarss.com"),
};

export const viewport = {
  themeColor: "#ff6347", // Brand color
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
    </>
  );
}
