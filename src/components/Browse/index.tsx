'use client'

import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { apiEndpoints, baseURL, productTypes } from '../../Resources/Constants';

// Fetch Listings API Call
const fetchListings = async (pageNum = 1, searchValue = '', selectedTab = 'All') => {
  try {
    console.log('Fetching listings...');
    console.log('Selected Tab:', selectedTab);
    console.log('Search Value:', searchValue);
    console.log('Page:', pageNum);

    const response = await axios.post(`${baseURL}${apiEndpoints.getAllListingsByPage}`, {
      page: pageNum,
      limit: 10,
      search: searchValue,
      type: selectedTab,
    });

    console.log('Fetched Data:', response.data.listings);
    return response.data.listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

const ListListings = () => {
  console.log('hereeee');

  const [tabs] = useState(['All', ...productTypes]);
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  console.log('here2')

  // Load Listings
  const loadListings = async (reset = false, newPage = 1) => {
    setLoading(true);
    console.log('Loading listings for page:', newPage);

    const data = await fetchListings(newPage, search, selectedTab);

    if (reset) {
      setListings(data); // Replace all listings on reset
    } else {
      setListings(prev => [...prev, ...data]); // Append more listings
    }

    setHasMore(data.length > 0); // Update 'hasMore' if more items are available
    setLoading(false);
  };

  // Handle Tab or Search Change
  useEffect(() => {
    setPage(1); // Reset page to 1
    loadListings(true, 1); // Reset listings
  }, [selectedTab, search]); // Trigger only on tab or search changes

  useEffect(() => {
    console.log('Is Window Defined:', typeof window !== 'undefined'); // Always true here
    console.log('inconsole log');
  }, []);

  console.log('Is Window Defined:', typeof window !== 'undefined');
  
  useEffect(() => {
    console.log('inconsole log');
  }, [])

  console.log('here3')

  // Search Handler
  const handleSearch = () => {
    setSearch(searchInput); // Trigger search
  };

  // Load More Handler
  const handleLoadMore = async () => {
    if (hasMore && !loading) {
      const nextPage = page + 1; // Calculate next page directly
      console.log('Loading more items for page:', nextPage);
      await loadListings(false, nextPage); // Pass incremented page directly
      setPage(nextPage); // Update state after fetch
    }
  };

  console.log('here4')

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-20">
      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-pink-400"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Search
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === tab ? 'bg-pink-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto max-w-screen-xl">
        {listings.map(item => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md">
            <img
              src={`${baseURL}/${item.product.imageUrls[0]}`}
              alt={item.product.name}
              className="rounded-lg object-cover mb-4 w-full aspect-square"
            />
            <h3 className="text-sm font-semibold mb-2 line-clamp-2 overflow-hidden">{item.product.name}</h3>
            <p className="text-pink-500 font-bold">${item.price}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleLoadMore}
          disabled={!hasMore || loading}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : hasMore ? 'Load More' : 'No More Items'}
        </button>
      </div>
    </div>
  );
};

export default ListListings;
