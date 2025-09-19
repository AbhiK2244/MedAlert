import React from "react";
import { Link } from "react-router-dom";
import cover from "/images/cover2.png";
import { FaBrain, FaCamera } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { accessToken } = useSelector((state) => state?.auth);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="w-full lg:px-16 md:px-8 px-4 py-8 flex md:flex-row flex-col-reverse items-center gap-8">
        {/* Left text content */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold">Eat Smarter.</h1>
          <h1 className="text-4xl lg:text-5xl font-bold mt-4 md:mt-6">
            Live Healthier.
          </h1>

          <p className="mt-6 mb-10 md:mb-16 text-base md:text-lg font-thin md:mr-12">
            Scan nutrition labels and get health insights, safe consumption
            advice, and downloadable diet reports powered by AI.
          </p>

          {!accessToken ? (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              Create Your Health Profile
            </Link>
          ) : (
            <Link
              to="/scan"
              className="px-4 py-2 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              Generate the product report
            </Link>
          )}
        </div>

        {/* Right image */}
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <img
            src={cover}
            alt="cover image"
            className="w-full max-h-[60vh] object-contain"
          />
        </div>
      </div>

      {/* How it works section */}
      <div className="w-full px-6 md:px-16 py-8 mt-6">
        <h1 className="text-3xl md:text-5xl font-bold">How it works.</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl text-primary font-semibold flex items-center gap-2">
              <FaCamera /> Scan
            </h2>
            <p className="mt-2 text-primary font-semibold">
              Use your camera to scan nutrition labels of food products.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl text-primary font-semibold flex items-center gap-2">
              <FaBrain /> Analyze
            </h2>
            <p className="mt-2 text-primary font-semibold">
              Get detailed health insights and safe consumption advice.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl text-primary font-semibold flex items-center gap-2">
              <IoSave /> Save
            </h2>
            <p className="mt-2 text-primary font-semibold">
              Save your diet reports for future reference and tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
