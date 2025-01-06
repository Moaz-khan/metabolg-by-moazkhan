"use client";
import React, { useState } from "react";

const SubscribeCard = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribed with email:", email);
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center gap-16 mt-16 px-4 py-12 bg-cover bg-center bg-no-repeat h-screen rounded-2xl"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/subscribe.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="flex flex-col items-center gap-8 w-full max-w-lg md:max-w-2xl lg:max-w-4xl bg-white bg-opacity-60 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
        {/* Heading */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            {`Subscribe to Our Newsletter!`}
          </h2>
          <p className="text-lg sm:text-xl text-center text-gray-800 font-semibold">
            {`Stay updated with the latest news and special offers.`}
          </p>
        </div>

        {/* Email Input Section */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full px-4 py-2 rounded-lg text-gray-600 border-gray-300 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-gray-800">{`We won't share your email.`}</p>
          </div>

          <button
            className="flex items-center justify-center w-full sm:w-32 h-10 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
            onClick={handleSubscribe}>
            {`Subscribe`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
