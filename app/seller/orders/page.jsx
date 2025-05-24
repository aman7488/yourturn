'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {

    const { user, currency, getToken } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };


    const fetchSellerOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/seller-orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setOrders(data.orders);
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = await getToken();
            const { data } = await axios.put(`/api/order/update-status/${orderId}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (data.success) {
                toast.success("Status updated");
                fetchSellerOrders(); // Refresh order list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updatePaymentStatus = async (orderId, status) => {
        try {
            const token = await getToken();
            const { data } = await axios.put(
                `/api/order/update-payment/${orderId}`,
                { paymentStatus: status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success("Payment status updated");
                fetchSellerOrders(); // Refresh list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="max-w-4xl rounded-md">
                    {orders.map((order, index) => (
                        <div key={index} className="border-t border-gray-300">
                            <div
                                className="flex flex-col md:flex-row gap-5 justify-between p-5"
                            >
                                {/* clickable */}
                                <div onClick={() => toggleExpand(index)} className="flex-1 flex gap-5 max-w-80 cursor-pointer">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium">
                                            {Array.isArray(order.items) && order.items.length > 0
                                                ? order.items
                                                    .map((item) =>
                                                        `${item?.product?.name} x ${item.quantity}${item.size ? ` (${item.size})` : ""}`
                                                    )
                                                    .join(", ")
                                                : "No items"}
                                        </span>
                                        <span>Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>an 
                                        <span className="font-medium">{order.address.fullName}</span><br />
                                        <span>{order.address.area}</span><br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span><br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{currency}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col gap-1">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span>Payment: Pending </span>
                                        {/* <div className="flex items-center gap-2">
                                            <span className="font-medium">Payment:</span>
                                            <button
                                                onClick={() =>
                                                    updatePaymentStatus(order._id, order.paymentStatus === "Paid" ? "Not Paid" : "Paid")
                                                }
                                                className={`px-3 py-1 rounded text-xs font-semibold ${order.paymentStatus === "Paid"
                                                    ? "bg-green-600 text-white hover:bg-green-700"
                                                    : "bg-red-500 text-white hover:bg-red-600"
                                                    }`}
                                            >
                                                {order.paymentStatus === "Paid" ? "Paid" : "Not Paid"}
                                            </button>
                                        </div> */}
                                    </p>

                                </div>
                                <div>
                                    <p className="flex flex-col">
                                        <span>Status:</span>
                                        <select
                                            value={order.status}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option>Order Placed</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </p>
                                </div>
                            </div>

                            {expandedIndex === index && (
                                <div className="bg-gray-50 px-5 pb-4 pt-2 text-sm text-gray-700">
                                    <h4 className="font-medium mb-2">Items in this Order:</h4>
                                    <ul className="space-y-2">
                                        {order.items.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 p-3 rounded-md"
                                            >
                                                <div>
                                                    <p><strong>ID:</strong> {item.product._id}</p>
                                                    <p><strong>Name:</strong> {item.product.name}</p>
                                                    <p><strong>Qty:</strong> {item.quantity}</p>
                                                    <p><strong>Size:</strong> {item.size || "N/A"}</p>
                                                </div>
                                                <a
                                                    href={`/product/${item.product._id}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="mt-2 md:mt-0 bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600"
                                                >
                                                    Visit Product
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default Orders;