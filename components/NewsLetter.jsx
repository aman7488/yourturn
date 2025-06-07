import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-12 pb-16 px-4">
      <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-2">
        New Season, New Looks
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-4">
        Step into style with Asqaure.
      </p>
      <p className="text-lg md:text-2xl font-medium bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Get up to 35% off on our new collection!
      </p>
      {/* <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
        />
        <button className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none">
          Subscribe
        </button>
      </div> */}
    </div>
  );
};

export default NewsLetter;
