"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/index.css";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import Image from "next/image";
import AppPopup from "../Common/AppPopup";
import { baseURL } from "@/Resources/Constants";
import ListingThumbnail from "../Common/ListingThumbnail";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Listing = ({
  listing,
  relatedListings,
}: {
  listing: any;
  relatedListings: any[];
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.product.name,
    description: listing.product.description,
    image: listing.product.imageUrls.map((url) => `${baseURL}/${url}`),
    brand: listing.product.brand || "Unknown",
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: listing.price,
      availability: "https://schema.org/InStock",
      url: `https://thebarss.com/listing/${listing._id}`,
    },
  };

  const [showAppPopup, setShowAppPopup] = useState(false);
  const router = useRouter();

  const toggleShowAppPopup = () => {
    setShowAppPopup(!showAppPopup);
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="mt-24 min-h-screen bg-white sm:mt-40">
        {/* Product Title */}
        <div className="flex w-full justify-center">
          <h1 className="my-4 text-xl font-semibold">{listing.product.name}</h1>
        </div>

        {/* Main Content Section */}
        <div className="w-full sm:flex">
          {/* Left Section with Swipable Images */}
          <div className="flex w-full justify-center">
            <div className="swiper-container w-3/4 sm:ml-4 sm:w-2/4">
              <div className="swiper-button image-swiper-button-next">
                <IoIosArrowForward />
              </div>
              <div className="swiper-button image-swiper-button-prev">
                <IoIosArrowBack />
              </div>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: ".image-swiper-button-next",
                  prevEl: ".image-swiper-button-prev",
                  disabledClass: "swiper-button-disabled",
                }}
                pagination
              >
                {listing.product.imageUrls.map((url: string, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={`${baseURL}/${url}`} // Adjust the baseURL usage based on your API response
                      alt={`${listing.product.name} - ${index + 1}`}
                      width={500}
                      height={500}
                      className="rounded-lg object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Section with Details */}
          <div className="= mt-4 flex w-full flex-col items-center px-4 sm:items-start lg:px-12">
            {listing.product?.size && listing.product.size.trim() !== "" && (
              <div className="mb-4 flex w-full rounded-lg border p-4 sm:w-3/4">
                <p className="text-sm">Size</p>
                <p className="ml-2 text-sm">{listing.product.size}</p>
              </div>
            )}

            <div className="w-full rounded-lg border p-4 sm:w-3/4">
              <p className="text-md mb-2 text-gray-800">Buy Now</p>
              <p className="mb-4 text-2xl font-bold text-gray-800">
                ${listing.price}
              </p>
              <div className="flex w-full justify-center ">
                <button
                  onClick={toggleShowAppPopup}
                  className="rounded-full bg-black px-6 py-2 text-white"
                >
                  BUY ON APP
                </button>
              </div>
            </div>
            {/* <p className="text-md leading-relaxed text-gray-600">
            {listing.description}
          </p> */}
            <div className="mt-4 flex w-full items-center border-t border-gray-200 p-2 sm:w-3/4">
              <IoMdCheckmarkCircleOutline />
              <p className="ml-4 text-sm font-semibold">BARS Verified</p>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        <div className="w-full justify-center px-10">
          <h1 className="text-l my-8 pl-16 font-bold">Related Listings</h1>
          {relatedListings.length > 0 && (
            <div className="swiper-container w-full">
              <div className="swiper-button image-swiper-button-next">
                <IoIosArrowForward />
              </div>
              <div className="swiper-button image-swiper-button-prev">
                <IoIosArrowBack />
              </div>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 6 },
                }}
                navigation={{
                  nextEl: ".image-swiper-button-next",
                  prevEl: ".image-swiper-button-prev",
                  disabledClass: "swiper-button-disabled",
                }}
                pagination={{
                  bulletActiveClass: ".custom-bullet-active",
                  bulletClass: ".custom-bullet",
                }}
                className="px-14"
              >
                {relatedListings.map((item) => (
                  <SwiperSlide key={item._id} className="flex justify-center">
                    <ListingThumbnail router={router} item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* App Popup */}
        {showAppPopup && (
          <div
            className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={toggleShowAppPopup}
          >
            <AppPopup />
          </div>
        )}
      </div>
    </>
  );
};

export default Listing;
