import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const LandingPageLayout = () => {
  return (
    <div
      className="flex flex-col gap-10 min-h-screen w-full primary-gradient text-white"
    >
      <div className="md:px-8 lg:px-14">
      <Header />
      </div>
      <main className="min-h-screen w-full md:px-8 lg:px-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
