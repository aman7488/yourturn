import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    image: assets.men_cat,
    title: "Men",
    description: "Shirts, T-shirts, Jeans, Hoodies and more.",
  },
  {
    id: 2,
    image: assets.women_cat,
    title: "Women",
    description: "Sarees, Dress Meterials,  Gowns, Kurtis Tunics, Blouses, leggings and more.",
  },
  {
    id: 3,
    image: assets.kids_cat,
    title: "Kids",
    description: "Denims, Trousers, Jogger’s, Track Pants, Shirts, Shorts, T-shirts for him & Dresses, Frocks, Jeans, Jeggings, Leggings Tops, T-shirts, Skirts, Shorts for her.",
  },
];

const FeaturedProduct = () => {
  const router = useRouter()

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Our Categories</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group rounded overflow-hidden">
          <div className="w-full aspect-[3.5/5] relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:brightness-75 transition duration-300"
            />
          </div>
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">For {title}</p>
            <p className="text-sm lg:text-base leading-5 max-w-60">{description}</p>
            <button onClick={() => router.push(`/all-products?category=${title}`)} className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
              Buy now
              <Image
                src={assets.redirect_icon}
                alt="Redirect Icon"
                width={12}
                height={12}
              />
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
