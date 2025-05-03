'use client'
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AllProducts = () => {
    const { currency } = useAppContext();
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Men");
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabRefs = useRef({});

    const categories = ["Men", "Women", "Kids"];

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        // Update underline position and width
        const ref = tabRefs.current[activeCategory];
        if (ref) {
            const rect = ref.getBoundingClientRect();
            const parentRect = ref.parentElement.getBoundingClientRect();
            setIndicatorStyle({
                left: rect.left - parentRect.left + "px",
                width: rect.width + "px",
            });
        }
    }, [activeCategory]);

    const filteredProducts = products.filter(
        (product) => product.category === activeCategory
    );

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-12 pb-20">
                <div className="flex flex-col items-start">
                    <p className="text-2xl font-medium">All Products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full mt-1" />
                </div>

                {/* Category Tabs */}
                <div className="relative mt-10 flex gap-8 border-b border-gray-300">
                    {categories.map((category) => (
                        <button
                            key={category}
                            ref={(el) => (tabRefs.current[category] = el)}
                            onClick={() => setActiveCategory(category)}
                            className={`pb-2 text-base font-medium transition-colors duration-200 ${
                                activeCategory === category ? "text-orange-600" : "text-gray-500"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                    {/* Slider underline */}
                    <div
                        className="absolute bottom-0 h-0.5 bg-orange-600 transition-all duration-300"
                        style={{ ...indicatorStyle, position: "absolute" }}
                    />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} currency={currency} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <p className="col-span-full text-gray-500">No products found in this category.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
