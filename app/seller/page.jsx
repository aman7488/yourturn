"use client";

import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/components/seller/Footer";

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [size, setSize] = useState([]);
  const [itemType, setItemType] = useState('Clothing'); // New state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("offerPrice", offerPrice);
    formData.append("itemType", itemType);
    // size.forEach(s => formData.append("size", s));
    const processedSizes = size.includes("Free Size") ? ["FS"] : size;
    processedSizes.forEach(s => formData.append("size", s));
    files.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    try {
      const token = await getToken();

      const { data } = await axios.post("/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Earphone");
        setPrice("");
        setOfferPrice("");
        setSize([]);
        setItemType("Clothing");
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  };

  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const footwearSizes = ["5", "6", "7", "8", "9", "10", "11", "12"];
  const availableSizes = itemType === "Clothing" ? clothingSizes : footwearSizes;

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <Image
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* Category + Sizes */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">Category</label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Item Type */}
          <div className="flex flex-col gap-1 w-40">
            <label className="text-base font-medium" htmlFor="itemType">Item Type</label>
            <select
              id="itemType"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => {
                setItemType(e.target.value);
                setSize([]); // reset sizes when switching type
              }}
              value={itemType}
              required
            >
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>

          {/* Sizes */}
          {/* <div className="flex flex-col gap-1">
            <label className="text-base font-medium">Available Sizes</label>
            <div className="flex gap-3 flex-wrap">
              {availableSizes.map((sizeOption) => (
                <label key={sizeOption} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={sizeOption}
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
          </div> */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium">Available Sizes</label>
            <div className="flex gap-3 flex-wrap items-center">
              {/* Free Size Checkbox */}
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

              {/* Regular Sizes */}
              {(itemType === "Clothing" ? clothingSizes : footwearSizes).map((sizeOption) => (
                <label key={sizeOption} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    value={sizeOption}
                    disabled={size.includes("Free Size")} // handled as "FS" in the backend
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
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
          ADD
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddProduct;
