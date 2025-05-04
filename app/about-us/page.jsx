"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUsPage = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 text-center space-y-6">
                <h1 className="text-3xl md:text-4xl font-semibold text-orange-600">
                    We Are Now Open!
                </h1>
                <p className="text-base md:text-lg text-gray-800/80 font-medium max-w-2xl mx-auto">
                    Excited to announce the launch of <span className="font-semibold text-gray-900">A Square</span>,
                    your new destination for stylish and affordable clothing!
                </p>
                <p className="text-base md:text-lg text-gray-800/80 font-medium max-w-2xl mx-auto">
                    From everyday wear to standout pieces, we’ve got something for everyone. Shop now and be part of our journey.
                </p>
                <p className="text-base md:text-lg text-gray-800/80 font-medium max-w-2xl mx-auto">
                    For any queries, reach out to us at{" "}
                    <a href="tel:+918884999644" className="text-blue-600 hover:underline">+91 8884999644</a>{" "}
                    or email us at{" "}
                    <a href="mailto:asquareteam9@gmail.com" className="text-blue-600 hover:underline">asquareteam9@gmail.com</a>.
                    Thank you for your support!
                </p>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;
