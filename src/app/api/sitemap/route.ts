import { baseURL, apiEndpoints } from "@/Resources/Constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all product listings or dynamic pages
    const response = await axios.get(`${baseURL}${apiEndpoints.getAllListings}`);
    const listings = response.data.listings;

    // Generate XML for the sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${listings
        .map(
          (listing: any) => `
      <url>
        <loc>https://thebarss.com/listing/${listing._id}</loc>
        <lastmod>${new Date(listing.date).toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
      `
        )
        .join("")}
    </urlset>`;

    // Return the sitemap as an XML response
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
