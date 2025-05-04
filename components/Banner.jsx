import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden min-h-[300px]">
      <div className="relative w-56 h-56">
        <div className="relative w-56 h-56">
          <Image
            src={assets.newsLetter2}
            alt="girls_fashion"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
        Your perfect outfit is just a click away.
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
        Shop the latest in fashion now!
        </p>
        <button onClick={() => router.push(`/all-products`)} className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">
          Buy now
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
      <div className="hidden md:block relative w-72 h-72">
        <Image
          src={assets.newsLetter1}
          alt="boys_fashion"
          fill
          className="object-contain"
        />
      </div>
      <Image
        className="md:hidden"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;