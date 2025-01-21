import Image from "next/image";
import Link from "next/link";

// Loading Indicator Component
const AppPopup = () => (
  <div
    className="z-50 flex flex-col items-center space-y-4 rounded-lg bg-white p-4"
    onClick={(e) => e.stopPropagation()} // Prevent click event propagation
  >
    <p className="text-center text-lg font-semibold">Download BARS app now</p>
    <div className="flex justify-center space-x-4">
      <Link
        href="https://apps.apple.com/ca/app/bars-live-shopping/id6737178573"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/icons/iOS_app_store.webp"
          alt="apple-store"
          width={0}
          height={0}
          className="w-[120px] rounded-lg object-contain sm:w-[120px] md:w-[140px] lg:w-[160px]"
        />
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=com.hayersimrat.bars"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/icons/Google_play_store.avif"
          alt="google-store"
          width={0}
          height={0}
          className="w-[120px] rounded-lg object-contain sm:w-[120px] md:w-[140px] lg:w-[160px]"
        />
      </Link>
    </div>
    <div className="flex justify-center space-x-4">
      <Image
        src="/images/icons/apple_qr.png"
        alt="apple-qr"
        width={0}
        height={0}
        className="w-[100px] rounded-lg object-contain sm:w-[100px] md:w-[120px] lg:w-[140px]"
      />
      <Image
        src="/images/icons/google_qr.png"
        alt="google-qr"
        width={0}
        height={0}
        className="w-[100px] rounded-lg object-contain sm:w-[100px] md:w-[120px] lg:w-[140px]"
      />
    </div>
    <p className="text-center text-xs font-semibold">
      Scan QR code on your phone to download the app
    </p>
  </div>
);

export default AppPopup;
