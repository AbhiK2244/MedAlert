import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing Page";
import NotFound from "./pages/Not Found";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/About Us/AboutUs";
import UserProfile from "./pages/User Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route element={<LandingPageLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/signup/profile" element={<UserProfile />} />

      <Route path="/about" element={<AboutUs />} />

      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
