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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ListingProps {
  id: string;
}

const Listing: React.FC<ListingProps> = ({ id }) => {
  const [listing, setListing] = useState<any>(null);
  const [relatedListings, setRelatedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const listingResponse = await axios.get(
          `${baseURL}${apiEndpoints.getListingById}/${id}`,
        );
        setListing(listingResponse.data.listing);

        const relatedResponse = await axios.get(
          `${baseURL}${apiEndpoints.getRelatedListings}/${id}`,
        );

        setRelatedListings(relatedResponse.data.relatedListings);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;
  if (!listing)
    return <div className="mt-20 text-center">Listing not found</div>;

  return (
    <div className="mt-40 min-h-screen bg-white">
      <div className="flex w-full justify-center">
        <h1 className="my-4 text-xl font-semibold">{listing.product.name}</h1>
      </div>
      <div className="w-full sm:flex">
        {/* Left Section with Swipable Images */}
        <div className="flex items-center justify-center sm:w-2/4">
          <div className="swiper-container w-2/4">
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
        <div className="flex w-full flex-col justify-center px-4 lg:px-12">
          <p className="mb-4 text-2xl font-bold text-gray-800">
            ${listing.price}
          </p>
          <p className="text-md leading-relaxed text-gray-600">
            {listing.description}
          </p>
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
    </div>
  );
};

export default Listing;
