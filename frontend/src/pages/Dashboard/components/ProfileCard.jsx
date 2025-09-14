import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { FaBookMedical } from "react-icons/fa6";
import { TbTextScan2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../services/auth";
import toast from "react-hot-toast";
import { logout as logoutDispatcher } from "../../../redux/reducers/auth.reducer";

const links = [
  { url: "/scan", label: "Scan", icon: <TbTextScan2 /> },
  { url: "/my-account", label: "My Account", icon: <FaCircleUser /> },
  { url: "/reports", label: "Reports", icon: <FaBookMedical /> },
];

const ProfileCard = ({ location, setIsOpen }) => {
  const [logout] = useLogoutMutation();
  const user = useSelector((state) => state?.auth?.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!accessToken) {
      localStorage.clear();
    }

    const result = await logout();
    if (result?.error) {
      toast.error(
        result?.error.data.message || "Logout failed. Please try again."
      );
    } else {
      toast.success("Logged out successfully");
      dispatch(logoutDispatcher());
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="px-4 md:pt-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-[#8451C1] shadow">
          {user?.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="text-xs text-primary hover:text-primary-hover transition duration-300 font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-0.5">
        {links.map((link, index) => (
          <Link
            onClick={() => setIsOpen(false)}
            to={link.url}
            key={index}
            className={`flex items-center gap-3 px-4 py-2 text-primary hover:bg-blue-50 hover:text-black rounded-lg cursor-pointer transition duration-300 ${
              location.pathname == link.url ? "bg-blue-50 text-black" : ""
            }`}
          >
            <div className="">{link.icon}</div>
            <p className="text-sm font-medium">{link.label}</p>
          </Link>
        ))}
      </div>

      {/* <div className="mt-6 p-3 rounded-lg bg-yellow-50">
              <p className="text-yellow-600 font-semibold text-sm">
                Health Status
              </p>
              <p className="text-gray-700 text-sm">Good health, keep it up</p>
            </div> */}
      {/* <div className="mt-4">
              <p className="text-sm text-gray-500">Medical Conditions</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                  Type 2 Diabetes
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
                  Hypertension
                </span>
              </div>
            </div> */}
    </div>
  );
};

export default ProfileCard;
