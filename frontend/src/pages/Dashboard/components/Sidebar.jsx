import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import DailyWellnessGoal from "./DailyWellnessGoal";
import ProfileCard from "./ProfileCard";
import ScrollToggle from "../../../components/Utility/ScrollToggle";

const Sidebar = ({ isOpen, setIsOpen, location }) => {
  return (
    <>
      {/* Hamburger Menu Button (Only Visible on Small Screens) */}
      {!isOpen && (
        <div
          className="lg:hidden fixed top-6 left-0 z-20"
          onClick={() => setIsOpen(true)}
        >
          <ScrollToggle>
            <div className="w-8 h-7 flex justify-center text-neutral-600 items-center cursor-pointer transition duration-300 text-xl">
              <GiHamburgerMenu />
            </div>
          </ScrollToggle>
        </div>
      )}

      <div
        className={`fixed z-50 inset-y-0 left-0 w-84 border-r overflow-y-auto bg-white border-neutral-300 max-h-full transition-transform duration-300 ease-in-out custom-scrollbar
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static  lg:h-screen`}
      >
        {/* Close Button this will be only visible on small screen */}
        <div
          className="lg:hidden flex justify-end text-xl font-thin text-neutral-700 pt-2 pr-2"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 className="hover:bg-red-500 hover:text-white rounded-full cursor-pointer p-0.5" />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <ProfileCard location={location} setIsOpen={setIsOpen} />
          <DailyWellnessGoal />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
