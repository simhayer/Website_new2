import React from "react";
import axios from "axios";
import Listing from "@/components/Listing";
import { baseURL, apiEndpoints } from "@/Resources/Constants";

interface ListingPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data } = await axios.get(
      `${baseURL}${apiEndpoints.getListingById}/${id}`,
    );
    const listing = data.listing;

    return {
      title: `${listing.product.name} - Buy Now on BARS`,
      description: listing.product.description,
      metadataBase: new URL("https://thebarss.com"), // Set your production domain here
      openGraph: {
        title: `${listing.product.name} - Buy Now on BARS`,
        description: listing.product.description,
        images: listing.product.imageUrls.map((url: string) => ({
          url: `${baseURL}/${url}`,
          width: 800,
          height: 600,
        })),
        url: `https://thebarss.com/listing/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: `${listing.product.name} - Buy Now on BARS`,
        description: listing.product.description,
        images: listing.product.imageUrls.map(
          (url: string) => `${baseURL}/${url}`,
        ),
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found - BARS",
      description: "The requested product could not be found on BARS.",
      metadataBase: new URL("https://thebarss.com"), // Set your production domain here
    };
  }
}

const fetchListingData = async (id: string) => {
  try {
    const [listingResponse, relatedResponse] = await Promise.all([
      axios.get(`${baseURL}${apiEndpoints.getListingById}/${id}`),
      axios.get(`${baseURL}${apiEndpoints.getRelatedListings}/${id}`),
    ]);

    return {
      listing: listingResponse.data.listing || null,
      relatedListings: relatedResponse.data.relatedListings || [],
    };
  } catch (error) {
    console.error("Error fetching listing data:", error);
    return {
      listing: null,
      relatedListings: [],
    };
  }
};

const ListingPage: React.FC<ListingPageProps> = async ({ params }) => {
  const { id } = params;

  // Fetch data on the server
  const { listing, relatedListings } = await fetchListingData(id);

  if (!listing) {
    return <div className="mt-40 text-center">Listing not found</div>;
  }

  return <Listing listing={listing} relatedListings={relatedListings} />;
};

export default ListingPage;
