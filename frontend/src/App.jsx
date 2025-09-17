import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing Page";
import NotFound from "./pages/Not Found";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/About Us/AboutUs";
import ContactUs from "./pages/contact us/ContactUs";
import UserProfile from "./pages/User Profile";
import DashboardLayout from "./layouts/DashboardLayout";
import MyAccount from "./pages/My Account";
import Reports from "./pages/Reports";
import AnalysisReport from "./pages/Analysis Report";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<LandingPageLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-account"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />

      <Route
        path="/signup/profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/report/:reportId"
        element={
          <PrivateRoute>
            <AnalysisReport />
          </PrivateRoute>
        }
      />

      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
