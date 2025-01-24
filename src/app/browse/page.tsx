import axios from "axios";
import ListListings from "@/components/Browse";
import { baseURL, apiEndpoints } from "@/Resources/Constants";

export const metadata = {
  title: "Discover Products - BARS",
  description:
    "Browse a variety of products on BARS. Participate in live auctions and find exclusive deals.",
  metadataBase: new URL("https://thebarss.com"),
};

const fetchListingsSSR = async (page = 1, search = "", type = "All") => {
  try {
    const response = await axios.post(
      `${baseURL}${apiEndpoints.getAllListingsByPage}`,
      {
        page,
        limit: 30,
        search,
        type,
      },
    );
    return response.data.listings || [];
  } catch (error) {
    console.error("Error fetching SSR listings:", error);
    return [];
  }
};

const ListingsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const search = searchParams.search || "";
  const category = decodeURIComponent(searchParams.category || "All");
  const listings = await fetchListingsSSR(1, search, category);

  return (
    <ListListings
      initialListings={listings}
      initialCategory={category}
      searchQuery={search}
    />
  );
};

export default ListingsPage;
