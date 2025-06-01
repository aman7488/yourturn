'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddAddress = () => {
    const { getToken, router } = useAppContext();

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        confirmPhoneNumber: '',
        email: '',
        flat: '',
        area: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Validation
        const { fullName, phoneNumber, flat, area, pincode, city, state } = address;
        if (!fullName || !phoneNumber || !flat || !area || !pincode || !city || !state) {
            toast.error("Please fill all required fields");
            return;
        }
        if (!/^\d{6}$/.test(pincode)) {
            toast.error("Pincode must be a 6-digit number");
            return;
        }
        if (address.phoneNumber !== address.confirmPhoneNumber) {
            toast.error("Phone numbers do not match");
            return;
        }        


        // const combinedArea = `${address.flat}, ${address.area}${address.landmark ? `, Landmark: ${address.landmark}` : ''}`;

        const payload = {
            fullName: address.fullName,
            phoneNumber: address.phoneNumber,
            email: address.email || undefined,
            pincode: address.pincode,
            flat: address.flat,
            area: address.area,
            landmark: address.landmark || '',
            city: address.city,
            state: address.state,
        };

        try {
            const token = await getToken();
            const { data } = await axios.post('/api/user/add-address', { address: payload }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                toast.success(data.message);
                router.push('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form onSubmit={onSubmitHandler} className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-orange-600">Address</span>
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-3 max-w-sm mt-10">
                        <p className="text-lg font-medium text-gray-700">Contact Info</p>
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Full Name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Phone Number"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                    setAddress({ ...address, phoneNumber: value });
                                }
                            }}
                            value={address.phoneNumber}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Confirm Phone Number"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                    setAddress({ ...address, confirmPhoneNumber: value });
                                }
                            }}
                            value={address.confirmPhoneNumber}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="email"
                            placeholder="Email (optional)"
                            onChange={(e) => setAddress({ ...address, email: e.target.value })}
                            value={address.email}
                        />
                    </div>

                    {/* Address Info */}
                    <div className="space-y-3 max-w-sm mt-10">
                        <p className="text-lg font-medium text-gray-700">Address Info</p>
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Flat / House No."
                            onChange={(e) =>
                                setAddress({ ...address, flat: e.target.value })
                            }
                            value={address.flat}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Area / Street"
                            onChange={(e) =>
                                setAddress({ ...address, area: e.target.value })
                            }
                            value={address.area}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Landmark (optional)"
                            onChange={(e) =>
                                setAddress({ ...address, landmark: e.target.value })
                            }
                            value={address.landmark}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Pincode"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,6}$/.test(value)) {
                                    setAddress({ ...address, pincode: value });
                                }
                            }}
                            value={address.pincode}
                            required
                        />
                        <div className="flex space-x-3">
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) =>
                                    setAddress({ ...address, city: e.target.value })
                                }
                                value={address.city}
                                required
                            />
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="State"
                                onChange={(e) =>
                                    setAddress({ ...address, state: e.target.value })
                                }
                                value={address.state}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
                    >
                        Save Address
                    </button>
                </form>

                <Image
                    className="md:ml-16 mt-16 md:mt-0 max-w-sm w-full object-contain"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );

};

export default AddAddress;
