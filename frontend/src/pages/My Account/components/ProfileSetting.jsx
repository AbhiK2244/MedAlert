import React from "react";

const ProfileSetting = ({ user, healthData }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-1">
      <div className="md:px-4 md:pt-4 flex items-center md:gap-4 gap-2 lg:hidden">
        <div className="min-w-9 min-h-9 md:w-16 md:h-16 rounded-full bg-purple-100 flex items-center justify-center text-sm md:text-2xl font-bold text-[#8451C1] shadow">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h2 className="text-sm md:text-xl font-semibold text-gray-800">
            {user?.name || "User"}
          </h2>
          <p className="text-xs md:text-sm text-gray-500">{user?.email}</p>
          <p className="text-xs md:text-sm text-gray-500">Age {healthData?.age}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <h4 className="font-medium text-neutral-500 text-sm md:text-md">
            Account settings
          </h4>
          <div>
            <button className="text-[11px] md:text-xs font-medium text-primary hover:text-primary-hover hover:underline transform duration-300 cursor-pointer">
              Update health profile
            </button>
          </div>
          <div>
            <button className="text-[11px] md:text-xs font-medium text-primary hover:text-primary-hover hover:underline transform duration-300 cursor-pointer">
              Change password
            </button>
          </div>
          <div>
            <button className="text-[11px] md:text-xs font-medium text-primary hover:text-primary-hover hover:underline transform duration-300 cursor-pointer">
              Edit personal information
            </button>
          </div>
          <div>
            <button className="text-[11px] md:text-xs font-medium text-primary hover:text-primary-hover hover:underline transform duration-300 cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
