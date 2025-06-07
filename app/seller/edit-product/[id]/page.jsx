"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/seller/Footer";
import { assets } from "@/assets/assets";
import { useParams } from 'next/navigation';

const EditProduct = () => {
    const { id } = useParams();
    const { getToken } = useAppContext();

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [variants, setVariants] = useState(['']);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [size, setSize] = useState([]);
    const [itemType, setItemType] = useState('');
    const [images, setImages] = useState([]);

    const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const footwearSizes = ["5", "6", "7", "8", "9", "10", "11", "12"];
    const availableSizes = itemType === "Clothing" ? clothingSizes : footwearSizes;

    const fetchProduct = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`/api/product/edit/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                const p = data.product;
                setProduct(p);
                setName(p.name);
                setDescription(p.description);
                setBrand(p.brand);
                setVariants(p.variants || ['']);
                setCategory(p.category);
                setPrice(p.price);
                setOfferPrice(p.offerPrice);
                setSize(p.size.includes("FS") ? ["Free Size"] : p.size);
                setItemType(p.itemType);
                setImages(p.images || []);
            } else {
                toast.error("Failed to load product");
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleVariantChange = (index, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index] = value;
        setVariants(updatedVariants);
    };

    const addVariant = () => {
        setVariants([...variants, '']);
    };

    const removeVariant = (index) => {
        if (variants.length > 1) {
            const updatedVariants = [...variants];
            updatedVariants.splice(index, 1);
            setVariants(updatedVariants);
        }
    };

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            const processedSizes = size.includes("Free Size") ? ["FS"] : size;

            const payload = {
                name,
                description,
                brand,
                price,
                offerPrice,
                category,
                itemType,
                size: processedSizes,
                variants: variants.filter(v => v.trim() !== '')
            };

            const { data } = await axios.put(`/api/product/edit/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                toast.success("Product updated!");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!product) {
        return <div className="p-10 text-center text-lg">Loading product...</div>;
    }

    return (
        <div className="flex-1 min-h-screen flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="md:p-10 p-4 max-w-6xl w-full mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* LEFT COLUMN */}
                    <div className="flex-1 space-y-5">
                        {/* Images */}
                        <div>
                            <p className="text-base font-medium">Product Images</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                {images.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img.url || assets.upload_area}
                                        alt={`product-img-${index}`}
                                        className="max-w-24"
                                        width={100}
                                        height={100}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium">Product Name</label>
                            <input
                                type="text"
                                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium">Product Description</label>
                            <textarea
                                rows={4}
                                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex-1 space-y-5">
                        {/* Brand and Variants */}
                        <div className="flex gap-5 flex-wrap">
                            <div className="flex flex-col gap-1 w-40">
                                <label className="text-base font-medium">Brand</label>
                                <input
                                    type="text"
                                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-40">
                                <label className="text-base font-medium">Variant IDs</label>
                                {variants.map((variant, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            className="outline-none md:py-2 py-1.5 px-3 rounded border border-gray-500/40 flex-1"
                                            value={variant}
                                            onChange={(e) => handleVariantChange(index, e.target.value)}
                                        />
                                        {variants.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="text-red-500 font-bold px-2 py-1"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="self-start text-sm text-blue-500 mt-1 flex items-center gap-1"
                                >
                                    <span>+ Add variant</span>
                                </button>
                            </div>
                        </div>

                        {/* Category & Item Type */}
                        <div className="flex items-center gap-5 flex-wrap">
                            <div className="flex flex-col gap-1 w-32">
                                <label className="text-base font-medium">Category</label>
                                <select
                                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1 w-40">
                                <label className="text-base font-medium">Item Type</label>
                                <select
                                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    value={itemType}
                                    onChange={(e) => {
                                        setItemType(e.target.value);
                                        setSize([]);
                                    }}
                                    required
                                >
                                    <option value="Clothing">Clothing</option>
                                    <option value="Footwear">Footwear</option>
                                </select>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium">Available Sizes</label>
                            <div className="flex gap-3 flex-wrap items-center">
                                <label className="flex items-center gap-1 font-medium text-orange-600">
                                    <input
                                        type="checkbox"
                                        value="Free Size"
                                        checked={size.includes("Free Size")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSize(["Free Size"]);
                                            } else {
                                                setSize([]);
                                            }
                                        }}
                                    />
                                    Free Size
                                </label>
                                {availableSizes.map((sizeOption) => (
                                    <label key={sizeOption} className="flex items-center gap-1 text-sm">
                                        <input
                                            type="checkbox"
                                            value={sizeOption}
                                            disabled={size.includes("Free Size")}
                                            checked={size.includes(sizeOption)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSize([...size, sizeOption]);
                                                } else {
                                                    setSize(size.filter((s) => s !== sizeOption));
                                                }
                                            }}
                                        />
                                        {sizeOption}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="flex items-center gap-5 flex-wrap">
                            <div className="flex flex-col gap-1 w-32">
                                <label className="text-base font-medium">Product Price</label>
                                <input
                                    type="number"
                                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-32">
                                <label className="text-base font-medium">Offer Price</label>
                                <input
                                    type="number"
                                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    value={offerPrice}
                                    onChange={(e) => setOfferPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default EditProduct;
