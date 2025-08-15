import React from "react";
import { Link } from "react-router-dom";
import pikachu from "/images/pikachu.png";
import cover from "/images/cover2.png";

const LandingPage = () => {
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

          <Link
            to="/auth"
            className="px-4 py-2 rounded-full font-semibold border-2 border-white"
          >
            Create Your Health Profile
          </Link>
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

          <p className="mt-6 mb-16 text-lg font-thin mr-12">
            Scan nutrition labels and get health insights, safe consumption
            advice, and downloadable diet reports powered by AI.
          </p>

        
      </div>
    </div>
  );
};

export default LandingPage;
