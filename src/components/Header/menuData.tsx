import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Sneakers",
    path: `/browse?category=${encodeURIComponent("Sneakers & Footwear")}`,
    newTab: false,
  },
  {
    id: 2,
    title: "Trading Cards",
    path: `/browse?category=${encodeURIComponent("Trading Cards")}`,
    newTab: false,
  },
  {
    id: 3,
    title: "Men's Clothing",
    path: `/browse?category=${encodeURIComponent("Men's Clothing")}`,
    newTab: false,
  },
  {
    id: 4,
    title: "Women's Clothing",
    path: `/browse?category=${encodeURIComponent("Women's Clothing")}`,
    newTab: false,
  },
  {
    id: 5,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 6,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 7,
    title: "Browse",
    path: "/browse",
    newTab: false,
  },
];
export default menuData;
