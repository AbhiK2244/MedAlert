import React from "react";
import { Link } from "react-router-dom";
import pikachu from "/images/pikachu.png";
import cover from "/images/cover2.png";
import { FaBrain, FaCamera } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { accessToken } = useSelector((state) => state?.auth);

  return (
    <div className="w-full">
      <div className="w-full h-[70vh] px-16 py-8 flex">
        <div className="w-[50%]">
          <h1 className="text-5xl font-bold">Eat Smarter.</h1>
          <h1 className="text-5xl font-bold mt-6">Live Healthier.</h1>

          <p className="mt-6 mb-16 text-lg font-thin mr-12">
            Scan nutrition labels and get health insights, safe consumption
            advice, and downloadable diet reports powered by AI.
          </p>

          {!accessToken ? <Link
            to="/auth"
            className="px-4 py-2 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            Create Your Health Profile
          </Link>:
          <Link
            to="/scan"
            className="px-4 py-2 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            Generate the product report
          </Link>}
        </div>

        <div className="w-[50%] flex items-center justify-center">
          <img
            src={cover}
            alt="Pikachu"
            className="w-[330px] h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full px-16 py-8 mt-6">
        <h1 className="text-5xl font-bold">How it works.</h1>
        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-primary font-semibold flex items-center gap-2">
              <FaCamera /> Scan
            </h2>
            <p className="mt-2 text-primary font-semibold">
              Use your camera to scan nutrition labels of food products.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-primary font-semibold flex items-center gap-2">
              <FaBrain /> Analyze
            </h2>
            <p className="mt-2 text-primary font-semibold">
              Get detailed health insights and safe consumption advice.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-primary font-semibold flex items-center gap-2">
              <IoSave /> Download
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
