"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { RotateCcw, CheckCircle2 } from "lucide-react";

const Product = () => {

    const { id } = useParams();

    const { currency, products, router, addToCart } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState("");

    const handleAddToCart = () => {
        if (
            Array.isArray(productData.size) &&
            productData.size.length > 0 &&
            productData.size[0] !== "FS" &&
            !selectedSize
        ) {
            setSizeError("Please select a size.");
            return;
        }
        setSizeError("");
        const sizeToSend = productData.size[0] === "FS" ? null : selectedSize;
        addToCart(productData._id, sizeToSend);
    };

    const handleBuyNow = () => {
        if (
            Array.isArray(productData.size) &&
            productData.size.length > 0 &&
            productData.size[0] !== "FS" &&
            !selectedSize
        ) {
            setSizeError("Please select a size.");
            return;
        }
        setSizeError("");
        const sizeToSend = productData.size[0] === "FS" ? null : selectedSize;
        addToCart(productData._id, sizeToSend);
        router.push("/cart");
    };


    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <Image
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        {currency}{productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            {currency}{productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">
                                        {productData.brand || "Generic"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {Array.isArray(productData.size) && productData.size.length > 0 && (
                        <div className="mb-2">
                            <p className="text-gray-800 font-medium mb-2">Size:</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                {(() => {
                                    const sizes = productData.size;
                                    const isFreeSize = sizes.length === 1 && sizes[0] === "FS";

                                    if (isFreeSize) {
                                        return (
                                            <button
                                                disabled
                                                className="px-4 py-2 border rounded-full text-sm font-medium bg-orange-500 text-white border-orange-500 cursor-not-allowed"
                                            >
                                                Free Size
                                            </button>
                                        );
                                    }

                                    const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
                                    const SHOE_SIZES = ["5", "6", "7", "8", "9", "10", "11", "12"];

                                    const availableSizes = sizes.map(String);
                                    const isClothing = CLOTHING_SIZES.some(size => availableSizes.includes(size));
                                    const isShoes = SHOE_SIZES.some(size => availableSizes.includes(size));

                                    const sizeOptions = isClothing ? CLOTHING_SIZES : isShoes ? SHOE_SIZES : [];

                                    return sizeOptions.map(size => {
                                        const isAvailable = availableSizes.includes(size);
                                        const isSelected = selectedSize === size;

                                        return (
                                            <button
                                                key={size}
                                                disabled={!isAvailable}
                                                onClick={() => isAvailable && setSelectedSize(size)}
                                                className={`
                                px-4 py-2 border rounded-full text-sm font-medium transition 
                                ${isAvailable
                                                        ? isSelected
                                                            ? "bg-orange-500 text-white border-orange-500"
                                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                                                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                                    }
                            `}
                                            >
                                                {size}
                                            </button>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    )}

                    {productData.variants && productData.variants.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-medium mb-2">Other Variants</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                {productData.variants.map((variantId) => {
                                    const variantProduct = products.find(p => p._id === variantId);
                                    if (!variantProduct) return null;

                                    return (
                                        <div
                                            key={variantId}
                                            onClick={() => router.push(`/product/${variantId}`)}
                                            className="cursor-pointer group"
                                        >
                                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                                                <Image
                                                    src={variantProduct.image?.[0] || assets.placeholder_image}
                                                    alt={variantProduct.name}
                                                    fill
                                                    className="object-contain mix-blend-multiply group-hover:opacity-90 transition"
                                                />
                                                {variantProduct.offerPrice < productData.offerPrice && (
                                                    <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                        Cheaper
                                                    </div>
                                                )}
                                            </div>
                                            {/* <p className="text-sm font-medium truncate">{variantProduct.name}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-orange-600">
                                                    {currency}{variantProduct.offerPrice}
                                                </p>
                                                {variantProduct.price > variantProduct.offerPrice && (
                                                    <p className="text-xs text-gray-500 line-through">
                                                        {currency}{variantProduct.price}
                                                    </p>
                                                )}
                                            </div> */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center mt-10 gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            Buy now
                        </button>
                    </div>

                    {sizeError && (
                        <p className="text-red-500 text-sm mt-2">{sizeError}</p>
                    )}

                    <div className="flex flex-col gap-3 mt-6 text-sm text-gray-800/90">
                        <div className="flex items-start gap-3">
                            <RotateCcw className="w-5 h-5 text-gray-700 mt-0.5" />
                            <div>
                                <p><strong>5 day Return and Exchange</strong></p>
                                <a target="_blank" href="/return-policy" className="text-blue-600 hover:underline text-sm font-medium">
                                    Return and Exchange Policy
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-gray-700 mt-0.5" />
                            <p><strong>Check COD availability at checkout</strong></p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;