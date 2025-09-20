import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../pages/Dashboard/components/Sidebar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024); // sidebat will be always open for large screens
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // Ensure it's always open on large screens
      } else {
        setIsOpen(false); // Ensure it's closed on small screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full custom-scrollbar">
        <main className="flex-grow flex">
          {/* Left Component Admin Sidebar */}
          <div className={`h-screen custom-scrollbar`}>
            <Sidebar
              location={location}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>

          {/* Right Component Admin Panel */}
          <div className="h-screen overflow-y-auto w-full">
            <Outlet />
          </div>
        </main>
    </div>
  );
}

export default DashboardLayout
