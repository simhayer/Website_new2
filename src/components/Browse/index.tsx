import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiEndpoints, baseURL, productTypes } from "../../Resources/Constants";
import { useRouter, useSearchParams } from "next/navigation";
import ListingThumbnail from "../Common/ListingThumbnail";
import LoadingDots from "../Common/LoadingDots";

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
  const categoryQuery = decodeURIComponent(
    searchParams.get("category") || "All",
  );

  const loadListings = async (reset = false, newPage = 1, category = "All") => {
    setLoading(true);
    const data = await fetchListings(newPage, searchQuery, category);

    if (reset) {
      setListings(data); // Replace listings
    } else {
      setListings((prev) => [...prev, ...data]); // Append listings
    }

    setHasMore(data.length > 0); // Check if more items exist
    setLoading(false);
  };

  useEffect(() => {
    // Decode the category query to handle special characters
    const decodedCategory = decodeURIComponent(categoryQuery || "All");

    if (decodedCategory && tabs.includes(decodedCategory)) {
      setSelectedTab(decodedCategory);
    } else {
      setSelectedTab("All");
    }

    setPage(1);
    loadListings(true, 1, decodedCategory);
  }, [categoryQuery, searchQuery]);

  const handleLoadMore = async () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      await loadListings(false, nextPage);
      setPage(nextPage);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    const encodedTab = encodeURIComponent(tab); // Encode the tab to handle special characters
    router.push(
      `?category=${encodedTab}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`,
    );
  };

  const handleClearAll = async () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("search");
    queryParams.delete("category");
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
    setSelectedTab("All");
  };

  return (
    <div className="mt-28 min-h-screen bg-white px-4 sm:mt-40">
      <div className="mx-auto flex max-w-screen-xl">
        {/* Category Tabs */}
        <div className="hidden w-1/4 p-4 sm:block">
          <p className="text-md my-3 font-bold">Categories</p>
          <div className="mb-6 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
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
