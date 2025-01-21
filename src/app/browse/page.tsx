"use client";
import Browse from "@/components/Browse";
import { Suspense } from "react";

const BrowsePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Browse />
    </Suspense>
  );
};

export default BrowsePage;
