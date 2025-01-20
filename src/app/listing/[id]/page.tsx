"use client";

import React from "react";
import Listing from "@/components/Listing";

const ListingPage = ({ params }: { params: { id: string } }) => {
  return <Listing id={params.id} />;
};

export default ListingPage;
