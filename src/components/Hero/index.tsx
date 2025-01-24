import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white p-4 pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Image Section */}
            <div className="ml-40 hidden w-full flex-shrink-0 px-4 md:block md:w-auto">
              <Image
                src="/images/hero/screenshotWithPhone.png"
                alt="logo"
                width={270}
                height={1400}
                className="max-w-xs object-contain md:max-w-sm lg:max-w-md"
              />
            </div>
            {/* Text Section */}
            <div className="w-full px-4 md:ml-20 md:mr-40 md:flex-1">
              <div className="mx-auto max-w-[800px]">
                <h1 className="mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">
                  Buy, Sell, Live!
                </h1>
                <p className="sm:text-md md:text-md mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark">
                  Revolutionizing the way you shop! Experience live auctions and
                  interactive shopping in real time. Exclusive deals, unique
                  products, or want to enjoy the excitement of bidding against
                  other shoppers, BARS brings it all to your fingertips.
                </p>
                <div className="flex flex-col items-center justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="https://apps.apple.com/ca/app/bars-live-shopping/id6737178573"
                    className="flex items-center space-x-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/icons/apple.png"
                      alt="apple"
                      width={20}
                      height={20}
                    />
                    <span>Get on iPhone</span>
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.hayersimrat.bars"
                    className="flex items-center space-x-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/icons/android.png"
                      alt="android"
                      width={23}
                      height={23}
                    />
                    <span>Get on android</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
