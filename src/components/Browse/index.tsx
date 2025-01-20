"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiEndpoints, baseURL, productTypes } from "../../Resources/Constants";
import { useRouter, useSearchParams } from "next/navigation";
import ListingThumbnail from "../Common/ListingThumbnail";
import LoadingDots from "../Common/LoadingDots";

// Loading Indicator Component
// const LoadingDots = () => (
//   <div className="mt-4 flex items-center justify-center">
//     <span className="dot bg-gray-500"></span>
//     <span className="dot bg-gray-500"></span>
//     <span className="dot bg-gray-500"></span>
//     <style jsx>{`
//       .dot {
//         height: 7px;
//         width: 7px;
//         margin: 0 5px;
//         border-radius: 50%;
//         animation: blink 1.5s infinite;
//       }
//       .dot:nth-child(2) {
//         animation-delay: 0.3s;
//       }
//       .dot:nth-child(3) {
//         animation-delay: 0.6s;
//       }
//       @keyframes blink {
//         0%,
//         80%,
//         100% {
//           opacity: 0;
//         }
//         40% {
//           opacity: 1;
//         }
//       }
//     `}</style>
//   </div>
// );

const fetchListings = async (
  pageNum = 1,
  searchValue = "",
  selectedTab = "All",
) => {
  try {
    const response = await axios.post(
      `${baseURL}${apiEndpoints.getAllListingsByPage}`,
      {
        page: pageNum,
        limit: 30,
        search: searchValue,
        type: selectedTab,
      },
    );
    return response.data.listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

const ListListings = () => {
  const [tabs] = useState(["All", ...productTypes]);
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const loadListings = async (reset = false, newPage = 1) => {
    setLoading(true);
    const data = await fetchListings(newPage, searchQuery, selectedTab);

    if (reset) {
      setListings(data); // Replace listings
    } else {
      setListings((prev) => [...prev, ...data]); // Append listings
    }

    setHasMore(data.length > 0); // Check if more items exist
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadListings(true, 1);
  }, [selectedTab, searchQuery]);

  const handleLoadMore = async () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      await loadListings(false, nextPage);
      setPage(nextPage);
    }
  };

  const handleClearAll = async () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("search");
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
  };

  return (
    <div className="mt-40 min-h-screen bg-white p-4">
      <div className="mx-auto flex max-w-screen-xl">
        {/* Category Tabs */}
        <div className="hidden w-1/4 p-4 sm:block">
          <p className="text-md my-3 font-bold">Categories</p>
          <div className="mb-6 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`w-full rounded-lg py-1 text-left text-sm ${
                  selectedTab === tab
                    ? "font-bold"
                    : "font-light hover:font-semibold"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        <div className="w-full sm:mt-10 sm:w-3/4">
          <div className="mb-2 flex w-full justify-between">
            {searchQuery ? (
              <p className="">Showing results for: {searchQuery}</p>
            ) : (
              <div />
            )}

            <button onClick={handleClearAll}>
              <p className="text-sm">Clear All</p>
            </button>
          </div>

          {/* Loading Indicator */}
          {loading && listings.length === 0 && <LoadingDots />}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {listings.map((item) => (
              <ListingThumbnail item={item} router={router} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-6 text-center">
            {loading && listings.length > 0 ? (
              <LoadingDots />
            ) : (
              <button
                onClick={handleLoadMore}
                disabled={!hasMore || loading}
                className="rounded-lg px-6 py-2 text-black hover:font-semibold disabled:opacity-50"
              >
                {hasMore ? "Load More" : "No More Items"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListListings;
