"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, apiEndpoints } from "@/Resources/Constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/index.css";
import ListingThumbnail from "../Common/ListingThumbnail";
import { useRouter } from "next/navigation";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import LoadingDots from "../Common/LoadingDots";
import AppPopup from "../Common/AppPopup";

interface ListingProps {
  id: string;
}

const Listing: React.FC<ListingProps> = ({ id }) => {
  const [listing, setListing] = useState<any>(null);
  const [relatedListings, setRelatedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [showAppPopup, setShowAppPopup] = useState<boolean>(false);

  const toggleShowAppPopup = () => {
    setShowAppPopup(!showAppPopup);
  };

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const listingResponse = await axios.get(
          `${baseURL}${apiEndpoints.getListingById}/${id}`,
        );
        setListing(listingResponse.data.listing);
      } catch (error) {
        console.error("Error fetching main listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Fetch related listings separately
  useEffect(() => {
    const fetchRelatedListings = async () => {
      if (!id) return;

      try {
        const relatedResponse = await axios.get(
          `${baseURL}${apiEndpoints.getRelatedListings}/${id}`,
        );
        setRelatedListings(relatedResponse.data.relatedListings);
      } catch (error) {
        console.error("Error fetching related listings:", error);
      }
    };

    fetchRelatedListings();
  }, [id]);

  if (loading) {
    return (
      <div className="h-full p-40">
        <LoadingDots />
      </div>
    );
  }
  if (!listing)
    return <div className="mt-40 text-center">Listing not found</div>;

  return (
    <div className="mt-24 min-h-screen bg-white sm:mt-40">
      <div className="flex w-full justify-center">
        <h1 className="my-4 text-xl font-semibold">{listing.product.name}</h1>
      </div>
      <div className="w-full sm:flex">
        {/* Left Section with Swipable Images */}
        <div className="flex items-center justify-center sm:w-2/4">
          <div className="swiper-container w-3/4 sm:w-2/4">
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
                  <img
                    src={`${baseURL}/${url}`}
                    alt={`${listing.product.name} - ${index + 1}`}
                    className="rounded-lg object-contain"
                  />
                </SwiperSlide>
              ))}
              {listing.product.imageUrls.map((url: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${baseURL}/${url}`}
                    alt={`${listing.product.name} - ${index + 1}`}
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
              slidesPerView={2} // Default number of visible items
              breakpoints={{
                640: { slidesPerView: 3 }, // Show 3 items on small screens
                1024: { slidesPerView: 6 }, // Show 5 items on large screens
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
                  <ListingThumbnail item={item} router={router} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      {showAppPopup && (
        <div>
          {/* <AppPopup /> */}
          <div
            className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={toggleShowAppPopup}
          >
            <AppPopup />
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
