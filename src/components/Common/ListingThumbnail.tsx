import { baseURL } from "@/Resources/Constants";
import React from "react";

interface ListingThumbnailProps {
  router: { push: (path: string) => void };
  item: {
    _id: string;
    product: {
      name: string;
      imageUrls: string[];
    };
    price: number;
  };
}

const ListingThumbnail: React.FC<ListingThumbnailProps> = ({
  router,
  item,
}) => {
  return (
    <button
      key={item._id}
      className="rounded-lg border bg-white p-4 shadow hover:shadow-md"
      onClick={() => router.push(`/listing/${item._id}`)}
    >
      <img
        src={`${baseURL}/${item.product.imageUrls[0]}`}
        alt={item.product.name}
        className="mb-4 aspect-square w-full rounded-lg object-contain"
      />
      <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-semibold">
        {item.product.name}
      </h3>
      <p className="font-medium text-black">${item.price}</p>
    </button>
  );
};

export default ListingThumbnail;
