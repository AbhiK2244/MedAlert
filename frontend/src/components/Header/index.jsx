import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../../services/auth";
import { logout as logoutDispatcher } from "../../redux/reducers/auth.reducer";

const Header = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

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
    <div className="w-full h-16 my-6 text-[#4F6FFE] bg-neutral-100 flex items-center justify-between rounded-full pl-8 pr-2">
      <div className="w-full py-2 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold cursor-pointer">medalert ai</h1>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg hover:underline">
            HOME
          </Link>
          <Link to="/about" className="text-lg hover:underline">
            ABOUT US
          </Link>
          <Link to="/contact" className="text-lg hover:underline">
            CONTACT US
          </Link>
        </div>
        {accessToken ? (
          <button
            onClick={handleLogout}
            className="text-primary hover:text-primary-hover font-semibold mr-8 text-xl cursor-pointer transition-colors duration-300"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            to="/auth"
            className="text-white bg-[#4F6FFE] text-xl px-4 py-2 rounded-full font-semibold"
          >
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
