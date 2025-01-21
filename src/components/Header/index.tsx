"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import AppPopup from "../Common/AppPopup";
import { IoIosDownload } from "react-icons/io";

const Header = () => {
  // Navbar toggle
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [searchInput, setSearchInput] = useState("");
  const searchParams = useSearchParams();

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  const handleNavigation = (path, newTab) => {
    if (newTab) {
      // Open in a new tab
      window.open(path, "_blank");
    } else {
      // Navigate programmatically
      router.push(path);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setSearchInput(searchQuery);
  }, [searchParams]);

  const [showAppPopup, setShowAppPopup] = useState<boolean>(false);

  const toggleShowAppPopup = () => {
    setShowAppPopup(!showAppPopup);
  };

  return (
    <>
      <header
        className={`header fixed left-0 top-0 z-[9999] flex w-full items-center bg-white`}
      >
        <div className="w-full">
          <div className="container">
            <div className="relative -mx-4 flex items-center justify-between sm:mt-4">
              <div className="w-auto max-w-full px-4 md:ml-12">
                <Link href="/" className="header-logo flex">
                  <Image
                    src="/images/logo/logo-2.svg"
                    alt="logo"
                    width={0}
                    height={0}
                    className="border-1 w-[80px] rounded-lg border-gray-400 object-contain shadow-lg sm:w-[80px] md:w-[100px] lg:w-[120px]"
                  />
                </Link>
              </div>

              <div className="flex w-full">
                <form onSubmit={handleSearch} className="flex w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="mt-2 flex w-full rounded-lg bg-gray-100 px-4 py-2 hover:outline-none focus:outline-none"
                  />
                </form>
              </div>
              <div className="sm:flex sm:w-full" />
              <div className="mx-1 mt-1 flex">
                <p className="text-md hidden font-bold text-gray-500 sm:block">
                  CAD
                </p>
              </div>
              <button onClick={toggleShowAppPopup} className="mx-3 ">
                <IoIosDownload size={30} />
              </button>

              <div className="mb-1 flex w-auto items-center justify-between px-4">
                <div>
                  <button
                    onClick={navbarToggleHandler}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    className="mt-9 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                  >
                    <span
                      className={`relative mb-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                        navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                        navbarOpen ? "opacity-0 " : " "
                      }`}
                    />
                    <span
                      className={`relative mt-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300${
                        navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <nav
              id="navbarCollapse"
              className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] justify-items-center opacity-0"
              }`}
            >
              <ul className="block w-full justify-evenly lg:flex lg:space-x-12">
                {menuData.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        className={`text-md flex py-2 lg:mr-0 lg:inline-flex lg:px-0 lg:py-4 ${
                          usePathName === menuItem.path
                            ? "text-primary dark:text-white"
                            : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <p
                          onClick={() => handleSubmenu(index)}
                          className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-4"
                        >
                          {menuItem.title}
                          <span className="pl-3">
                            <svg width="25" height="24" viewBox="0 0 25 24">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </p>
                        <div
                          className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                            openIndex === index ? "block" : "hidden"
                          }`}
                        >
                          {menuData.map((menuItem, idx) => (
                            <button
                              key={menuItem.id}
                              className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                              onClick={() =>
                                handleNavigation(menuItem.path, menuItem.newTab)
                              }
                            >
                              {menuItem.title}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex h-auto w-full overflow-hidden bg-black">
            <div className="flex animate-scroll-loop whitespace-nowrap py-1">
              <p className="mx-3 select-none text-xs text-white">BEST PRICES</p>
              <p className="mx-3 select-none text-xs text-white">
                CANADA&apos;S #1 COLLECTABLES AND LUXURY STORE
              </p>
              <p className="mx-3 select-none text-xs text-white">
                BUY, SELL, LIVE!
              </p>

              <p className="mx-3 select-none text-xs text-white">BEST PRICES</p>
              <p className="mx-3 select-none text-xs text-white">
                CANADA&apos;S #1 COLLECTABLES AND LUXURY STORE
              </p>
              <p className="mx-3 select-none text-xs text-white">
                BUY, SELL, LIVE!
              </p>

              <p className="mx-3 select-none text-xs text-white">BEST PRICES</p>
              <p className="mx-3 select-none text-xs text-white">
                CANADA&apos;S #1 COLLECTABLES AND LUXURY STORE
              </p>
              <p className="mx-3 select-none text-xs text-white">
                BUY, SELL, LIVE!
              </p>

              <p className="mx-3 select-none text-xs text-white">BEST PRICES</p>
              <p className="mx-3 select-none text-xs text-white">
                CANADA&apos;S #1 COLLECTABLES AND LUXURY STORE
              </p>
              <p className="mx-3 select-none text-xs text-white">
                BUY, SELL, LIVE!
              </p>

              <p className="mx-3 select-none text-xs text-white">BEST PRICES</p>
              <p className="mx-3 select-none text-xs text-white">
                CANADA&apos;S #1 COLLECTABLES AND LUXURY STORE
              </p>
              <p className="mx-3 select-none text-xs text-white">
                BUY, SELL, LIVE!
              </p>
            </div>
          </div>
        </div>
        {showAppPopup && (
          <div>
            {/* <AppPopup /> */}
            <div
              className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
              onClick={toggleShowAppPopup}
            >
              <AppPopup />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
